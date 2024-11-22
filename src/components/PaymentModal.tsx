import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { X, CreditCard, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  minInvestment: number;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  projectTitle, 
  minInvestment 
}: PaymentModalProps) {
  const [amount, setAmount] = useState(minInvestment);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const stripe = await loadStripe('your_publishable_key');
      // Here you would typically make an API call to your backend
      // to create a payment intent and then call stripe.confirmPayment()
      
      // Simulated API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success handling would go here
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">استثمار في {projectTitle}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مبلغ الاستثمار (ريال)
            </label>
            <input
              type="number"
              min={minInvestment}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              الحد الأدنى للاستثمار: {minInvestment} ريال
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3 space-x-reverse">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">معلومات هامة</p>
              <ul className="list-disc list-inside space-y-1">
                <li>جميع المعاملات متوافقة مع الشريعة الإسلامية</li>
                <li>يمكنك سحب استثمارك بعد فترة الحظر (6 أشهر)</li>
                <li>العوائد المتوقعة تتراوح بين 8% إلى 12% سنوياً</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-emerald-600 text-white py-3 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <CreditCard className="h-5 w-5" />
              <span>{isProcessing ? 'جاري المعالجة...' : 'تأكيد الاستثمار'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}