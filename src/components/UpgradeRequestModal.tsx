import React, { useState } from 'react';
import { X, Upload, FileText, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface UpgradeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REQUIRED_DOCUMENTS = [
  {
    type: 'portfolio',
    title: 'محفظة الاستثمارات الحالية',
    description: 'إثبات امتلاك محفظة استثمارية بقيمة 5 ملايين ريال أو أكثر'
  },
  {
    type: 'experience',
    title: 'إثبات الخبرة الاستثمارية',
    description: 'وثائق تثبت خبرة لا تقل عن 3 سنوات في مجال الاستثمار'
  },
  {
    type: 'financial',
    title: 'البيانات المالية',
    description: 'كشف حساب بنكي لآخر 6 أشهر'
  }
];

export default function UpgradeRequestModal({ isOpen, onClose }: UpgradeRequestModalProps) {
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: File }>({});

  const handleFileUpload = (type: string, file: File) => {
    setUploadedDocs(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleSubmit = async () => {
    try {
      // Check if all required documents are uploaded
      const missingDocs = REQUIRED_DOCUMENTS.filter(doc => !uploadedDocs[doc.type]);
      
      if (missingDocs.length > 0) {
        toast.error('يرجى رفع جميع المستندات المطلوبة');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('تم إرسال طلب الترقية بنجاح');
      onClose();
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الطلب');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">طلب ترقية الحساب</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              لترقية حسابك إلى مستثمر مؤهل، يرجى رفع المستندات التالية للمراجعة
            </p>
          </div>

          <div className="space-y-4">
            {REQUIRED_DOCUMENTS.map((doc) => {
              const isUploaded = uploadedDocs[doc.type];
              
              return (
                <div 
                  key={doc.type}
                  className={`p-4 rounded-lg border ${
                    isUploaded ? 'bg-gray-50 border-gray-200' : 'border-dashed border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#2B227C]/10 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-[#2B227C]" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-gray-500">{doc.description}</p>
                        {isUploaded && (
                          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            <span>تم رفع الملف</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(doc.type, file);
                        }}
                        accept=".pdf,.doc,.docx"
                      />
                      <Upload className="h-5 w-5 text-[#2B227C] hover:text-[#1a1648]" />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
            >
              إرسال الطلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}