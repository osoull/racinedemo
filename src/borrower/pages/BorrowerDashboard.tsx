import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../services/auth';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import {
  Building2,
  FileText,
  ChevronLeft,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const fundingData = [
  { month: 'يناير', amount: 500000 },
  { month: 'فبراير', amount: 750000 },
  { month: 'مارس', amount: 1000000 },
  { month: 'أبريل', amount: 1250000 },
  { month: 'مايو', amount: 1500000 },
  { month: 'يونيو', amount: 1750000 },
];

export default function BorrowerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Demo projects data
  const projects = [
    {
      id: 1,
      title: 'مشروع التوسعة',
      category: 'تمويل التوسع',
      requestedAmount: 1000000,
      raisedAmount: 750000,
      investors: 120,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      nextPayment: {
        amount: 25000,
        date: '2024-04-01'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#2B227C] to-[#1a1648] rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">مرحباً {user?.name}</h1>
            <p className="text-white/80">هذا ملخص مشاريعك التمويلية</p>
          </div>
          <div className="text-left">
            <p className="text-sm text-white/80">تاريخ اليوم</p>
            <p className="text-lg font-semibold text-white">{new Date().toLocaleDateString('ar-SA')}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-600 font-medium">
              {projects.length} مشروع
            </span>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">المشاريع النشطة</h3>
          <p className="text-2xl font-bold">{formatNumber(projects.length)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">إجمالي التمويل</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(projects.reduce((acc, curr) => acc + curr.raisedAmount, 0))}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">الدفعة القادمة</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(projects[0]?.nextPayment.amount || 0)}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(projects[0]?.nextPayment.date || '').toLocaleDateString('ar-SA')}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">المستثمرون</h3>
          <p className="text-2xl font-bold">
            {formatNumber(projects.reduce((acc, curr) => acc + curr.investors, 0))}
          </p>
        </div>
      </div>

      {/* Funding Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">تحليل التمويل</h3>
          <select className="text-sm border rounded-lg px-3 py-2">
            <option>آخر 6 أشهر</option>
            <option>آخر سنة</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fundingData}>
              <defs>
                <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2B227C" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2B227C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
                labelStyle={{ textAlign: 'right' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#2B227C"
                fillOpacity={1}
                fill="url(#fundingGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Projects */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">المشاريع النشطة</h3>
        </div>
        <div className="divide-y">
          {projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-[#2B227C]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-500">{project.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/borrower/projects/${project.id}`)}
                  className="text-[#2B227C] hover:text-[#1a1648] text-sm font-medium inline-flex items-center"
                >
                  التفاصيل
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">المبلغ المطلوب</p>
                  <p className="font-medium">{formatCurrency(project.requestedAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">المبلغ المجمع</p>
                  <p className="font-medium">{formatCurrency(project.raisedAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">عدد المستثمرين</p>
                  <p className="font-medium">{formatNumber(project.investors)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">تاريخ الانتهاء</p>
                  <p className="font-medium">
                    {new Date(project.endDate).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                      قيد التمويل
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-600">
                      {Math.round((project.raisedAmount / project.requestedAmount) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div
                    style={{ width: `${(project.raisedAmount / project.requestedAmount) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  />
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا توجد مشاريع نشطة حالياً
            </div>
          )}
        </div>
      </div>

      {/* Next Payments */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">الدفعات القادمة</h3>
        </div>
        <div className="divide-y">
          {projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-[#2B227C]" />
                  </div>
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(project.nextPayment.amount)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 ml-2" />
                  <span className="text-sm text-gray-500">
                    {new Date(project.nextPayment.date).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}