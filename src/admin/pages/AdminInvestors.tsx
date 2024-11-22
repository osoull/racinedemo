import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { useAuthStore } from '../../services/auth';
import { useWalletStore } from '../../services/wallet';

export default function AdminInvestors() {
  const { getWalletBalance } = useWalletStore();
  const investors = useAuthStore(state => 
    state.users?.filter(u => u.role === 'user') || []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">المستثمرون</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              className="w-64 pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>تصفية</span>
          </button>
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]">
            <Download className="h-5 w-5" />
            <span>تصدير</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستثمر</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع المستثمر</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رصيد المحفظة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">حالة التحقق</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحساب البنكي</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {investors.map((investor) => (
              <tr key={investor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/admin/investors/${investor.id}`}
                    className="flex items-center hover:text-[#2B227C]"
                  >
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-[#2B227C]/10 flex items-center justify-center">
                        <span className="text-[#2B227C] font-medium">{investor.name[0]}</span>
                      </div>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{investor.name}</div>
                      <div className="text-sm text-gray-500">{investor.email}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    investor.investorType === 'qualified'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {investor.investorType === 'qualified' ? 'مستثمر مؤهل' : 'مستثمر أساسي'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatCurrency(getWalletBalance(investor.id))}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    investor.kycStatus === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : investor.kycStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {investor.kycStatus === 'verified' ? 'تم التحقق' :
                     investor.kycStatus === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    investor.bankInfo?.verified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {investor.bankInfo?.verified ? 'تم التحقق' : 'قيد المراجعة'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    investor.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {investor.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}