import React from 'react';
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  Search,
  Calendar,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Activity
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const performanceData = [
  { month: 'يناير', investments: 1200000, projects: 8 },
  { month: 'فبراير', investments: 1500000, projects: 10 },
  { month: 'مارس', investments: 1800000, projects: 12 },
  { month: 'أبريل', investments: 2200000, projects: 15 },
  { month: 'مايو', investments: 2500000, projects: 18 },
  { month: 'يونيو', investments: 2800000, projects: 20 },
];

const projectTypes = [
  { name: 'عقاري', value: 45 },
  { name: 'وقف', value: 30 },
  { name: 'تجاري', value: 25 },
];

const COLORS = ['#10B981', '#6366F1', '#F59E0B'];

export default function AdminDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 pr-64" dir="rtl">
      <div className="max-w-[1800px] mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-600">مرحباً {user?.name}، هذا ملخص نشاط المنصة</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث..."
                className="w-full md:w-64 pr-10 pl-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              تقرير جديد
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="flex items-center text-emerald-600 text-sm font-medium">
                <ArrowUp className="h-4 w-4 ml-1" />
                12%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">إجمالي المستثمرين</h3>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <span className="text-sm text-gray-500 mr-2">مستثمر</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="flex items-center text-blue-600 text-sm font-medium">
                <ArrowUp className="h-4 w-4 ml-1" />
                8%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">المشاريع النشطة</h3>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">15</p>
              <span className="text-sm text-gray-500 mr-2">مشروع</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <span className="flex items-center text-purple-600 text-sm font-medium">
                <ArrowUp className="h-4 w-4 ml-1" />
                15%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">إجمالي الاستثمارات</h3>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">2.8M</p>
              <span className="text-sm text-gray-500 mr-2">ريال</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="flex items-center text-red-600 text-sm font-medium">
                <ArrowDown className="h-4 w-4 ml-1" />
                2%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">معدل العائد</h3>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">10.5%</p>
              <span className="text-sm text-gray-500 mr-2">سنوياً</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Investment Growth Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">نمو الاستثمارات</h3>
                <p className="text-sm text-gray-500">آخر 6 أشهر</p>
              </div>
              <select className="text-sm border rounded-lg px-3 py-2 bg-gray-50">
                <option>آخر 6 أشهر</option>
                <option>آخر سنة</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="investments"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#investmentGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Project Types Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">توزيع المشاريع</h3>
              <p className="text-sm text-gray-500">حسب النوع</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {projectTypes.map((type, index) => (
                <div key={type.name} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div
                      className="w-3 h-3 rounded-full ml-2"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm font-medium">{type.name}</span>
                  </div>
                  <p className="text-lg font-semibold">{type.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">النشاط الحديث</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">مستثمر جديد</p>
                      <p className="text-sm text-gray-500">انضم محمد أحمد إلى المنصة</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 ml-2" />
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}