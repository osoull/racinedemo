import React from 'react';
import { History, Calendar, FileText } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function BorrowerHistory() {
  const history = [
    {
      id: 1,
      type: 'payment',
      amount: 25000,
      date: '2024-03-15',
      description: 'سداد دفعة مشروع التوسعة',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">سجل المعاملات</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">المعاملات السابقة</h3>
        </div>
        <div className="divide-y">
          {history.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <History className="h-5 w-5 text-[#2B227C]" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 ml-1" />
                      <span>{new Date(transaction.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status === 'completed' ? 'مكتمل' : 'معلق'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">سجل المستندات</h3>
        </div>
        <div className="divide-y">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#2B227C]" />
                  </div>
                  <div>
                    <p className="font-medium">تم رفع مستند جديد</p>
                    <p className="text-sm text-gray-500">السجل التجاري</p>
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
  );
}