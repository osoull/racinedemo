import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Eye, Download, Calendar } from 'lucide-react';
import { demoUsers } from '../../data/demo';

export default function BorrowerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const borrower = demoUsers.find(u => u.id === id && u.role === 'borrower');

  if (!borrower) {
    return (
      <div className="p-8">
        <div className="text-center">
          <p className="text-gray-500">مقترض غير موجود</p>
          <button
            onClick={() => navigate('/admin/borrowers')}
            className="mt-4 px-4 py-2 text-[#2B227C] hover:bg-[#2B227C]/5 rounded-lg"
          >
            العودة للقائمة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/admin/borrowers')}
          className="flex items-center gap-2 text-[#2B227C] hover:text-[#1a1648] group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>العودة</span>
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#2B227C]/10 rounded-xl flex items-center justify-center">
              <span className="text-[#2B227C] text-2xl font-medium">{borrower.name[0]}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{borrower.name}</h2>
              <p className="text-gray-500">{borrower.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              borrower.kycStatus === 'verified'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {borrower.kycStatus === 'verified' ? 'تم التحقق' : 'قيد المراجعة'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">نوع المنشأة</p>
            <p className="font-medium">
              {borrower.borrowerType === 'company' ? 'شركة' : 'مؤسسة'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">رقم السجل التجاري</p>
            <p className="font-medium">{borrower.companyInfo?.registrationNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">العنوان</p>
            <p className="font-medium">{borrower.companyInfo?.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">رقم الهاتف</p>
            <p className="font-medium">{borrower.companyInfo?.phone}</p>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">المستندات</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open('/api/documents/download-all', '_blank')}
              className="flex items-center gap-2 px-4 py-2 text-[#2B227C] hover:bg-[#2B227C]/5 rounded-lg"
            >
              <Download className="h-5 w-5" />
              <span>تحميل الكل</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {borrower.documents?.map((doc) => (
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
                <select 
                  className={`px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-[#2B227C] ${
                    doc.status === 'verified'
                      ? 'bg-green-50 text-green-800 border-green-200'
                      : doc.status === 'rejected'
                      ? 'bg-red-50 text-red-800 border-red-200'
                      : 'bg-gray-50 text-gray-800 border-gray-200'
                  }`}
                  defaultValue={doc.status}
                  onChange={(e) => {
                    // Handle document status change
                    console.log('Document status changed:', e.target.value);
                  }}
                >
                  <option value="pending">قيد المراجعة</option>
                  <option value="verified">تم التحقق</option>
                  <option value="rejected">مرفوض</option>
                </select>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => window.open(`/api/documents/preview/${doc.id}`, '_blank')}
                    className={`p-2 rounded-lg ${
                      doc.status === 'verified'
                        ? 'text-green-600 hover:bg-green-100'
                        : doc.status === 'rejected'
                        ? 'text-red-600 hover:bg-red-100'
                        : 'text-gray-500 hover:text-[#2B227C] hover:bg-gray-100'
                    }`}
                    title="عرض المستند"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => window.open(`/api/documents/download/${doc.id}`, '_blank')}
                    className={`p-2 rounded-lg ${
                      doc.status === 'verified'
                        ? 'text-green-600 hover:bg-green-100'
                        : doc.status === 'rejected'
                        ? 'text-red-600 hover:bg-red-100'
                        : 'text-gray-500 hover:text-[#2B227C] hover:bg-gray-100'
                    }`}
                    title="تحميل المستند"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Document History */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">سجل المستندات</h3>
          <div className="space-y-4">
            {borrower.documents?.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {new Date(doc.uploadedAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <span className={`${
                  doc.status === 'verified' 
                    ? 'text-green-600' 
                    : doc.status === 'rejected'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}>
                  {doc.status === 'verified' 
                    ? `تم التحقق من ${doc.title}`
                    : doc.status === 'rejected'
                    ? `تم رفض ${doc.title}`
                    : `تم رفع ${doc.title}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Notes */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">ملاحظات</h3>
          <textarea
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2B227C] resize-none"
            rows={4}
            placeholder="أضف ملاحظاتك حول المستندات هنا..."
          />
          <div className="flex justify-end mt-2">
            <button className="px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]">
              حفظ الملاحظات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}