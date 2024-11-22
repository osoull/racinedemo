import React from 'react';
import { Building2, FileText, Wallet, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const types = [
  {
    title: "تمويل مشاريع طرف ثاني",
    description: "تمويل مشاريع الشركات والمؤسسات القائمة بضمانات موثوقة",
    icon: <Building2 className="h-8 w-8 text-[#2B227C]" />,
    return: "12-15%",
    period: "سنوياً",
    min: formatCurrency(10000),
    features: [
      "تمويل يصل إلى 5 مليون ريال",
      "مدة سداد تصل إلى 36 شهر",
      "ضمانات عقارية وتجارية",
      "دراسة ائتمانية شاملة"
    ]
  },
  {
    title: "تمويل الفواتير",
    description: "تمويل الفواتير التجارية المعتمدة مع عوائد سريعة",
    icon: <FileText className="h-8 w-8 text-[#2B227C]" />,
    return: "10-12%",
    period: "سنوياً",
    min: formatCurrency(5000),
    features: [
      "تمويل فواتير حكومية وشركات كبرى",
      "مدة استثمار 30-180 يوم",
      "عوائد شهرية",
      "مخاطر منخفضة"
    ]
  },
  {
    title: "تمويل رأس المال العامل",
    description: "تمويل احتياجات رأس المال العامل للشركات المستقرة",
    icon: <Wallet className="h-8 w-8 text-[#2B227C]" />,
    return: "13-16%",
    period: "سنوياً",
    min: formatCurrency(15000),
    features: [
      "تمويل يصل إلى 3 مليون ريال",
      "مدة سداد مرنة",
      "دراسة ائتمانية شاملة",
      "متابعة دورية للأداء"
    ]
  }
];

export default function InvestmentTypes() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#2B227C]/10 text-[#2B227C] rounded-lg text-sm font-medium mb-4">
            فرص استثمارية
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B227C] mb-4">فرص استثمارية متنوعة</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة متنوعة من الفرص الاستثمارية المدروسة والمتوافقة مع الشريعة الإسلامية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((type, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="bg-[#2B227C]/10 p-4 rounded-xl w-fit mb-6">
                {type.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2B227C] mb-4">{type.title}</h3>
              <p className="text-gray-600 mb-6">{type.description}</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">العائد المتوقع</span>
                  <span className="font-bold text-[#E63946]">{type.return}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">الحد الأدنى</span>
                  <span className="font-bold">{type.min}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-[#E63946]"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#2B227C] text-[#2B227C] rounded-xl hover:bg-[#2B227C] hover:text-white transition-colors">
                <span>استثمر الآن</span>
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}