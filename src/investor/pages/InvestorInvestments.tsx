import React from 'react';
import { Search, Filter, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

export default function InvestorInvestments() {
  const investments = [
    {
      id: 1,
      projectId: 1,
      projectTitle: 'مشروع وقف الخير',
      category: 'وقف',
      investedAmount: 25000,
      expectedReturn: '12%',
      status: 'نشط',
      startDate: '2024-01-01',
      nextPayment: '2024-04-01',
      progress: 75
    },
    {
      id: 2,
      projectId: 2,
      projectTitle: 'مشروع الإسكان الخيري',
      category: 'عقاري',
      investedAmount: 50000,
      expectedReturn: '15%',
      status: 'نشط',
      startDate: '2024-02-01',
      nextPayment: '2024-05-01',
      progress: 60
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">استثماراتي</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              className="w-64 pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>تصفية</span>
          </button>
        </div>
      </div>

      {/* Investment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">إجمالي الاستثمارات</h3>
          <p className="text-2xl font-bold">{formatCurrency(75000)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">العائد المتوقع</h3>
          <p className="text-2xl font-bold">13.5%</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm text-gray-500 mb-2">المشاريع النشطة</h3>
          <p className="text-2xl font-bold">2</p>
        </div>
      </div>

      {/* Investments List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">المشاريع المستثمر فيها</h3>
        </div>
        <div className="divide-y">
          {investments.map((investment) => (
            <div key={investment.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <span className="text-[#2B227C] font-medium">{investment.projectTitle[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{investment.projectTitle}</h4>
                    <span className="text-sm text-gray-500">{investment.category}</span>
                  </div>
                </div>
                <Link 
                  to={`/projects/${investment.projectId}`}
                  className="text-[#2B227C] hover:text-[#1a1648] text-sm font-medium inline-flex items-center"
                >
                  التفاصيل
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">المبلغ المستثمر</p>
                  <p className="font-medium">{formatCurrency(investment.investedAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">العائد المتوقع</p>
                  <p className="font-medium">{investment.expectedReturn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">تاريخ الاستثمار</p>
                  <p className="font-medium">{new Date(investment.startDate).toLocaleDateString('ar-SA')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الدفعة القادمة</p>
                  <p className="font-medium">{new Date(investment.nextPayment).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                      قيد التنفيذ
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-600">
                      {investment.progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div
                    style={{ width: `${investment.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}