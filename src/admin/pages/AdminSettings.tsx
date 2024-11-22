import React from 'react';
import { Save, Percent, Building2, CreditCard, Shield, Mail, Phone, AlertTriangle, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UserManagement from '../components/UserManagement';

const settingsSchema = z.object({
  commission: z.object({
    basic: z.number().min(0).max(100),
    qualified: z.number().min(0).max(100),
    borrowerManagement: z.number().min(0).max(100),
    borrowerCollection: z.number().min(0).max(100),
    applicationFee: z.number().min(0),
    earlyRepayment: z.number().min(0).max(100),
  }),
  bankAccount: z.object({
    bankName: z.string().min(1, 'اسم البنك مطلوب'),
    accountName: z.string().min(1, 'اسم الحساب مطلوب'),
    iban: z.string().min(24, 'رقم IBAN غير صالح').max(24),
    swift: z.string().min(8, 'رمز SWIFT غير صالح').max(11),
  }),
  investment: z.object({
    minBasic: z.number().min(1000),
    minQualified: z.number().min(1000),
    maxBasic: z.number().min(1000),
  }),
  contact: z.object({
    supportEmail: z.string().email('البريد الإلكتروني غير صالح'),
    supportPhone: z.string().regex(/^\+966\d{9}$/, 'رقم الهاتف غير صالح'),
  }),
  notifications: z.object({
    emailEnabled: z.boolean(),
    smsEnabled: z.boolean(),
    pushEnabled: z.boolean(),
  }),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function AdminSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      commission: {
        basic: 2.5,
        qualified: 1.5,
        borrowerManagement: 3,
        borrowerCollection: 1,
        applicationFee: 1000,
        earlyRepayment: 1,
      },
      bankAccount: {
        bankName: 'Saudi National Bank',
        accountName: 'شركة رسين للاستثمار',
        iban: 'SA0380000000608010167519',
        swift: 'RJHISARI',
      },
      investment: {
        minBasic: 1000,
        minQualified: 10000,
        maxBasic: 200000,
      },
      contact: {
        supportEmail: 'support@racine.sa',
        supportPhone: '+966112452116',
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: true,
        pushEnabled: true,
      },
    },
  });

  const onSubmit = async (data: SettingsForm) => {
    try {
      console.log('Saving settings:', data);
      // Here you would make an API call to save the settings
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إعدادات المنصة</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* User Management */}
        <UserManagement />

        {/* Commission Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <Percent className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">العمولات والرسوم</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">عمولات المستثمرين</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عمولة المستثمر الأساسي (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('commission.basic', { valueAsNumber: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  />
                  {errors.commission?.basic && (
                    <p className="mt-1 text-sm text-red-600">{errors.commission.basic.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عمولة المستثمر المؤهل (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('commission.qualified', { valueAsNumber: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  />
                  {errors.commission?.qualified && (
                    <p className="mt-1 text-sm text-red-600">{errors.commission.qualified.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">عمولات المقترضين</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عمولة الإدارة (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('commission.borrowerManagement', { valueAsNumber: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  />
                  {errors.commission?.borrowerManagement && (
                    <p className="mt-1 text-sm text-red-600">{errors.commission.borrowerManagement.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عمولة التحصيل (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('commission.borrowerCollection', { valueAsNumber: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  />
                  {errors.commission?.borrowerCollection && (
                    <p className="mt-1 text-sm text-red-600">{errors.commission.borrowerCollection.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Account Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <Building2 className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">الحساب البنكي</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم البنك
              </label>
              <input
                type="text"
                {...register('bankAccount.bankName')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              {errors.bankAccount?.bankName && (
                <p className="mt-1 text-sm text-red-600">{errors.bankAccount.bankName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الحساب
              </label>
              <input
                type="text"
                {...register('bankAccount.accountName')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              {errors.bankAccount?.accountName && (
                <p className="mt-1 text-sm text-red-600">{errors.bankAccount.accountName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الآيبان (IBAN)
              </label>
              <input
                type="text"
                {...register('bankAccount.iban')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C] font-mono"
                dir="ltr"
              />
              {errors.bankAccount?.iban && (
                <p className="mt-1 text-sm text-red-600">{errors.bankAccount.iban.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز السويفت (SWIFT)
              </label>
              <input
                type="text"
                {...register('bankAccount.swift')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C] font-mono"
                dir="ltr"
              />
              {errors.bankAccount?.swift && (
                <p className="mt-1 text-sm text-red-600">{errors.bankAccount.swift.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Investment Limits */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">حدود الاستثمار</h3>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحد الأدنى للمستثمر الأساسي
              </label>
              <input
                type="number"
                {...register('investment.minBasic', { valueAsNumber: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              {errors.investment?.minBasic && (
                <p className="mt-1 text-sm text-red-600">{errors.investment.minBasic.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحد الأقصى للمستثمر الأساسي
              </label>
              <input
                type="number"
                {...register('investment.maxBasic', { valueAsNumber: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              {errors.investment?.maxBasic && (
                <p className="mt-1 text-sm text-red-600">{errors.investment.maxBasic.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحد الأدنى للمستثمر المؤهل
              </label>
              <input
                type="number"
                {...register('investment.minQualified', { valueAsNumber: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              {errors.investment?.minQualified && (
                <p className="mt-1 text-sm text-red-600">{errors.investment.minQualified.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <Mail className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">معلومات التواصل</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني للدعم
              </label>
              <input
                type="email"
                {...register('contact.supportEmail')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                dir="ltr"
              />
              {errors.contact?.supportEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.contact.supportEmail.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم هاتف الدعم
              </label>
              <input
                type="tel"
                {...register('contact.supportPhone')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                dir="ltr"
              />
              {errors.contact?.supportPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.contact.supportPhone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">إعدادات الإشعارات</h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('notifications.emailEnabled')}
                className="rounded text-[#2B227C] focus:ring-[#2B227C]"
              />
              <span>تفعيل إشعارات البريد الإلكتروني</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('notifications.smsEnabled')}
                className="rounded text-[#2B227C] focus:ring-[#2B227C]"
              />
              <span>تفعيل إشعارات الرسائل النصية</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('notifications.pushEnabled')}
                className="rounded text-[#2B227C] focus:ring-[#2B227C]"
              />
              <span>تفعيل الإشعارات الفورية</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
          >
            <Save className="h-5 w-5" />
            <span>حفظ الإعدادات</span>
          </button>
        </div>
      </form>
    </div>
  );
}