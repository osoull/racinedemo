import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Wallet, 
  FileText, 
  ArrowUpRight,
  TrendingUp,
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
import { useAuthStore } from '../store/authStore';
import { formatCurrency, formatNumber } from '../utils/formatters';

const performanceData = [
  { month: 'يناير', value: 12000 },
  { month: 'فبراير', value: 15000 },
  { month: 'مارس', value: 18000 },
  { month: 'أبريل', value: 16000 },
  { month: 'مايو', value: 21000 },
  { month: 'يونيو', value: 25000 },
];

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const formatTooltipValue = (value: number) => {
    return formatCurrency(value);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">مرحباً، {user?.name}</h1>
          <p className="text-gray-600">إليك نظرة عامة على محفظتك الاستثمارية</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Wallet className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-sm text-emerald-600 font-medium">+{formatNumber(12.5)}%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">إجمالي الاستثمارات</h3>
            <p className="text-2xl font-bold">{formatCurrency(125000)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">{formatNumber(8)} مشاريع</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">المشاريع النشطة</h3>
            <p className="text-2xl font-bold">{formatCurrency(75000)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-purple-600 font-medium">+{formatNumber(5.2)}%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">العائد السنوي</h3>
            <p className="text-2xl font-bold">{formatCurrency(8750)}</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">أداء المحفظة</h2>
            <select className="text-sm border rounded-md px-3 py-2">
              <option>آخر 6 أشهر</option>
              <option>آخر سنة</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={formatTooltipValue} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#059669" 
                  fill="#10B981" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Investments */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">الاستثمارات النشطة</h2>
          </div>
          <div className="divide-y">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <img
                      src={`https://images.unsplash.com/photo-${1584551246679 + index}-0daf3d275d0f`}
                      alt="Project"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">مشروع وقف {formatNumber(index + 1)}</h3>
                      <p className="text-sm text-gray-500">تاريخ الاستثمار: {new Date().toLocaleDateString('ar-SA')}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/projects/${index + 1}`}
                    className="flex items-center text-emerald-600 hover:text-emerald-700"
                  >
                    <span className="text-sm">التفاصيل</span>
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  </Link>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-500">المبلغ المستثمر:</span>
                    <span className="font-medium mr-2">{formatCurrency(25000)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">العائد المتوقع:</span>
                    <span className="font-medium mr-2">{formatNumber(8.5)}%</span>
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