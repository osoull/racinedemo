import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface InvestorTypeInfoProps {
  type: 'basic' | 'qualified' | undefined;
}

export default function InvestorTypeInfo({ type = 'basic' }: InvestorTypeInfoProps) {
  const isBasic = type === 'basic';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#2B227C] mb-4">
        {isBasic ? 'المستثمر الأساسي' : 'المستثمر المؤهل'}
      </h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-2">حدود الاستثمار:</p>
          {isBasic ? (
            <>
              <p>• الحد الأدنى: {formatCurrency(1000)}</p>
              <p>• الحد الأقصى: {formatCurrency(200000)}</p>
              <p className="text-sm text-gray-600 mt-2">
                يمكن الاستثمار من {formatCurrency(1000)} لغاية {formatCurrency(50000)} ريال سعودي أي 25% من قيمة الفرصة الواحدة (أيهما أقل من {formatCurrency(50000)} أو {formatCurrency(200000)} ريال تحت السداد).
              </p>
            </>
          ) : (
            <>
              <p>• الحد الأدنى: {formatCurrency(1000)}</p>
              <p>• لا يوجد حد أعلى للاستثمارات</p>
              <p className="text-sm text-gray-600 mt-2">
                يمكنك الاستثمار في أي فرصة استثمارية بدون قيود على المبلغ.
              </p>
            </>
          )}
        </div>

        {isBasic && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium text-blue-900 mb-2">ملاحظة هامة:</p>
            <p className="text-sm text-blue-800">
              يمكنك الاستثمار في فرصة جديدة في المشروع فقط إذا لم تكن لديك أي مدفوعات مستحقة مع نفس الشركة المقدمة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}