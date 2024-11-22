import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, CreditCard, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

const bankSchema = z.object({
  bankName: z.string().min(1, 'اسم البنك مطلوب'),
  accountName: z.string().min(1, 'اسم الحساب مطلوب'),
  iban: z.string()
    .length(24, 'رقم الآيبان يجب أن يكون 24 حرف')
    .regex(/^SA[0-9]{22}$/, 'رقم الآيبان غير صالح'),
  swift: z.string()
    .min(8, 'رمز السويفت يجب أن يكون 8 أحرف على الأقل')
    .max(11, 'رمز السويفت يجب أن لا يتجاوز 11 حرف')
});

type BankForm = z.infer<typeof bankSchema>;

interface BankAccountFormProps {
  bankInfo?: {
    bankName: string;
    accountName: string;
    iban: string;
    swift: string;
    verified?: boolean;
  };
  onSubmit: (data: BankForm) => Promise<void>;
  isAdmin?: boolean;
}

export default function BankAccountForm({ bankInfo, onSubmit, isAdmin = false }: BankAccountFormProps) {
  const [copied, setCopied] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BankForm>({
    resolver: zodResolver(bankSchema),
    defaultValues: bankInfo
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('تم نسخ النص');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#2B227C]/10 p-2 rounded-lg">
          <Building2 className="h-5 w-5 text-[#2B227C]" />
        </div>
        <h3 className="text-lg font-semibold">معلومات الحساب البنكي</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم البنك<span className="text-red-500">*</span>
            </label>
            <select
              {...register('bankName')}
              disabled={isAdmin}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            >
              <option value="">اختر البنك</option>
              <option value="SAUDI NATIONAL BANK">البنك الأهلي السعودي</option>
              <option value="AL RAJHI BANK">مصرف الراجحي</option>
              <option value="RIYAD BANK">بنك الرياض</option>
              <option value="SAUDI BRITISH BANK">البنك السعودي البريطاني</option>
              <option value="ARAB NATIONAL BANK">البنك العربي الوطني</option>
              <option value="ALINMA BANK">مصرف الإنماء</option>
            </select>
            {errors.bankName && (
              <p className="mt-1 text-sm text-red-600">{errors.bankName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الحساب<span className="text-red-500">*</span>
            </label>
            <input
              {...register('accountName')}
              type="text"
              disabled={isAdmin}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
            {errors.accountName && (
              <p className="mt-1 text-sm text-red-600">{errors.accountName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الآيبان (IBAN)<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register('iban')}
                type="text"
                disabled={isAdmin}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C] font-mono"
                dir="ltr"
              />
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => bankInfo?.iban && copyToClipboard(bankInfo.iban)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              )}
            </div>
            {errors.iban && (
              <p className="mt-1 text-sm text-red-600">{errors.iban.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رمز السويفت (SWIFT)<span className="text-red-500">*</span>
            </label>
            <input
              {...register('swift')}
              type="text"
              disabled={isAdmin}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C] font-mono uppercase"
              dir="ltr"
            />
            {errors.swift && (
              <p className="mt-1 text-sm text-red-600">{errors.swift.message}</p>
            )}
          </div>
        </div>

        {bankInfo?.verified && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <Check className="h-5 w-5" />
            <span className="text-sm">تم التحقق من الحساب البنكي</span>
          </div>
        )}

        {!isAdmin && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] disabled:opacity-50"
            >
              <CreditCard className="h-5 w-5" />
              <span>{isSubmitting ? 'جاري الحفظ...' : 'حفظ معلومات الحساب'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}