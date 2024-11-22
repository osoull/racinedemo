import React, { useState } from 'react';
import { X, CreditCard, Building2, Copy, Check } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { useAuthStore } from '../services/auth';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number, method: 'card' | 'bank') => Promise<void>;
}

export default function DepositModal({ isOpen, onClose, onDeposit }: DepositModalProps) {
  const [method, setMethod] = useState<'card' | 'bank'>('card');
  const [amount, setAmount] = useState<number>(1000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useAuthStore();

  // Commission rates based on investor type
  const commissionRate = user?.investorType === 'qualified' ? 0.015 : 0.025; // 1.5% for qualified, 2.5% for basic

  const bankDetails = {
    bank: 'SAUDI BRITISH BANK, THE',
    iban: 'SA0645000000156318370080',
    swift: 'SABBSARIXXX',
    address: 'AL-AMIR ABDUL AZIZ IBN MOSSAAD IBN JALAWI STREET',
    city: 'RIYADH',
    zip: '11413',
    country: 'Saudi Arabia (SA)'
  };

  const handleDeposit = async () => {
    if (amount < 1000) {
      return;
    }
    setIsProcessing(true);
    try {
      // Calculate commission
      const commission = amount * commissionRate;
      // Net amount that will be added to wallet
      const netAmount = amount - commission;
      
      await onDeposit(netAmount, method);
      onClose();
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">إيداع رصيد</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              طريقة الإيداع
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setMethod('card')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 ${
                  method === 'card'
                    ? 'border-[#2B227C] text-[#2B227C] bg-[#2B227C]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>بطاقة مدى/ائتمانية</span>
              </button>
              <button
                onClick={() => setMethod('bank')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 ${
                  method === 'bank'
                    ? 'border-[#2B227C] text-[#2B227C] bg-[#2B227C]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building2 className="h-5 w-5" />
                <span>تحويل بنكي</span>
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المبلغ (ريال سعودي)
            </label>
            <input
              type="number"
              min="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#2B227C] focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              الحد الأدنى للإيداع: {formatCurrency(1000)}
            </p>
          </div>

          {/* Commission Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">المبلغ المطلوب</span>
              <span className="font-medium">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">رسوم الخدمة ({(commissionRate * 100).toFixed(1)}%)</span>
              <span className="font-medium text-gray-600">{formatCurrency(amount * commissionRate)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">المبلغ المضاف للمحفظة</span>
                <span className="font-bold text-[#2B227C]">{formatCurrency(amount - (amount * commissionRate))}</span>
              </div>
            </div>
          </div>

          {method === 'bank' ? (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">البنك</p>
                <p className="text-sm">{bankDetails.bank}</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-700">رقم الآيبان</p>
                  <button
                    onClick={() => copyToClipboard(bankDetails.iban)}
                    className="text-[#2B227C] hover:text-[#1a1648] p-1"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-sm font-mono">{bankDetails.iban}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">رمز السويفت</p>
                <p className="text-sm font-mono">{bankDetails.swift}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">العنوان</p>
                <p className="text-sm">{bankDetails.address}</p>
                <p className="text-sm">{bankDetails.city}, {bankDetails.zip}</p>
                <p className="text-sm">{bankDetails.country}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  يرجى إرسال إيصال التحويل عبر البريد الإلكتروني إلى support@racine.sa
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleDeposit}
              disabled={isProcessing || amount < 1000}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                'جاري المعالجة...'
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>إتمام الدفع</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}