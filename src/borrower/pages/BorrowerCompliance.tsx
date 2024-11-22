import React from 'react';
import { Shield, AlertCircle, Check, FileText } from 'lucide-react';
import { useAuthStore } from '../../services/auth';

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}

interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user' | 'borrower';
  kycStatus?: 'pending' | 'verified' | 'rejected';
  documents?: Document[];
  companyInfo?: {
    registrationNumber: string;
    address: string;
    phone: string;
  };
}

export default function BorrowerCompliance() {
  const { user } = useAuthStore() as { user: ExtendedUser | null };

  const complianceItems = [
    {
      id: 1,
      title: 'التحقق من الهوية',
      status: user?.kycStatus || 'pending',
      description: 'التحقق من هوية المنشأة والمفوضين بالتوقيع'
    },
    {
      id: 2,
      title: 'المستندات الأساسية',
      status: user?.documents?.every(doc => doc.status === 'verified') ? 'verified' : 'pending',
      description: 'السجل التجاري، الشهادة الضريبية، القوائم المالية'
    },
    {
      id: 3,
      title: 'معلومات المنشأة',
      status: user?.companyInfo ? 'verified' : 'pending',
      description: 'معلومات الاتصال وتفاصيل المنشأة'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">الامتثال</h2>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-6">
          {complianceItems.map((item) => (
            <div 
              key={item.id}
              className={`p-4 rounded-lg ${
                item.status === 'verified' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-yellow-50 border border-yellow-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.status === 'verified' ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-sm rounded-lg ${
                  item.status === 'verified'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'verified' ? 'مكتمل' : 'معلق'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">متطلبات الامتثال</p>
              <p className="text-sm text-blue-800 mt-1">
                يجب إكمال جميع متطلبات الامتثال للحصول على التمويل. في حال وجود أي استفسارات، يرجى التواصل مع فريق الدعم.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">سجل الامتثال</h3>
        </div>
        <div className="divide-y">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#2B227C]" />
                  </div>
                  <div>
                    <p className="font-medium">تم تحديث حالة المستند</p>
                    <p className="text-sm text-gray-500">تم التحقق من السجل التجاري</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}