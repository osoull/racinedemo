import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const riskSchema = z.object({
  creditRating: z.string().min(1, 'يجب تحديد التصنيف الائتماني'),
  companyHistory: z.string().min(1, 'يجب تحديد تاريخ الشركة'),
  financialPosition: z.string().min(1, 'يجب تحديد الوضع المالي'),
  managementQuality: z.string().min(1, 'يجب تحديد جودة الإدارة'),
  marketPosition: z.string().min(1, 'يجب تحديد وضع السوق'),
  riskAssessment: z.string().min(10, 'يجب إضافة تقييم المخاطر'),
});

type RiskForm = z.infer<typeof riskSchema>;

interface ProjectRiskManagementProps {
  projectId?: string;
}

export default function ProjectRiskManagement({ projectId }: ProjectRiskManagementProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RiskForm>({
    resolver: zodResolver(riskSchema),
  });

  const onSubmit = async (data: RiskForm) => {
    try {
      // API call to update risk assessment
      console.log('Updating risk assessment:', data);
    } catch (error) {
      console.error('Error updating risk assessment:', error);
    }
  };

  const ratings = ['A', 'B', 'C', 'D'];
  const qualityLevels = ['ممتاز', 'جيد جداً', 'جيد', 'مقبول'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            التصنيف الائتماني<span className="text-red-500">*</span>
          </label>
          <select
            {...register('creditRating')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
          >
            <option value="">اختر التصنيف</option>
            {ratings.map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
          {errors.creditRating && (
            <p className="mt-1 text-sm text-red-600">{errors.creditRating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تاريخ الشركة<span className="text-red-500">*</span>
          </label>
          <select
            {...register('companyHistory')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
          >
            <option value="">اختر التقييم</option>
            {qualityLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          {errors.companyHistory && (
            <p className="mt-1 text-sm text-red-600">{errors.companyHistory.message}</p>
          )}
        </div>

        {/* Add other risk assessment fields... */}

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تقييم المخاطر<span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('riskAssessment')}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
          />
          {errors.riskAssessment && (
            <p className="mt-1 text-sm text-red-600">{errors.riskAssessment.message}</p>
          )}
        </div>

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
  );
}