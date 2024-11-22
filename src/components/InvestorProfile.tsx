import React from 'react';
import { useAuthStore } from '../services/auth';
import { User, Mail, Phone, Calendar, Shield, Wallet, AlertCircle } from 'lucide-react';
import ProfilePhotoUpload from './ProfilePhotoUpload';

interface InvestorProfileProps {
  userId?: string;
  isAdminView: boolean;
}

export default function InvestorProfile({ userId, isAdminView }: InvestorProfileProps) {
  const { users, updatePhoto } = useAuthStore();
  
  // Get the target user from users array if userId is provided, otherwise get current user
  const user = userId 
    ? users?.find(u => u.id === userId)
    : useAuthStore(state => state.user);

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
            <p className="font-medium">+966 50 XXX XXXX</p>
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

        <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
          <Wallet className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">نوع المستثمر</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.investorType === 'qualified'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {user.investorType === 'qualified' ? 'مستثمر مؤهل' : 'مستثمر أساسي'}
            </span>
          </div>
        </div>

        {user.kycStatus === 'rejected' && (
          <div className="flex items-start gap-2 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">تم رفض التحقق من الهوية</p>
              <p className="text-sm text-red-600 mt-1">
                يرجى التواصل مع الدعم الفني لمزيد من المعلومات
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}