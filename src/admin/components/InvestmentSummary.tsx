import React from 'react';
import { Wallet, Target, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useInvestments } from '../../hooks/useInvestments';

interface InvestmentSummaryProps {
  userId: string;
}

export default function InvestmentSummary({ userId }: InvestmentSummaryProps) {
  const { data: investments, isLoading } = useInvestments(userId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg">
              <div className="h-8 w-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalInvested = investments?.reduce((sum, inv) => sum + inv.amount, 0) || 0;
  const activeInvestments = investments?.filter(inv => inv.status === 'active').length || 0;
  const averageReturn = investments && investments.length > 0
    ? investments.reduce((sum, inv) => sum + inv.expectedReturn, 0) / investments.length
    : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">ملخص الاستثمارات</h3>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Wallet className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-500">إجمالي الاستثمارات</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totalInvested)}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">المشاريع النشطة</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(activeInvestments)}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">متوسط العائد</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(averageReturn)}%</p>
        </div>
      </div>
    </div>
  );
}