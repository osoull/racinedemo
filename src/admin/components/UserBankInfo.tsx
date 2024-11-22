import React from 'react';
import BankAccountForm from '../../components/BankAccountForm';
import { Shield, Check, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../services/auth';
import { toast } from 'react-hot-toast';

interface UserBankInfoProps {
  userId: string;
}

export default function UserBankInfo({ userId }: UserBankInfoProps) {
  const { updateUser } = useAuthStore();
  const user = useAuthStore(state => 
    state.users?.find(u => u.id === userId)
  );

  const handleVerifyBank = async () => {
    if (!user?.bankInfo) return;
    
    try {
      await updateUser(userId, {
        bankInfo: {
          ...user.bankInfo,
          verified: true,
          verificationDate: new Date().toISOString()
        }
      });
      toast.success('تم تأكيد معلومات الحساب البنكي');
    } catch (error) {
      toast.error('حدث خطأ أثناء تأكيد معلومات الحساب البنكي');
    }
  };

  if (!user?.bankInfo) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold">معلومات الحساب البنكي</h3>
        </div>
        <p className="text-gray-500">لم يتم إضافة معلومات الحساب البنكي بعد</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BankAccountForm 
        bankInfo={user.bankInfo}
        onSubmit={async () => {}}
        isAdmin={true}
      />

      {!user.bankInfo.verified && (
        <div className="flex justify-end">
          <button
            onClick={handleVerifyBank}
            className="flex items-center gap-2 px-6 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
          >
            <Shield className="h-5 w-5" />
            <span>تأكيد معلومات الحساب</span>
          </button>
        </div>
      )}

      {user.bankInfo.verified && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <Check className="h-5 w-5" />
          <div>
            <p className="font-medium">تم التحقق من الحساب البنكي</p>
            {user.bankInfo.verificationDate && (
              <p className="text-sm">
                تاريخ التحقق: {new Date(user.bankInfo.verificationDate).toLocaleDateString('ar-SA')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}