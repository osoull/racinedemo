import React, { useState } from 'react';
import { useAuthStore } from '../../services/auth';
import { formatCurrency } from '../../utils/formatters';
import { Wallet, ArrowUpRight, History, Plus, Calendar } from 'lucide-react';
import DepositModal from '../../components/DepositModal';

export default function InvestorWallet() {
  const { user } = useAuthStore();
  const [showDepositModal, setShowDepositModal] = useState(false);

  const walletData = {
    balance: 50000,
    pendingBalance: 2500,
    transactions: [
      {
        id: 1,
        type: 'deposit',
        amount: 25000,
        status: 'completed',
        date: '2024-03-15',
        reference: 'DEP-001'
      },
      {
        id: 2,
        type: 'investment',
        amount: -15000,
        status: 'completed',
        date: '2024-03-14',
        reference: 'INV-001',
        project: 'مشروع وقف الخير'
      },
      {
        id: 3,
        type: 'investment',
        amount: -10000,
        status: 'pending',
        date: '2024-03-13',
        reference: 'INV-002',
        project: 'مشروع الإسكان الخيري'
      }
    ]
  };

  const handleDeposit = async (amount: number, method: 'card' | 'bank') => {
    // Here you would integrate with your payment gateway
    console.log('Processing deposit:', { amount, method });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Handle success/error
    // You might want to update the wallet balance and transaction history here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">المحفظة</h1>
        <p className="text-gray-600">إدارة رصيدك واستثماراتك</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#2B227C]/10 p-3 rounded-lg">
              <Wallet className="h-6 w-6 text-[#2B227C]" />
            </div>
            <button 
              onClick={() => setShowDepositModal(true)}
              className="flex items-center gap-2 text-[#2B227C] hover:text-[#1a1648]"
            >
              <Plus className="h-5 w-5" />
              <span>إيداع</span>
            </button>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">الرصيد المتاح</h3>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(walletData.balance)}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <History className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-2">الرصيد المعلق</h3>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(walletData.pendingBalance)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <button 
          onClick={() => setShowDepositModal(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-[#2B227C] text-white rounded-xl hover:bg-[#1a1648] transition-colors"
        >
          <ArrowUpRight className="h-5 w-5" />
          <span>إيداع رصيد</span>
        </button>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">سجل المعاملات</h2>
        </div>
        <div className="divide-y">
          {walletData.transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'deposit' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <History className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'deposit' 
                        ? 'إيداع' 
                        : 'استثمار'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.project || transaction.reference}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 justify-end mt-1">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>{new Date(transaction.date).toLocaleDateString('ar-SA')}</span>
                  </div>
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

      {/* Deposit Modal */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDeposit={handleDeposit}
      />
    </div>
  );
}