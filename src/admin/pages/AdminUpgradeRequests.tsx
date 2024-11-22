import React from 'react';
import { Search, Filter, Check, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminUpgradeRequests() {
  // Demo upgrade requests data
  const upgradeRequests = [
    {
      id: 1,
      userId: '2',
      userName: 'محمد أحمد',
      currentType: 'basic',
      requestDate: '2024-03-15',
      documents: [
        { type: 'portfolio', status: 'verified' },
        { type: 'experience', status: 'pending' },
        { type: 'financial', status: 'verified' }
      ]
    }
  ];

  const handleApproveUpgrade = async (userId: string) => {
    try {
      // Here you would make an API call to approve the upgrade
      console.log('Approving upgrade for user:', userId);
      // Update user type to 'qualified'
    } catch (error) {
      console.error('Error approving upgrade:', error);
    }
  };

  const handleRejectUpgrade = async (userId: string) => {
    try {
      // Here you would make an API call to reject the upgrade
      console.log('Rejecting upgrade for user:', userId);
    } catch (error) {
      console.error('Error rejecting upgrade:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">طلبات ترقية الحسابات</h2>
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

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">الطلبات المعلقة</h3>
        </div>
        <div className="divide-y">
          {upgradeRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6 text-[#2B227C]" />
                  </div>
                  <div>
                    <Link 
                      to={`/admin/investors/${request.userId}`}
                      className="font-medium text-gray-900 hover:text-[#2B227C]"
                    >
                      {request.userName}
                    </Link>
                    <p className="text-sm text-gray-500">
                      تاريخ الطلب: {new Date(request.requestDate).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveUpgrade(request.userId)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    title="قبول الطلب"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleRejectUpgrade(request.userId)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="رفض الطلب"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Documents Status */}
              <div className="grid grid-cols-3 gap-4">
                {request.documents.map((doc, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {doc.type === 'portfolio' ? 'محفظة الاستثمارات' :
                         doc.type === 'experience' ? 'إثبات الخبرة' :
                         'البيانات المالية'}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'verified' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status === 'verified' ? 'تم التحقق' : 'قيد المراجعة'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {upgradeRequests.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا توجد طلبات ترقية حالياً
            </div>
          )}
        </div>
      </div>
    </div>
  );
}