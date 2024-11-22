import React from 'react';
import { Calendar, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function BorrowerSchedule() {
  const schedule = [
    {
      id: 1,
      amount: 25000,
      dueDate: '2024-04-01',
      project: 'مشروع التوسعة',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">جدول السداد</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">المدفوعات القادمة</h3>
        </div>
        <div className="divide-y">
          {schedule.map((payment) => (
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
              <div className="mt-4">
                <button className="px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]">
                  سداد الدفعة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}