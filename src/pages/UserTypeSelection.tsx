import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User } from 'lucide-react';

export default function UserTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Left Side - Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-white">
        <div className="max-w-md mx-auto w-full">
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8fefc08ff6352b1f82851d81737a6460.cdn.bubble.io%2Ff1729676645537x190880546208797250%2Flogo-horizontal-full.png"
            alt="رسين للاستثمار"
            className="h-40 w-auto mx-auto mb-12"
          />
          
          <h1 className="text-3xl font-bold text-[#2B227C] mb-8 text-center">
            إنشاء حساب جديد
          </h1>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/register/investor')}
              className="w-full flex items-center justify-between p-6 bg-white border-2 border-[#2B227C] rounded-xl hover:bg-[#2B227C]/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#2B227C]/10 p-3 rounded-xl group-hover:bg-[#2B227C]/20">
                  <User className="h-6 w-6 text-[#2B227C]" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-[#2B227C]">مستثمر</h3>
                  <p className="text-sm text-gray-600">استثمر في فرص تمويلية متنوعة</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/register/borrower')}
              className="w-full flex items-center justify-between p-6 bg-white border-2 border-[#2B227C] rounded-xl hover:bg-[#2B227C]/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#2B227C]/10 p-3 rounded-xl group-hover:bg-[#2B227C]/20">
                  <Building2 className="h-6 w-6 text-[#2B227C]" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-[#2B227C]">طلب تمويل</h3>
                  <p className="text-sm text-gray-600">احصل على تمويل لمشروعك</p>
                </div>
              </div>
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <a href="/login" className="font-medium text-[#2B227C] hover:text-[#E63946]">
                تسجيل الدخول
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          alt="Background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-16 text-white">
          <h2 className="text-4xl font-bold text-white mb-6">مرحباً بك في رسين للاستثمار</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            منصة رسين للاستثمار تقدم فرصاً استثمارية متنوعة ومتوافقة مع الشريعة الإسلامية
          </p>
        </div>
      </div>
    </div>
  );
}