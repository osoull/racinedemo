import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'يناير', investorFees: 25000, projectFees: 35000 },
  { month: 'فبراير', investorFees: 30000, projectFees: 40000 },
  { month: 'مارس', investorFees: 35000, projectFees: 45000 },
  { month: 'أبريل', investorFees: 40000, projectFees: 50000 },
  { month: 'مايو', investorFees: 45000, projectFees: 55000 },
  { month: 'يونيو', investorFees: 50000, projectFees: 60000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-900 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="inline-block w-3 h-3 rounded-full bg-[#2B227C] ml-2"></span>
            عمولات المستثمرين: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 rounded-full bg-[#E63946] ml-2"></span>
            عمولات المشاريع: {formatCurrency(payload[1].value)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const [chartHeight, setChartHeight] = useState(320);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 640) { // Mobile
        setChartHeight(280);
      } else if (width < 1024) { // Tablet
        setChartHeight(320);
      } else { // Desktop
        setChartHeight(360);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <div>
          <h3 className="text-lg font-semibold">تحليل العمولات</h3>
          <p className="text-sm text-gray-500">آخر 6 أشهر</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select className="text-sm border rounded-lg px-3 py-2 w-full sm:w-auto">
            <option>آخر 6 أشهر</option>
            <option>آخر سنة</option>
          </select>
        </div>
      </div>

      <div style={{ height: chartHeight }} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: isMobile ? 10 : 30,
              left: isMobile ? 10 : 30,
              bottom: isMobile ? 20 : 5
            }}
            barGap={isMobile ? 4 : 8}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#6B7280', 
                fontSize: isMobile ? 10 : 12,
                textAnchor: isMobile ? 'end' : 'middle',
                dy: isMobile ? 10 : 0,
                transform: isMobile ? 'rotate(-45)' : undefined
              }}
              height={isMobile ? 60 : 30}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#6B7280', 
                fontSize: isMobile ? 10 : 12 
              }}
              tickFormatter={(value) => `${value / 1000}K`}
              width={isMobile ? 35 : 45}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(43, 34, 124, 0.05)' }}
            />
            <Legend 
              verticalAlign="top"
              align="left"
              wrapperStyle={{ 
                paddingBottom: isMobile ? '10px' : '20px',
                fontSize: isMobile ? '10px' : '12px'
              }}
              formatter={(value) => {
                return value === 'investorFees' ? 'عمولات المستثمرين' : 'عمولات المشاريع';
              }}
            />
            <Bar 
              dataKey="investorFees" 
              fill="#2B227C"
              radius={[4, 4, 0, 0]}
              maxBarSize={isMobile ? 20 : 40}
            />
            <Bar 
              dataKey="projectFees" 
              fill="#E63946"
              radius={[4, 4, 0, 0]}
              maxBarSize={isMobile ? 20 : 40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">إجمالي عمولات المستثمرين</p>
          <p className="text-xl sm:text-2xl font-bold text-[#2B227C]">
            {formatCurrency(data.reduce((sum, item) => sum + item.investorFees, 0))}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">إجمالي عمولات المشاريع</p>
          <p className="text-xl sm:text-2xl font-bold text-[#E63946]">
            {formatCurrency(data.reduce((sum, item) => sum + item.projectFees, 0))}
          </p>
        </div>
      </div>
    </div>
  );
}