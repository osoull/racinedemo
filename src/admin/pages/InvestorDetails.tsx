import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../services/auth';
import InvestorProfile from '../../components/InvestorProfile';
import UserBankInfo from '../components/UserBankInfo';
import InvestmentSummary from '../components/InvestmentSummary';
import ActivityLog from '../components/ActivityLog';
import { toast } from 'react-hot-toast';

export default function InvestorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUser } = useAuthStore();
  const investor = users?.find(u => u.id === id && u.role === 'user');

  if (!investor) {
    return (
      <div className="p-8">
        <div className="text-center">
          <p className="text-gray-500">مستثمر غير موجود</p>
          <button
            onClick={() => navigate('/admin/investors')}
            className="mt-4 px-4 py-2 text-[#2B227C] hover:bg-[#2B227C]/5 rounded-lg"
          >
            العودة للقائمة
          </button>
        </div>
      </div>
    );
  }

  const handleKycStatusChange = async (status: 'pending' | 'verified' | 'rejected') => {
    try {
      await updateUser(investor.id, { kycStatus: status });
      toast.success('تم تحديث حالة التحقق بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث حالة التحقق');
    }
  };

  const handleStatusToggle = async () => {
    try {
      const newStatus = investor.status === 'active' ? 'inactive' : 'active';
      await updateUser(investor.id, { status: newStatus });
      toast.success('تم تحديث حالة الحساب بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث حالة الحساب');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/admin/investors')}
          className="flex items-center gap-2 text-[#2B227C] hover:text-[#1a1648] group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>العودة</span>
        </button>

        <div className="flex items-center gap-2">
          {investor.kycStatus !== 'verified' && (
            <button
              onClick={() => handleKycStatusChange('verified')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              تأكيد الهوية
            </button>
          )}
          <button
            onClick={handleStatusToggle}
            className={`px-4 py-2 ${
              investor.status === 'active'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white rounded-lg`}
          >
            {investor.status === 'active' ? 'إيقاف الحساب' : 'تنشيط الحساب'}
          </button>
        </div>
      </div>

      {/* Profile Information */}
      <InvestorProfile userId={investor.id} isAdminView />

      {/* Bank Account Information */}
      <UserBankInfo userId={investor.id} />

      {/* Investment Summary */}
      <InvestmentSummary userId={investor.id} />

      {/* Activity Log */}
      <ActivityLog userId={investor.id} />
    </div>
  );
}