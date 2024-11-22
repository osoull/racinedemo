import React from 'react';
import { Building2, Shield, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface BorrowerFinancialSummaryProps {
  totalBorrowed: number;
  activeLoans: number;
  nextPayment: {
    amount: number;
    date: string;
  };
}

export default function BorrowerFinancialSummary({ 
  totalBorrowed, 
  activeLoans, 
  nextPayment 
}: BorrowerFinancialSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-emerald-100 p-3 rounded-lg">
            <Building2 className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <h3 className="text-gray-600 text-sm mb-2">إجمالي التمويل</h3>
        <p className="text-2xl font-bold">{formatCurrency(totalBorrowed)}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-gray-600 text-sm mb-2">القروض النشطة</h3>
        <p className="text-2xl font-bold">{activeLoans}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <h3 className="text-gray-600 text-sm mb-2">الدفعة القادمة</h3>
        <p className="text-2xl font-bold">{formatCurrency(nextPayment.amount)}</p>
        <p className="text-sm text-gray-500 mt-2">
          تاريخ الاستحقاق: {new Date(nextPayment.date).toLocaleDateString('ar-SA')}
        </p>
      </div>
    </div>
  );
}