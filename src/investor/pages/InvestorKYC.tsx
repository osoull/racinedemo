import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import KYCVerification from '../../components/KYCVerification';
import { useKYCStore } from '../../services/kyc';

export default function InvestorKYC() {
  const { status } = useKYCStore();

  if (status === 'verified') {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">تم التحقق من هويتك</h2>
          <p className="text-gray-600">
            يمكنك الآن الاستفادة من جميع خدمات المنصة
          </p>
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">فشل التحقق من الهوية</h2>
          <p className="text-gray-600 mb-6">
            يرجى التأكد من صحة المعلومات والمستندات المقدمة والمحاولة مرة أخرى
          </p>
          <button 
            onClick={() => useKYCStore.getState().reset()}
            className="px-6 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return <KYCVerification />;
}