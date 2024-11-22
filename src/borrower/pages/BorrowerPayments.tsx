import React from 'react';
import { Calendar, CreditCard, ArrowUpRight, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function BorrowerPayments() {
  const payments = [
    {
      id: 1,
      amount: 25000,
      dueDate: '2024-04-01',
      status: 'pending',
      project: 'مشروع التوسعة'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">السداد</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">الدفعة القادمة</h3>
          <p className="text-2xl font-bold">{formatCurrency(25000)}</p>
          <p className="text-sm text-gray-500 mt-2">
            تاريخ الاستحقاق: {new Date('2024-04-01').toLocaleDateString('ar-SA')}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">إجمالي المدفوعات</h3>
          <p className="text-2xl font-bold">{formatCurrency(150000)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">المتأخرات</h3>
          <p className="text-2xl font-bold">{formatCurrency(0)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">سجل المدفوعات</h3>
        </div>
        <div className="divide-y">
          {payments.map((payment) => (
            <div key={payment.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-[#2B227C]" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.project}</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(payment.amount)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 ml-2" />
                  <span className="text-sm text-gray-500">
                    {new Date(payment.dueDate).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {payment.status === 'pending' ? 'معلق' : 'مكتمل'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}