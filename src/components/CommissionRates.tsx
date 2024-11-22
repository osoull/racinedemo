import React from 'react';

export default function CommissionRates() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm" dir="rtl">
      <h3 className="text-xl font-bold text-[#2B227C] mb-6 text-right">نسب العمولات %</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Investor Commissions */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 text-right">عمولات المستثمرين</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 text-right">المستثمر الأساسي</span>
              <span className="font-bold text-[#2B227C]">2.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 text-right">المستثمر المؤهل</span>
              <span className="font-bold text-[#2B227C]">1.5%</span>
            </div>
          </div>
        </div>

        {/* Borrower Commissions */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 text-right">عمولات المقترضين</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 text-right">عمولة الإدارة</span>
              <span className="font-bold text-[#2B227C]">3%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 text-right">عمولة التحصيل</span>
              <span className="font-bold text-[#2B227C]">1%</span>
            </div>
          </div>
        </div>

        {/* Additional Fees */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 text-right">رسوم إضافية</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 text-right">رسوم دراسة الطلب</span>
              <span className="font-bold text-[#2B227C]">1000 ريال</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 text-right">رسوم السداد المبكر</span>
              <span className="font-bold text-[#2B227C]">1%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 text-right">
          * جميع العمولات والرسوم تخضع لضريبة القيمة المضافة (15%)
        </p>
      </div>
    </div>
  );
}