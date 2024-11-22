import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, FileText } from 'lucide-react';

const projectRequestSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  amount: z.number().min(100000, 'المبلغ المطلوب يجب أن يكون 100,000 ريال على الأقل'),
  duration: z.number().min(6, 'مدة التمويل يجب أن تكون 6 أشهر على الأقل'),
  purpose: z.string().min(1, 'يجب تحديد الغرض من التمويل'),
  documents: z.array(z.object({
    type: z.string(),
    file: z.instanceof(File)
  })).min(1, 'يجب رفع المستندات المطلوبة')
});

type ProjectRequestForm = z.infer<typeof projectRequestSchema>;

interface NewProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectRequestForm) => Promise<void>;
}

export default function NewProjectRequestModal({
  isOpen,
  onClose,
  onSubmit
}: NewProjectRequestModalProps) {
  const [documents, setDocuments] = useState<{ type: string; file: File }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProjectRequestForm>({
    resolver: zodResolver(projectRequestSchema)
  });

  const handleFormSubmit = async (data: ProjectRequestForm) => {
    try {
      setIsSubmitting(true);
      await onSubmit({ ...data, documents });
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting project request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">طلب تمويل جديد</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
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

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المبلغ المطلوب<span className="text-red-500">*</span>
              </label>
              <input
                {...register('amount', { valueAsNumber: true })}
                type="number"
                min="100000"
                step="1000"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مدة التمويل (بالأشهر)<span className="text-red-500">*</span>
              </label>
              <input
                {...register('duration', { valueAsNumber: true })}
                type="number"
                min="6"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الغرض من التمويل<span className="text-red-500">*</span>
            </label>
            <select
              {...register('purpose')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            >
              <option value="">اختر الغرض</option>
              <option value="expansion">توسعة النشاط</option>
              <option value="working_capital">رأس المال العامل</option>
              <option value="equipment">شراء معدات</option>
              <option value="inventory">تمويل المخزون</option>
            </select>
            {errors.purpose && (
              <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              المستندات المطلوبة<span className="text-red-500">*</span>
            </label>
            <div className="space-y-4">
              {[
                { type: 'business_plan', title: 'خطة العمل' },
                { type: 'financial_statements', title: 'القوائم المالية' },
                { type: 'bank_statements', title: 'كشوف الحساب البنكية' }
              ].map((docType) => (
                <div
                  key={docType.type}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2B227C] transition-colors"
                >
                  <input
                    type="file"
                    id={`file-${docType.type}`}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setDocuments([...documents, { type: docType.type, file }]);
                      }
                    }}
                  />
                  <label
                    htmlFor={`file-${docType.type}`}
                    className="cursor-pointer block"
                  >
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="font-medium text-gray-900">{docType.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      اضغط أو اسحب الملف هنا
                    </p>
                  </label>
                </div>
              ))}
            </div>
            {errors.documents && (
              <p className="mt-2 text-sm text-red-600">{errors.documents.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] disabled:opacity-50"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}