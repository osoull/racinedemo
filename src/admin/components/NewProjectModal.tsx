import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, FileText } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const REQUIRED_DOCUMENTS = [
  {
    type: 'presentation',
    title: 'عرض تقديمي للمشروع',
    required: true
  },
  {
    type: 'feasibility',
    title: 'دراسة الجدوى',
    required: true
  },
  {
    type: 'financial',
    title: 'التقرير المالي',
    required: true
  }
];

const projectSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  category: z.string().min(1, 'يجب اختيار التصنيف'),
  target: z.number().min(1000, 'المبلغ المستهدف يجب أن يكون 1000 ريال على الأقل'),
  minInvestment: z.number().min(1000, 'الحد الأدنى للاستثمار يجب أن يكون 1000 ريال'),
  expectedReturn: z.string().min(1, 'يجب تحديد العائد المتوقع'),
  startDate: z.string().min(1, 'يجب تحديد تاريخ البداية'),
  endDate: z.string().min(1, 'يجب تحديد تاريخ النهاية'),
  location: z.string().min(1, 'يجب تحديد الموقع'),
  manager: z.string().min(1, 'يجب تحديد مدير المشروع'),
  creditRating: z.string().min(1, 'يجب تحديد التصنيف الائتماني'),
  companyHistory: z.string().min(1, 'يجب تحديد تاريخ الشركة'),
  financialPosition: z.string().min(1, 'يجب تحديد الوضع المالي'),
  managementQuality: z.string().min(1, 'يجب تحديد جودة الإدارة'),
  marketPosition: z.string().min(1, 'يجب تحديد وضع السوق'),
  documents: z.array(z.object({
    type: z.string(),
    file: z.instanceof(File)
  })).refine((docs) => {
    return REQUIRED_DOCUMENTS.every(required => 
      docs.some(doc => doc.type === required.type)
    );
  }, {
    message: 'يجب رفع جميع المستندات المطلوبة'
  })
});

type ProjectForm = z.infer<typeof projectSchema>;

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectForm) => void;
}

export default function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [documents, setDocuments] = useState<{ type: string; file: File }[]>([]);
  const [documentError, setDocumentError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      documents: []
    }
  });

  const handleDocumentUpload = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Remove existing document of the same type
    const updatedDocs = documents.filter(doc => doc.type !== type);
    
    // Add new document
    setDocuments([...updatedDocs, { type, file }]);
    setDocumentError(null);
  };

  const removeDocument = (type: string) => {
    setDocuments(documents.filter(doc => doc.type !== type));
  };

  const handleFormSubmit = (data: ProjectForm) => {
    // Check if all required documents are uploaded
    const missingDocs = REQUIRED_DOCUMENTS.filter(required => 
      !documents.some(doc => doc.type === required.type)
    );

    if (missingDocs.length > 0) {
      setDocumentError('يجب رفع جميع المستندات المطلوبة');
      return;
    }

    onSubmit({
      ...data,
      documents
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">مشروع جديد</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Basic Information */}
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
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المبلغ المستهدف<span className="text-red-500">*</span>
              </label>
              <input
                {...register('target', { valueAsNumber: true })}
                type="number"
                min="1000"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              {errors.target && (
                <p className="mt-1 text-sm text-red-600">{errors.target.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحد الأدنى للاستثمار<span className="text-red-500">*</span>
              </label>
              <input
                {...register('minInvestment', { valueAsNumber: true })}
                type="number"
                min="1000"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
              <p className="mt-1 text-xs text-gray-500">
                الحد الأدنى المسموح به: {formatCurrency(1000)}
              </p>
              {errors.minInvestment && (
                <p className="mt-1 text-sm text-red-600">{errors.minInvestment.message}</p>
              )}
            </div>
          </div>

          {/* Risk Assessment */}
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
                <option value="A">A - ممتاز</option>
                <option value="B">B - جيد جداً</option>
                <option value="C">C - جيد</option>
                <option value="D">D - مقبول</option>
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
                <option value="ممتاز">ممتاز</option>
                <option value="جيد جداً">جيد جداً</option>
                <option value="جيد">جيد</option>
                <option value="مقبول">مقبول</option>
              </select>
              {errors.companyHistory && (
                <p className="mt-1 text-sm text-red-600">{errors.companyHistory.message}</p>
              )}
            </div>
          </div>

          {/* Documents Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              المستندات المطلوبة<span className="text-red-500">*</span>
            </label>
            <div className="space-y-4">
              {REQUIRED_DOCUMENTS.map((doc) => {
                const uploadedDoc = documents.find(d => d.type === doc.type);
                
                return (
                  <div 
                    key={doc.type}
                    className={`p-4 rounded-lg border ${
                      uploadedDoc ? 'bg-gray-50 border-gray-200' : 'border-dashed border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#2B227C]/10 p-2 rounded-lg">
                          <FileText className="h-5 w-5 text-[#2B227C]" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          {uploadedDoc ? (
                            <p className="text-sm text-gray-500">
                              {uploadedDoc.file.name} ({Math.round(uploadedDoc.file.size / 1024)} KB)
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">
                              يرجى رفع الملف بصيغة PDF
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        {uploadedDoc ? (
                          <button
                            type="button"
                            onClick={() => removeDocument(doc.type)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        ) : (
                          <label className="cursor-pointer text-[#2B227C] hover:text-[#1a1648]">
                            <input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => handleDocumentUpload(doc.type, e)}
                            />
                            <Upload className="h-5 w-5" />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {documentError && (
              <p className="mt-2 text-sm text-red-600">{documentError}</p>
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
              className="px-6 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
            >
              إنشاء المشروع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}