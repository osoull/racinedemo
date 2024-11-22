import React from 'react';
import { useAuthStore } from '../services/auth';
import { User, Mail, Phone, Calendar, Building2, Shield } from 'lucide-react';
import ProfilePhotoUpload from './ProfilePhotoUpload';

interface BorrowerProfileProps {
  userId?: string;
  isAdminView?: boolean;
}

export default function BorrowerProfile({ userId, isAdminView = false }: BorrowerProfileProps) {
  const { user: currentUser, updatePhoto } = useAuthStore();
  const user = useAuthStore(state => 
    state.user?.id === userId ? state.user : currentUser
  );

  const handlePhotoUpload = async (file: File) => {
    if (isAdminView) return;
    
    try {
      const fakeUrl = URL.createObjectURL(file);
      await updatePhoto(fakeUrl);
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-8">
        <ProfilePhotoUpload
          currentPhotoUrl={user.photoUrl}
          onUpload={handlePhotoUpload}
          readOnly={isAdminView}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
          <User className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">الاسم</p>
            <p className="font-medium">{user.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
          <Building2 className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">نوع المنشأة</p>
            <p className="font-medium">
              {user.borrowerType === 'company' ? 'شركة' : 'مؤسسة'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
          <Mail className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">البريد الإلكتروني</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
          <Phone className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">رقم الجوال</p>
            <p className="font-medium">{user.companyInfo?.phone || '+966 50 XXX XXXX'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">تاريخ الانضمام</p>
            <p className="font-medium">{new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
          <Shield className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">حالة التحقق</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.kycStatus === 'verified'
                ? 'bg-green-100 text-green-800'
                : user.kycStatus === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {user.kycStatus === 'verified' ? 'تم التحقق' :
               user.kycStatus === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}