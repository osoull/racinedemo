import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const financialsSchema = z.object({
  year: z.string().min(4, 'يجب تحديد السنة'),
  revenue: z.number().min(0, 'يجب أن تكون الإيرادات 0 أو أكثر'),
  profit: z.number(),
  roi: z.number().min(0, 'يجب أن يكون العائد على الاستثمار 0 أو أكثر'),
  debtRatio: z.number().min(0, 'يجب أن تكون نسبة الدين 0 أو أكثر'),
});

type FinancialsForm = z.infer<typeof financialsSchema>;

interface ProjectFinancialsManagementProps {
  projectId?: string;
}

export default function ProjectFinancialsManagement({ projectId }: ProjectFinancialsManagementProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialsForm>({
    resolver: zodResolver(financialsSchema),
  });

  const onSubmit = async (data: FinancialsForm) => {
    try {
      // API call to update financials
      console.log('Updating financials:', data);
    } catch (error) {
      console.error('Error updating financials:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">المؤشرات المالية</h3>
        <button className="text-[#2B227C] hover:text-[#1a1648] text-sm font-medium">
          إضافة سنة جديدة
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              السنة<span className="text-red-500">*</span>
            </label>
            <select
              {...register('year')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            >
              <option value="">اختر السنة</option>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.year && (
              <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الإيرادات<span className="text-red-500">*</span>
            </label>
            <input
              {...register('revenue', { valueAsNumber: true })}
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
            {errors.revenue && (
              <p className="mt-1 text-sm text-red-600">{errors.revenue.message}</p>
            )}
          </div>

          {/* Add other financial fields... */}

          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
            >
              حفظ التغييرات
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}