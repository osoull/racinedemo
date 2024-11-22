import React from 'react';
import { Search, Filter, Check, X, User, FileText, Eye, Download } from 'lucide-react';
import { useAuthStore } from '../../services/auth';
import { toast } from 'react-hot-toast';
import { useAuditStore } from '../../services/audit';

export default function AdminKYC() {
  const { users, updateUser } = useAuthStore();
  const { addLog } = useAuditStore();
  
  // Get all users with pending KYC
  const pendingUsers = users?.filter(u => u.kycStatus === 'pending') || [];

  const handleVerification = async (userId: string, status: 'verified' | 'rejected') => {
    try {
      await updateUser(userId, { kycStatus: status });
      
      // Add audit log
      addLog({
        action: 'status_change',
        userId,
        performedBy: 'admin',
        details: `تم ${status === 'verified' ? 'قبول' : 'رفض'} طلب التحقق من الهوية`
      });

      toast.success(`تم ${status === 'verified' ? 'قبول' : 'رفض'} طلب التحقق بنجاح`);
    } catch (error) {
      toast.error('حدث خطأ أثناء معالجة الطلب');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">طلبات التحقق من الهوية</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              className="w-64 pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>تصفية</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">الطلبات المعلقة</h3>
        </div>
        <div className="divide-y">
          {pendingUsers.map((user) => (
            <div key={user.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-[#2B227C]/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-[#2B227C]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVerification(user.id, 'verified')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    title="قبول"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleVerification(user.id, 'rejected')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="رفض"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {user.documents?.map((doc, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium">
                          {doc.type === 'id' ? 'الهوية' : 
                           doc.type === 'selfie' ? 'الصورة الشخصية' : 
                           'إثبات العنوان'}
                        </span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        doc.status === 'verified' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status === 'verified' ? 'تم التحقق' : 'معلق'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-sm text-[#2B227C] hover:underline"
                        onClick={() => window.open(`/api/documents/${doc.id}/preview`, '_blank')}
                      >
                        <Eye className="h-4 w-4 inline-block ml-1" />
                        عرض المستند
                      </button>
                      <button 
                        className="text-sm text-[#2B227C] hover:underline"
                        onClick={() => window.open(`/api/documents/${doc.id}/download`, '_blank')}
                      >
                        <Download className="h-4 w-4 inline-block ml-1" />
                        تحميل
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {pendingUsers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا توجد طلبات تحقق معلقة
            </div>
          )}
        </div>
      </div>
    </div>
  );
}