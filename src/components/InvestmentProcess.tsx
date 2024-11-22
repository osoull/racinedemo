import React from 'react';
import { UserCircle2, Target, Wallet, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: "إنشاء حساب",
    description: "سجل حساب جديد وأكمل عملية التحقق من الهوية",
    icon: <UserCircle2 className="h-8 w-8 text-white" />
  },
  {
    title: "اختر الفرصة",
    description: "تصفح الفرص الاستثمارية واختر ما يناسبك",
    icon: <Target className="h-8 w-8 text-white" />
  },
  {
    title: "استثمر",
    description: "حدد مبلغ الاستثمار وأكمل عملية الدفع",
    icon: <Wallet className="h-8 w-8 text-white" />
  },
  {
    title: "تابع استثماراتك",
    description: "راقب أداء استثماراتك واستلم عوائدك",
    icon: <TrendingUp className="h-8 w-8 text-white" />
  }
];

export default function InvestmentProcess() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#2B227C]/10 text-[#2B227C] rounded-lg text-sm font-medium mb-4">
            كيف تستثمر
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B227C] mb-4">خطوات الاستثمار</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            عملية استثمار بسيطة وسريعة تمكنك من بدء رحلتك الاستثمارية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-[#2B227C] rounded-2xl p-8 text-center h-full">
                <div className="bg-white/10 p-4 rounded-xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-2 bg-[#2B227C]/20 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}