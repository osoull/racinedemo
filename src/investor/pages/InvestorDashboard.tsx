import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../services/auth';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import {
  Target,
  Wallet,
  FileText,
  ChevronLeft,
  BarChart3,
  TrendingUp,
  User
} from 'lucide-react';

export default function InvestorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#2B227C] to-[#1a1648] rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">مرحباً {user?.name}</h1>
            <p className="text-white/80">هذا ملخص محفظتك الاستثمارية</p>
          </div>
          <div className="text-left">
            <p className="text-sm text-white/80">تاريخ اليوم</p>
            <p className="text-lg font-semibold text-white">{new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'إجمالي الاستثمارات',
            value: formatCurrency(75000),
            change: '+12%',
            icon: <Wallet className="h-6 w-6 text-emerald-600" />,
            color: 'emerald'
          },
          {
            title: 'المشاريع النشطة',
            value: formatNumber(3),
            change: '+1',
            icon: <Target className="h-6 w-6 text-blue-600" />,
            color: 'blue'
          },
          {
            title: 'العائد المتوقع',
            value: '15.7%',
            change: '+2.1%',
            icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
            color: 'purple'
          },
          {
            title: 'رصيد المحفظة',
            value: formatCurrency(25000),
            change: '+5000',
            icon: <BarChart3 className="h-6 w-6 text-amber-600" />,
            color: 'amber'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-${stat.color}-100 p-3 rounded-xl`}>
                {stat.icon}
              </div>
              <span className={`text-${stat.color}-600 text-sm font-medium`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">إجراءات سريعة</h3>
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/investor/projects')}
            className="w-full flex items-center justify-between p-4 bg-[#2B227C]/5 rounded-xl hover:bg-[#2B227C]/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#2B227C] p-2 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">استكشاف الفرص الاستثمارية</span>
            </div>
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/investor/wallet')}
            className="w-full flex items-center justify-between p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">شحن المحفظة</span>
            </div>
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/investor/investments')}
            className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">تقارير الأداء</span>
            </div>
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">النشاط الحديث</h3>
        </div>
        <div className="divide-y">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-[#2B227C]" />
                  </div>
                  <div>
                    <p className="font-medium">استثمار جديد</p>
                    <p className="text-sm text-gray-500">مشروع وقف الخير</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-600">{formatCurrency(25000)}</p>
                  <p className="text-sm text-gray-500">{new Date().toLocaleDateString('ar-SA')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}