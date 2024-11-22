import React from 'react';
import { useAuthStore } from '../../services/auth';
import InvestorProfile from '../../components/InvestorProfile';
import BankAccountForm from '../../components/BankAccountForm';
import { toast } from 'react-hot-toast';

export default function InvestorProfilePage() {
  const { user, updateProfile } = useAuthStore();

  const handleBankUpdate = async (bankInfo: any) => {
    try {
      await updateProfile({ bankInfo: { ...bankInfo, verified: false } });
      toast.success('تم تحديث معلومات الحساب البنكي بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث معلومات الحساب البنكي');
    }
  };

  return (
    <div className="space-y-6">
      <InvestorProfile userId={user?.id} isAdminView={false} />
      <BankAccountForm 
        bankInfo={user?.bankInfo}
        onSubmit={handleBankUpdate}
      />
    </div>
  );
}