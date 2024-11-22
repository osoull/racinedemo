import React from 'react';
import { Eye, Download, FileText } from 'lucide-react';

interface BorrowerDocumentStatusProps {
  document: {
    id: string;
    title: string;
    type: string;
    size: string;
    status: 'pending' | 'verified' | 'rejected';
    uploadedAt: string;
  };
  onStatusChange: (id: string, status: 'pending' | 'verified' | 'rejected') => void;
}

export default function BorrowerDocumentStatus({ document, onStatusChange }: BorrowerDocumentStatusProps) {
  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-lg ${
        document.status === 'verified' 
          ? 'bg-green-50 border border-green-200' 
          : document.status === 'rejected'
          ? 'bg-red-50 border border-red-200'
          : 'bg-gray-50 border border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <FileText className={`h-5 w-5 ${
          document.status === 'verified' 
            ? 'text-green-600' 
            : document.status === 'rejected'
            ? 'text-red-600'
            : 'text-[#2B227C]'
        }`} />
        <div>
          <p className="font-medium">{document.title}</p>
          <p className="text-sm text-gray-500">{document.type.toUpperCase()} • {document.size}</p>
          <p className="text-sm text-gray-500 mt-1">
            تم الرفع: {new Date(document.uploadedAt).toLocaleDateString('ar-SA')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select 
          className={`px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-[#2B227C] ${
            document.status === 'verified'
              ? 'bg-green-50 text-green-800 border-green-200'
              : document.status === 'rejected'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-gray-50 text-gray-800 border-gray-200'
          }`}
          value={document.status}
          onChange={(e) => onStatusChange(document.id, e.target.value as 'pending' | 'verified' | 'rejected')}
        >
          <option value="pending">قيد المراجعة</option>
          <option value="verified">تم التحقق</option>
          <option value="rejected">مرفوض</option>
        </select>
        <div className="flex items-center gap-1">
          <button
            onClick={() => window.open(`/api/documents/preview/${document.id}`, '_blank')}
            className="p-2 text-gray-500 hover:text-[#2B227C] rounded-lg"
            title="عرض المستند"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => window.open(`/api/documents/download/${document.id}`, '_blank')}
            className="p-2 text-gray-500 hover:text-[#2B227C] rounded-lg"
            title="تحميل المستند"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}