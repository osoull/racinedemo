import React from 'react';
import { useAuthStore } from '../../services/auth';
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react';
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload';

export default function AdminProfile() {
  const { user, updatePhoto } = useAuthStore();

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
              <p className="text-sm text-gray-500">البريد الإلكتروني</p>
              <p className="font-medium">{user?.email}</p>
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
        </div>

        <div className="mt-6">
          <button className="w-full py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] transition-colors">
            تحديث البيانات
          </button>
        </div>
      </div>
    </div>
  );
}