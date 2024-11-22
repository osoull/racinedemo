import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../services/auth';
import BorrowerProfile from '../../components/BorrowerProfile';
import BankAccountForm from '../../components/BankAccountForm';
import BorrowerFinancialSummary from '../components/BorrowerFinancialSummary';
import BorrowerActivityLog from '../components/BorrowerActivityLog';
import BorrowerDocumentStatus from '../components/BorrowerDocumentStatus';
import BorrowerPaymentHistory from '../components/BorrowerPaymentHistory';
import { toast } from 'react-hot-toast';

export default function AdminBorrowerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuthStore();
  const borrower = useAuthStore(state => 
    state.user?.id === id ? state.user : undefined
  );

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

  const handleDocumentStatusChange = async (docId: string, status: 'pending' | 'verified' | 'rejected') => {
    try {
      const updatedDocs = borrower.documents?.map(doc => 
        doc.id === docId ? { ...doc, status } : doc
      );

      await updateUser(borrower.id, { documents: updatedDocs });
      toast.success('تم تحديث حالة المستند بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث حالة المستند');
    }
  };

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

      {/* Profile Information */}
      <BorrowerProfile userId={borrower.id} isAdminView />

      {/* Bank Account Information */}
      <BankAccountForm 
        bankInfo={borrower.bankInfo}
        onSubmit={async () => {}}
        isAdmin={true}
      />

      {/* Financial Summary */}
      <BorrowerFinancialSummary
        totalBorrowed={1000000}
        activeLoans={2}
        nextPayment={{
          amount: 25000,
          date: '2024-04-01'
        }}
      />

      {/* Documents */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">المستندات</h3>
        <div className="space-y-4">
          {borrower.documents?.map((doc) => (
            <BorrowerDocumentStatus
              key={doc.id}
              document={doc}
              onStatusChange={handleDocumentStatusChange}
            />
          ))}
        </div>
      </div>

      {/* Payment History */}
      <BorrowerPaymentHistory
        payments={[
          {
            id: '1',
            amount: 25000,
            date: '2024-03-15',
            status: 'completed',
            project: 'مشروع التوسعة'
          }
        ]}
      />

      {/* Activity Log */}
      <BorrowerActivityLog
        activities={[
          {
            id: '1',
            type: 'document',
            title: 'تم رفع مستند جديد',
            description: 'تم رفع السجل التجاري',
            date: '2024-03-15'
          }
        ]}
      />
    </div>
  );
}