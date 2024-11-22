import React from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../services/auth';
import { AlertCircle } from 'lucide-react';

// Separate schemas for login and register
const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

const registerSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  role: z.enum(['user', 'borrower']),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام',
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type FormData = LoginFormData | RegisterFormData;

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [isRegistering, setIsRegistering] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
  });

  React.useEffect(() => {
    clearError();
    reset();
  }, [isRegistering, clearError, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isRegistering) {
        const registerData = data as RegisterFormData;
        await registerUser(registerData.email, registerData.password, registerData.role);
      } else {
        const loginData = data as LoginFormData;
        const user = await login(loginData.email, loginData.password);
        
        const redirectPath = 
          user.role === 'admin' || user.role === 'manager' ? '/admin' :
          user.role === 'user' ? '/investor' :
          '/borrower';
        
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      // Error is handled by the store
    }
  };

  // Type guard for register form errors
  const isRegisterError = (
    errors: FieldErrors<FormData>
  ): errors is FieldErrors<RegisterFormData> => {
    return isRegistering;
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          البريد الإلكتروني<span className="text-red-500">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent bg-gray-50"
          placeholder="أدخل البريد الإلكتروني"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          كلمة المرور<span className="text-red-500">*</span>
        </label>
        <input
          {...register('password')}
          type="password"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent bg-gray-50"
          placeholder="أدخل كلمة المرور"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {isRegistering && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع الحساب<span className="text-red-500">*</span>
            </label>
            <select
              {...register('role')}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2B227C] focus:border-transparent bg-gray-50"
            >
              <option value="user">مستثمر</option>
              <option value="borrower">مقترض</option>
            </select>
          </div>

          <div>
            <label className="flex items-center">
              <input
                {...register('acceptTerms')}
                type="checkbox"
                className="rounded border-gray-300 text-[#2B227C] focus:ring-[#2B227C]"
              />
              <span className="ml-2 text-sm text-gray-600">
                أوافق على الشروط والأحكام
              </span>
            </label>
            {isRegisterError(errors) && errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}
          </div>
        </>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2B227C] hover:bg-[#1a1648] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B227C] disabled:opacity-50"
      >
        {isLoading ? 'جاري التحميل...' : isRegistering ? 'تسجيل' : 'دخول'}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            reset();
          }}
          className="text-sm text-[#2B227C] hover:text-[#1a1648]"
        >
          {isRegistering ? 'لديك حساب؟ تسجيل الدخول' : 'ليس لديك حساب؟ تسجيل'}
        </button>
      </div>
    </form>
  );
}