import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  category: z.string().min(1, 'يجب اختيار التصنيف'),
  location: z.string().min(1, 'يجب تحديد الموقع'),
  manager: z.string().min(1, 'يجب تحديد مدير المشروع'),
  target: z.number().min(1000, 'المبلغ المستهدف يجب أن يكون 1000 ريال على الأقل'),
  minInvestment: z.number().min(100, 'الحد الأدنى للاستثمار يجب أن يكون 100 ريال على الأقل'),
  startDate: z.string().min(1, 'يجب تحديد تاريخ البداية'),
  endDate: z.string().min(1, 'يجب تحديد تاريخ النهاية'),
});

type ProjectForm = z.infer<typeof projectSchema>;

interface ProjectBasicInfoProps {
  projectId?: string;
}

export default function ProjectBasicInfo({ projectId }: ProjectBasicInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectForm) => {
    try {
      // API call to update project
      console.log('Updating project:', data);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عنوان المشروع<span className="text-red-500">*</span>
          </label>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            التصنيف<span className="text-red-500">*</span>
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
          >
            <option value="">اختر التصنيف</option>
            <option value="تمويل مشاريع طرف ثاني">تمويل مشاريع طرف ثاني</option>
            <option value="تمويل الفواتير">تمويل الفواتير</option>
            <option value="تمويل رأس المال العامل">تمويل رأس المال العامل</option>
            <option value="تمويل التوسع">تمويل التوسع</option>
            <option value="تمويل المشاريع العقارية">تمويل المشاريع العقارية</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            وصف المشروع<span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Add other fields... */}

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