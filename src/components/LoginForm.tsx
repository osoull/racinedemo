import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../services/auth';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  nationalId: z.string().min(10, 'رقم الهوية يجب أن يكون 10 أرقام'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.nationalId, data.password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-white">
        <div className="max-w-md mx-auto w-full">
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F8fefc08ff6352b1f82851d81737a6460.cdn.bubble.io%2Ff1729676645537x190880546208797250%2Flogo-horizontal-full.png"
            alt="رسين للاستثمار"
            className="h-40 w-auto mx-auto mb-12"
          />
          
          <h1 className="text-3xl font-bold text-[#2B227C] mb-8 text-center">
            تسجيل الدخول
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهوية الوطنية / رقم الاقامة<span className="text-red-500">*</span>
              </label>
              <input
                {...register('nationalId')}
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent bg-gray-50"
                placeholder="أدخل رقم الهوية"
              />
              {errors.nationalId && (
                <p className="mt-1 text-sm text-red-600">{errors.nationalId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent bg-gray-50"
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Link to="/reset-password" className="text-sm text-[#2B227C] hover:text-[#E63946]">
                نسيت كلمة المرور؟
              </Link>
              <Link to="/change-phone" className="text-sm text-[#2B227C] hover:text-[#E63946]">
                تغيير رقم الجوال
              </Link>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2B227C] text-white rounded-xl hover:bg-[#1a1648] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B227C] disabled:opacity-50 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>تسجيل الدخول</span>
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                ليس لديك حساب؟{' '}
                <Link to="/register" className="font-medium text-[#2B227C] hover:text-[#E63946]">
                  سجل الآن
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          alt="Background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-16 text-white">
          <h2 className="text-4xl font-bold text-white mb-6">مرحباً بك في رسين للاستثمار</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            منصة رسين للاستثمار تقدم فرصاً استثمارية متنوعة ومتوافقة مع الشريعة الإسلامية
          </p>
        </div>
      </div>
    </div>
  );
}