import React from 'react';
import { Calendar, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'late';
  project: string;
}

interface BorrowerPaymentHistoryProps {
  payments: Payment[];
}

export default function BorrowerPaymentHistory({ payments }: BorrowerPaymentHistoryProps) {
  return (
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
                  {new Date(payment.date).toLocaleDateString('ar-SA')}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                payment.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : payment.status === 'late'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {payment.status === 'completed' ? 'مكتمل' : 
                 payment.status === 'late' ? 'متأخر' : 'معلق'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}