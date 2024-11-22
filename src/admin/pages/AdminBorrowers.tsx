import React from 'react';
import { Search, Filter, ChevronLeft, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { useAuthStore } from '../../services/auth';

export default function AdminBorrowers() {
  const borrowers = useAuthStore(state => 
    state.users?.filter(u => u.role === 'borrower') || []
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">المقترضون</h2>
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
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">قائمة المقترضين</h3>
        </div>
        <div className="divide-y">
          {borrowers.map((borrower) => (
            <div key={borrower.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-[#2B227C]" />
                  </div>
                  <div>
                    <Link 
                      to={`/admin/borrowers/${borrower.id}`}
                      className="font-medium text-gray-900 hover:text-[#2B227C]"
                    >
                      {borrower.name}
                    </Link>
                    <p className="text-sm text-gray-500">{borrower.email}</p>
                  </div>
                </div>
                <Link
                  to={`/admin/borrowers/${borrower.id}`}
                  className="text-[#2B227C] hover:text-[#1a1648] text-sm font-medium inline-flex items-center"
                >
                  التفاصيل
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">نوع المنشأة</p>
                  <p className="font-medium">
                    {borrower.borrowerType === 'company' ? 'شركة' : 'مؤسسة'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">رقم السجل التجاري</p>
                  <p className="font-medium">{borrower.companyInfo?.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">حالة التحقق</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    borrower.kycStatus === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {borrower.kycStatus === 'verified' ? 'تم التحقق' : 'قيد المراجعة'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الحساب البنكي</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    borrower.bankInfo?.verified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {borrower.bankInfo?.verified ? 'تم التحقق' : 'قيد المراجعة'}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {borrowers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا يوجد مقترضون حالياً
            </div>
          )}
        </div>
      </div>
    </div>
  );
}