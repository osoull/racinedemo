import React, { useState } from 'react';
import { FileText, Download, Lock, Eye, Plus, X } from 'lucide-react';
import { useAuthStore } from '../services/auth';
import DocumentUploadModal from '../admin/components/DocumentUploadModal';

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

interface ProjectDocumentsProps {
  documents: Document[];
  isAdmin?: boolean;
  isEditing?: boolean;
  canEdit?: boolean;
  isOwner?: boolean;
}

export default function ProjectDocuments({ 
  documents: initialDocuments, 
  isAdmin = false,
  isEditing = false,
  canEdit = false,
  isOwner = false
}: ProjectDocumentsProps) {
  const { user } = useAuthStore();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState(initialDocuments);

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
        uploadedBy: user?.name || 'مدير النظام'
      };

      setDocuments([...documents, newDoc]);
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const canViewDocument = (doc: Document) => {
    if (isAdmin) return true;
    if (doc.isPublic) return true;
    if (isOwner) return true;
    return false;
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">مستندات المشروع</h2>
        {canEdit && isEditing && (
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 text-[#2B227C] hover:text-[#1a1648] text-sm font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>إضافة مستند</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
              canViewDocument(doc) ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-50/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#2B227C]/10 p-3 rounded-lg">
                <FileText className="h-5 w-5 text-[#2B227C]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{doc.title}</h3>
                <p className="text-sm text-gray-500">
                  {doc.size} • {new Date(doc.uploadedAt).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {canViewDocument(doc) ? (
                <>
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
                  {canEdit && isEditing && (
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                      title="حذف المستند"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 text-gray-400">
                  <Lock className="h-5 w-5" />
                  <span className="text-sm">مقيد</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">لا توجد مستندات متاحة حالياً</p>
          </div>
        )}
      </div>

      {canEdit && isEditing && (
        <DocumentUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}