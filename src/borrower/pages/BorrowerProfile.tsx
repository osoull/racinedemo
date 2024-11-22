import React from 'react';
import { useAuthStore } from '../../services/auth';
import { User, Mail, Phone, Calendar, Building2, Shield } from 'lucide-react';
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload';
import BankAccountForm from '../../components/BankAccountForm';
import { toast } from 'react-hot-toast';

export default function BorrowerProfile() {
  const { user, updatePhoto, updateProfile } = useAuthStore();

  const handlePhotoUpload = async (file: File) => {
    try {
      // Simulate file upload and get URL
      const fakeUrl = URL.createObjectURL(file);
      await updatePhoto(fakeUrl);
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };

  const handleBankUpdate = async (bankInfo: any) => {
    try {
      await updateProfile({ bankInfo: { ...bankInfo, verified: false } });
      toast.success('تم تحديث معلومات الحساب البنكي بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث معلومات الحساب البنكي');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">الملف الشخصي</h2>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-8">
          <ProfilePhotoUpload
            currentPhotoUrl={user?.photoUrl}
            onUpload={handlePhotoUpload}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">الاسم</p>
              <p className="font-medium">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
            <Building2 className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">نوع المنشأة</p>
              <p className="font-medium">
                {user?.borrowerType === 'company' ? 'شركة' : 'مؤسسة'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">البريد الإلكتروني</p>
              <p className="font-medium">{user?.email}</p>
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
                user?.kycStatus === 'verified'
                  ? 'bg-green-100 text-green-800'
                  : user?.kycStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {user?.kycStatus === 'verified' ? 'تم التحقق' :
                 user?.kycStatus === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <BankAccountForm 
        bankInfo={user?.bankInfo}
        onSubmit={handleBankUpdate}
      />
    </div>
  );
}