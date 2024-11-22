import React from 'react';
import { Users, Leaf, Brain, Shield, Check, FileText, Scale } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';

export default function Social() {
  const impactStats = [
    {
      value: formatNumber(50),
      label: "مشروع مجتمعي",
      description: "تم تنفيذه"
    },
    {
      value: formatCurrency(10000000),
      label: "استثمارات مجتمعية",
      description: "تم ضخها"
    },
    {
      value: formatNumber(100000),
      label: "مستفيد",
      description: "من مشاريعنا"
    }
  ];

  const initiatives = [
    {
      title: "التعليم والتدريب",
      description: "برامج تدريبية وتعليمية لتطوير المهارات وبناء القدرات",
      icon: <Brain className="h-8 w-8 text-[#2B227C]" />
    },
    {
      title: "الاستدامة البيئية",
      description: "مبادرات للحفاظ على البيئة وتعزيز الممارسات المستدامة",
      icon: <Leaf className="h-8 w-8 text-[#2B227C]" />
    },
    {
      title: "التمكين الاقتصادي",
      description: "دعم المشاريع الصغيرة والمتوسطة وريادة الأعمال",
      icon: <Scale className="h-8 w-8 text-[#2B227C]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f"
            alt="Social Impact in Saudi Arabia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B227C]/95 to-[#2B227C]/80"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">المسؤولية الاجتماعية</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              نلتزم بتحقيق أثر إيجابي في المجتمع من خلال مبادراتنا المتنوعة
            </p>
            <button className="bg-[#E63946] text-white px-8 py-4 rounded-xl hover:bg-[#E63946]/90 transition-colors text-lg font-medium">
              اكتشف مبادراتنا
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 -mt-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <p className="text-3xl font-bold text-[#E63946] mb-2">{stat.value}</p>
                <h3 className="text-xl font-bold text-[#2B227C] mb-2">{stat.label}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#2B227C] mb-4">مبادراتنا المجتمعية</h2>
            <p className="text-xl text-gray-600">
              نعمل على تحقيق التنمية المستدامة من خلال مبادرات متنوعة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="bg-gray-50 p-4 rounded-xl w-fit mb-6">
                  {initiative.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2B227C] mb-4">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#2B227C] mb-4">التزامنا المجتمعي</h2>
            <p className="text-xl text-gray-600">
              نسعى لتحقيق التوازن بين النمو الاقتصادي والمسؤولية المجتمعية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                "دعم المشاريع التنموية المستدامة",
                "تمكين الشباب وتطوير مهاراتهم",
                "تعزيز الشمول المالي",
                "حماية البيئة والموارد الطبيعية"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-full mt-1">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-lg text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-[#2B227C]/10 p-4 rounded-xl mb-6">
                <Shield className="h-12 w-12 text-[#2B227C]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2B227C] mb-4">حوكمة المسؤولية المجتمعية</h3>
              <p className="text-gray-600 mb-6">
                نتبنى أفضل الممارسات العالمية في مجال المسؤولية المجتمعية للشركات، ونلتزم بمعايير الحوكمة البيئية والاجتماعية.
              </p>
              <button className="w-full bg-[#2B227C] text-white py-3 rounded-lg hover:bg-[#1a1648] transition-colors">
                تعرف على المزيد
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2B227C] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            شارك معنا في بناء مستقبل أفضل
          </h2>
          <button className="bg-white text-[#2B227C] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg font-medium">
            اكتشف فرص المشاركة
          </button>
        </div>
      </section>
    </div>
  );
}