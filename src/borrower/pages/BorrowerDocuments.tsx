import React, { useState } from 'react';
import { FileText, Upload, Eye, Download, X } from 'lucide-react';
import { useAuthStore } from '../../services/auth';

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}

interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user' | 'borrower';
  documents?: Document[];
}

export default function BorrowerDocuments() {
  const { user } = useAuthStore() as { user: ExtendedUser | null };
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  const handleFileUpload = async (docType: string, file: File) => {
    try {
      setUploadingDoc(docType);
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Handle file upload success
      setUploadingDoc(null);
    } catch (error) {
      console.error('Error uploading document:', error);
      setUploadingDoc(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">المستندات</h2>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-6">
          {user?.documents?.map((doc) => (
            <div 
              key={doc.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                doc.status === 'verified' 
                  ? 'bg-green-50 border border-green-200' 
                  : doc.status === 'rejected'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className={`h-5 w-5 ${
                  doc.status === 'verified' 
                    ? 'text-green-600' 
                    : doc.status === 'rejected'
                    ? 'text-red-600'
                    : 'text-[#2B227C]'
                }`} />
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-sm text-gray-500">{doc.type.toUpperCase()} • {doc.size}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    تم الرفع: {new Date(doc.uploadedAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-sm rounded-lg ${
                  doc.status === 'verified'
                    ? 'bg-green-100 text-green-800'
                    : doc.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {doc.status === 'verified' ? 'تم التحقق' :
                   doc.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="p-2 text-gray-500 hover:text-[#2B227C] rounded-lg"
                    title="عرض المستند"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-[#2B227C] rounded-lg"
                    title="تحميل المستند"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  {doc.status !== 'verified' && (
                    <button
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                      title="حذف المستند"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Upload Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">رفع مستندات جديدة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: 'commercial', title: 'السجل التجاري' },
                { type: 'tax', title: 'الشهادة الضريبية' },
                { type: 'financial', title: 'القوائم المالية' },
                { type: 'bank', title: 'كشف حساب بنكي' }
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
                      if (file) handleFileUpload(docType.type, file);
                    }}
                  />
                  <label
                    htmlFor={`file-${docType.type}`}
                    className="cursor-pointer block"
                  >
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="font-medium text-gray-900">{docType.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {uploadingDoc === docType.type ? 'جاري الرفع...' : 'اضغط أو اسحب الملف هنا'}
                    </p>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}