import React from 'react';
import { Building2, Mail, Phone, MapPin, FileText } from 'lucide-react';

interface CompanyInfo {
  name: string;
  type: 'company' | 'establishment';
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
}

interface BorrowerCompanyInfoProps {
  info: CompanyInfo;
  onUpdate?: (info: CompanyInfo) => void;
  isEditing?: boolean;
}

export default function BorrowerCompanyInfo({ 
  info, 
  onUpdate,
  isEditing = false 
}: BorrowerCompanyInfoProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-[#2B227C]/10 rounded-xl flex items-center justify-center">
          <Building2 className="h-8 w-8 text-[#2B227C]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{info.name}</h3>
          <p className="text-gray-500">
            {info.type === 'company' ? 'شركة' : 'مؤسسة'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">رقم السجل التجاري</p>
              {isEditing ? (
                <input
                  type="text"
                  value={info.registrationNumber}
                  onChange={(e) => onUpdate?.({ ...info, registrationNumber: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                />
              ) : (
                <p className="font-medium">{info.registrationNumber}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">البريد الإلكتروني</p>
              {isEditing ? (
                <input
                  type="email"
                  value={info.email}
                  onChange={(e) => onUpdate?.({ ...info, email: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                />
              ) : (
                <p className="font-medium">{info.email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">رقم الهاتف</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={info.phone}
                  onChange={(e) => onUpdate?.({ ...info, phone: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                />
              ) : (
                <p className="font-medium">{info.phone}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">العنوان</p>
              {isEditing ? (
                <input
                  type="text"
                  value={info.address}
                  onChange={(e) => onUpdate?.({ ...info, address: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                />
              ) : (
                <p className="font-medium">{info.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-8">
          <button className="w-full py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]">
            حفظ التغييرات
          </button>
        </div>
      )}
    </div>
  );
}