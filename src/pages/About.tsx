import React from 'react';
import { Building2, Target, Users, Shield, TrendingUp, Scale, Gem, BarChart3, Briefcase, LineChart } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';

export default function About() {
  const stats = [
    {
      value: formatCurrency(8500000),
      label: "رأس المال المدفوع",
      description: "شركة خدمات مالية متكاملة"
    },
    {
      value: formatPercentage(15.7),
      label: "معدل النمو السنوي",
      description: "نمو مستدام في حجم الأصول"
    },
    {
      value: formatCurrency(500000000),
      label: "الأصول المدارة",
      description: "محفظة متنوعة من الاستثمارات"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* Hero Section */}
      <div className="relative bg-[#2B227C] text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
            alt="Riyadh Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B227C]/95 to-[#2B227C]/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            رسين للاستثمار
          </h1>
          <p className="text-xl text-gray-100 leading-relaxed">
            شريككم الموثوق في تحقيق النمو المالي المستدام وفق مبادئ الشريعة الإسلامية
          </p>
        </div>
        
        {/* Stats Section - Overlapping Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    {index === 0 ? (
                      <Scale className="h-8 w-8 text-emerald-600" />
                    ) : index === 1 ? (
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    ) : (
                      <Gem className="h-8 w-8 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  </div>
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rest of the About page content */}
      <div className="pt-40 pb-20">
        {/* Company Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#2B227C] mb-8">نبذة عن الشركة</h2>
            <div className="prose prose-lg text-gray-600 mx-auto">
              <p className="mb-6">
                رسين للاستثمار هي الذراع الاستثماري لمجموعة أصول كابيتال بارتنرز، تأسست بهدف تنويع ونمو استثمارات المجموعة في القطاعات الواعدة والمتسارعة النمو.
              </p>
              <p>
                نقدم خدمات ومنتجات استثمارية متوافقة مع الشريعة الإسلامية، مصممة خصيصاً لتلبية احتياجات عملائنا من الأفراد والمؤسسات، مع التركيز على تحقيق عوائد مستدامة على المدى الطويل.
              </p>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-[#2B227C]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-[#2B227C]" />
              </div>
              <h3 className="text-xl font-bold text-[#2B227C] mb-4">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                أن نكون الشريك الاستثماري المفضل في المملكة العربية السعودية، من خلال تقديم حلول استثمارية مبتكرة تساهم في تحقيق رؤية 2030.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-[#2B227C]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-[#2B227C]" />
              </div>
              <h3 className="text-xl font-bold text-[#2B227C] mb-4">رسالتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                تقديم خدمات استثمارية متميزة تلبي تطلعات عملائنا وتساهم في تنمية الاقتصاد الوطني، مع الالتزام بأعلى معايير الجودة والشفافية.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-[#2B227C]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-[#2B227C]" />
              </div>
              <h3 className="text-xl font-bold text-[#2B227C] mb-4">قيمنا</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#E63946]"></div>
                  <span className="text-gray-600">النزاهة والشفافية</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#E63946]"></div>
                  <span className="text-gray-600">الابتكار والتميز</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#E63946]"></div>
                  <span className="text-gray-600">المسؤولية والالتزام</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Investment Strategy */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-gradient-to-br from-[#2B227C] to-[#1a1648] rounded-3xl shadow-xl overflow-hidden">
            <div className="relative p-12">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">استراتيجية الاستثمار</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">توحيد المصالح</h3>
                    <p className="text-gray-200 leading-relaxed">
                      نسعى إلى توحيد مصالح الشركة مع مصالح عملائنا دائماً، وذلك عن طريق الاستثمار المباشر في الصناديق التي نقوم بتأسيسها.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">مراقبة الفرص</h3>
                    <p className="text-gray-200 leading-relaxed">
                      نواصل العمل على مراقبة الفرص المتاحة في الأسواق المحلية والإقليمية والعالمية لتطوير الحلول الاستثمارية الجديدة.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <LineChart className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">حوكمة الشركات</h3>
                    <p className="text-gray-200 leading-relaxed">
                      نتبنى تطبيق قواعد حوكمة الشركات ورقابة الالتزام لإضافة ميزة الشفافية والقيمة المستدامة للمساهمين.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}