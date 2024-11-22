import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bell, Lock, Globe, Moon } from 'lucide-react';
import { useSettingsStore } from '../services/settings';
import { toast } from 'react-hot-toast';

const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean()
  }),
  language: z.enum(['ar', 'en']),
  theme: z.enum(['light', 'dark', 'system']),
  twoFactorAuth: z.boolean()
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function Settings() {
  const { settings, updateSettings, isLoading } = useSettingsStore();

  const {
    register,
    handleSubmit,
  } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings
  });

  const onSubmit = async (data: SettingsForm) => {
    try {
      await updateSettings(data);
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ الإعدادات');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">الإعدادات</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <Bell className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">الإشعارات</h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('notifications.email')}
                className="rounded text-[#2B227C] focus:ring-[#2B227C]"
              />
              <span>البريد الإلكتروني</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('notifications.sms')}
                className="rounded text-[#2B227C] focus:ring-[#2B227C]"
              />
              <span>الرسائل النصية</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('notifications.push')}
                className="rounded text-[#2B227C] focus:ring-[#2B227C]"
              />
              <span>إشعارات التطبيق</span>
            </label>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <Globe className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">اللغة</h3>
          </div>

          <select
            {...register('language')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Theme */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <Moon className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">المظهر</h3>
          </div>

          <select
            {...register('theme')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
          >
            <option value="light">فاتح</option>
            <option value="dark">داكن</option>
            <option value="system">حسب النظام</option>
          </select>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B227C]/10 p-2 rounded-lg">
              <Lock className="h-5 w-5 text-[#2B227C]" />
            </div>
            <h3 className="text-lg font-semibold">الأمان</h3>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('twoFactorAuth')}
              className="rounded text-[#2B227C] focus:ring-[#2B227C]"
            />
            <span>تفعيل المصادقة الثنائية</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] disabled:opacity-50"
          >
            {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </form>
    </div>
  );
}