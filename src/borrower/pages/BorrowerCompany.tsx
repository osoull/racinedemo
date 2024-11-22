import React from 'react';
import { Building2, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { useAuthStore } from '../../services/auth';

interface CompanyInfo {
  registrationNumber: string;
  address: string;
  phone: string;
}

interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user' | 'borrower';
  borrowerType?: 'company' | 'establishment';
  companyInfo?: CompanyInfo;
}

export default function BorrowerCompany() {
  const { user } = useAuthStore() as { user: ExtendedUser | null };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">معلومات المنشأة</h2>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#2B227C]/10 rounded-xl flex items-center justify-center">
            <Building2 className="h-8 w-8 text-[#2B227C]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
            <p className="text-gray-500">
              {user?.borrowerType === 'company' ? 'شركة' : 'مؤسسة'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">رقم السجل التجاري</p>
                <p className="font-medium">{user?.companyInfo?.registrationNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">رقم الهاتف</p>
                <p className="font-medium">{user?.companyInfo?.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">العنوان</p>
                <p className="font-medium">{user?.companyInfo?.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]">
            تحديث المعلومات
          </button>
        </div>
      </div>
    </div>
  );
}