import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  minInvestment: number;
  projectTitle: string;
  onInvest: (amount: number) => Promise<void>;
}

export default function InvestmentModal({
  isOpen,
  onClose,
  minInvestment,
  projectTitle,
  onInvest
}: InvestmentModalProps) {
  const [amount, setAmount] = useState(minInvestment);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleInvest = async () => {
    if (amount < minInvestment) return;
    setIsProcessing(true);
    try {
      await onInvest(amount);
      onClose();
    } catch (error) {
      console.error('Investment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">استثمار في {projectTitle}</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مبلغ الاستثمار ({formatCurrency(0, false)})
            </label>
            <input
              type="number"
              min={minInvestment}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2B227C]"
            />
            <p className="mt-2 text-sm text-gray-500">
              الحد الأدنى للاستثمار: {formatCurrency(minInvestment)}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleInvest}
              disabled={isProcessing || amount < minInvestment}
              className="px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] disabled:opacity-50"
            >
              {isProcessing ? 'جاري المعالجة...' : 'تأكيد الاستثمار'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}