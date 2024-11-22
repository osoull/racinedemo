import React from 'react';
import { Building2, TrendingUp, Shield, Users, Target, Calendar, ChevronLeft } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';

export default function Investor() {
  const stats = [
    {
      title: "إجمالي الاستثمارات",
      value: formatCurrency(500000000),
      growth: "+12.5%",
      icon: <Building2 className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "عدد المستثمرين",
      value: formatNumber(1500),
      growth: "+8.3%",
      icon: <Users className="h-6 w-6 text-blue-600" />
    },
    {
      title: "متوسط العائد",
      value: formatPercentage(15.7),
      growth: "+2.1%",
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />
    }
  ];

  const features = [
    {
      title: "فرص استثمارية متنوعة",
      description: "محفظة متنوعة من الاستثمارات في قطاعات واعدة",
      icon: <Target className="h-8 w-8 text-[#2B227C]" />
    },
    {
      title: "عوائد مجزية",
      description: "عوائد استثمارية تنافسية مع مخاطر مدروسة",
      icon: <TrendingUp className="h-8 w-8 text-[#2B227C]" />
    },
    {
      title: "حماية استثمارية",
      description: "ضمانات وحماية قانونية لاستثماراتك",
      icon: <Shield className="h-8 w-8 text-[#2B227C]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616091216791-a5360b5fc78a"
            alt="KAFD - King Abdullah Financial District"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B227C]/95 to-[#2B227C]/80"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">استثمر في مستقبلك</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              نقدم فرصاً استثمارية متنوعة ومتوافقة مع الشريعة الإسلامية لتنمية ثروتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#E63946] text-white px-8 py-4 rounded-xl hover:bg-[#E63946]/90 transition-colors text-lg font-medium">
                ابدأ الاستثمار
              </button>
              <button className="bg-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-colors text-lg font-medium backdrop-blur-sm">
                تعرف على الفرص
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    {stat.icon}
                  </div>
                  <span className="text-sm text-emerald-600 font-medium">{stat.growth}</span>
                </div>
                <h3 className="text-gray-600 text-sm mb-2">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#2B227C] mb-4">مميزات الاستثمار معنا</h2>
            <p className="text-xl text-gray-600">
              نوفر لك تجربة استثمارية متكاملة تجمع بين الأمان والربحية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="bg-[#2B227C]/10 p-4 rounded-xl w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2B227C] mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2B227C] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            ابدأ رحلة الاستثمار مع رسين
          </h2>
          <button className="bg-white text-[#2B227C] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg font-medium">
            افتح حساب الآن
          </button>
        </div>
      </section>
    </div>
  );
}