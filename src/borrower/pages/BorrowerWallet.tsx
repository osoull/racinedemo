import React from 'react';
import { Wallet, ArrowUpRight, History, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function BorrowerWallet() {
  const transactions = [
    {
      id: 1,
      type: 'payment',
      amount: -25000,
      status: 'completed',
      date: '2024-03-15',
      reference: 'PAY-001',
      project: 'مشروع التوسعة'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">المحفظة</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#2B227C]/10 p-3 rounded-lg">
              <Wallet className="h-6 w-6 text-[#2B227C]" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">الرصيد المتاح</h3>
          <p className="text-3xl font-bold">{formatCurrency(50000)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">المدفوعات المستحقة</h3>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(25000)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">سجل المعاملات</h3>
        </div>
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <History className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.project}</p>
                    <p className="text-sm text-gray-500">{transaction.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 justify-end mt-1">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>{new Date(transaction.date).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {transaction.status === 'completed' ? 'مكتمل' : 'معلق'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}