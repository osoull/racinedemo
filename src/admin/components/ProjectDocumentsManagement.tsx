import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X, Upload, FileText, Eye, Download, Lock } from 'lucide-react';
import DocumentUploadModal from './DocumentUploadModal';

interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'xls';
  size: string;
  url: string;
  isPublic: boolean;
  uploadedAt: string;
  uploadedBy: string;
}

interface ProjectDocumentsManagementProps {
  projectId?: string;
}

export default function ProjectDocumentsManagement({ projectId }: ProjectDocumentsManagementProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleUpload = async (file: File, isPublic: boolean) => {
    try {
      // Simulate file upload
      const newDoc: Document = {
        id: String(documents.length + 1),
        title: file.name,
        type: file.name.split('.').pop() as 'pdf' | 'doc' | 'xls',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        url: URL.createObjectURL(file),
        isPublic,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'مدير النظام'
      };

      setDocuments([...documents, newDoc]);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const toggleDocumentVisibility = (id: string) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, isPublic: !doc.isPublic } : doc
    ));
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">مستندات المشروع</h3>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة مستند</span>
        </button>
      </div>

      <div className="space-y-4">
        {documents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">لم يتم إضافة أي مستندات بعد</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#2B227C]/10 p-3 rounded-lg">
                  <FileText className="h-5 w-5 text-[#2B227C]" />
                </div>
                <div>
                  <h4 className="font-medium">{doc.title}</h4>
                  <p className="text-sm text-gray-500">
                    {doc.size} • {new Date(doc.uploadedAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleDocumentVisibility(doc.id)}
                  className={`p-2 rounded-lg ${
                    doc.isPublic 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  title={doc.isPublic ? 'مستند عام' : 'مستند مقيد'}
                >
                  <Lock className="h-5 w-5" />
                </button>
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
                <button
                  onClick={() => removeDocument(doc.id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                  title="حذف المستند"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}