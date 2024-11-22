import React from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function AdminWallets() {
  const wallets = [
    {
      id: 1,
      user: {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
      },
      balance: 250000,
      pendingBalance: 15000,
      totalDeposits: 300000,
      totalWithdrawals: 50000,
      lastTransaction: '2024-03-15',
      status: 'نشط',
    },
    // Add more wallets as needed
  ];

  const transactions = [
    {
      id: 1,
      userId: 1,
      type: 'deposit',
      amount: 25000,
      status: 'completed',
      date: '2024-03-15',
      reference: 'DEP-001'
    },
    {
      id: 2,
      userId: 1,
      type: 'withdrawal',
      amount: -10000,
      status: 'pending',
      date: '2024-03-14',
      reference: 'WIT-001'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إدارة المحافظ</h2>
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
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]">
            <Download className="h-5 w-5" />
            <span>تصدير</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'إجمالي الأرصدة',
            value: formatCurrency(5000000),
            change: '+12%'
          },
          {
            title: 'الأرصدة المعلقة',
            value: formatCurrency(250000),
            change: '+5%'
          },
          {
            title: 'إجمالي الإيداعات',
            value: formatCurrency(7500000),
            change: '+15%'
          },
          {
            title: 'إجمالي السحوبات',
            value: formatCurrency(2500000),
            change: '+8%'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center text-sm text-green-600 mb-2">
              <span>آخر 30 يوم</span>
              <span>{stat.change}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Wallets Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">محافظ المستثمرين</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستثمر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرصيد الحالي</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الرصيد المعلق</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجمالي الإيداعات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجمالي السحوبات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">آخر معاملة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wallets.map((wallet) => (
                <tr key={wallet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#2B227C]/10 flex items-center justify-center">
                          <span className="text-[#2B227C] font-medium">{wallet.user.name[0]}</span>
                        </div>
                      </div>
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">{wallet.user.name}</div>
                        <div className="text-sm text-gray-500">{wallet.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(wallet.balance)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(wallet.pendingBalance)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600">
                      {formatCurrency(wallet.totalDeposits)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-600">
                      {formatCurrency(wallet.totalWithdrawals)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(wallet.lastTransaction).toLocaleDateString('ar-SA')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {wallet.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">آخر المعاملات</h3>
        </div>
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'deposit' ? 'إيداع' : 'سحب'}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  transaction.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
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