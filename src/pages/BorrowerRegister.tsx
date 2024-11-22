import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../services/auth';

const borrowerRegisterSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  companyName: z.string().min(3, 'اسم المنشأة يجب أن يكون 3 أحرف على الأقل'),
  type: z.enum(['company', 'establishment']),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام',
  }),
});

type BorrowerRegisterForm = z.infer<typeof borrowerRegisterSchema>;

export default function BorrowerRegister() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowerRegisterForm>({
    resolver: zodResolver(borrowerRegisterSchema),
  });

  const onSubmit = async (data: BorrowerRegisterForm) => {
    try {
      await registerUser(data.email, data.password, 'borrower');
      navigate('/borrower');
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل منشأة جديدة
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                {...register('email')}
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#2B227C] focus:border-[#2B227C] focus:z-10 sm:text-sm"
                placeholder="البريد الإلكتروني"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            {/* Add other form fields */}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2B227C] hover:bg-[#1a1648] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B227C]"
            >
              {isLoading ? 'جاري التسجيل...' : 'تسجيل'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}