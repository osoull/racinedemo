import React from 'react';
import { Search, Filter, Plus, ChevronLeft, AlertCircle, Check, X } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function AdminCrowdfunding() {
  const campaigns = [
    {
      id: 1,
      title: 'مشروع وقف الخير',
      category: 'وقف',
      target: 1000000,
      raised: 750000,
      investors: 120,
      status: 'نشط',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      kyc: true,
      verification: 'مكتمل',
      risk: 'منخفض',
      returns: '12%',
      minInvestment: 1000,
    },
    {
      id: 2,
      title: 'مشروع الإسكان الخيري',
      category: 'عقاري',
      target: 2000000,
      raised: 1200000,
      investors: 180,
      status: 'قيد المراجعة',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      kyc: false,
      verification: 'قيد المراجعة',
      risk: 'متوسط',
      returns: '15%',
      minInvestment: 5000,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إدارة حملات التمويل الجماعي</h2>
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
            <Plus className="h-5 w-5" />
            <span>حملة جديدة</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي الحملات', value: '15', change: '+12%' },
          { label: 'الحملات النشطة', value: '8', change: '+5%' },
          { label: 'إجمالي التمويل', value: formatCurrency(5000000), change: '+15%' },
          { label: 'متوسط نسبة النجاح', value: '85%', change: '+3%' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center text-sm text-green-600 mb-2">
              <span>آخر 30 يوم</span>
              <span>{stat.change}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">الحملات الحالية</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحملة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التصنيف</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ المستهدف</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التحقق</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المخاطر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العائد</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-[#2B227C]/10 flex items-center justify-center">
                          <span className="text-[#2B227C] font-medium">{campaign.title[0]}</span>
                        </div>
                      </div>
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(campaign.startDate).toLocaleDateString('ar-SA')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {campaign.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{formatCurrency(campaign.target)}</div>
                      <div className="text-xs text-gray-500">
                        الحد الأدنى: {formatCurrency(campaign.minInvestment)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.kyc ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.kyc ? (
                        <Check className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {campaign.verification}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      campaign.risk === 'منخفض' 
                        ? 'bg-green-100 text-green-800'
                        : campaign.risk === 'متوسط'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {campaign.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{campaign.returns}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      campaign.status === 'نشط'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="text-[#2B227C] hover:text-[#1a1648] text-sm font-medium inline-flex items-center">
                      التفاصيل
                      <ChevronLeft className="h-4 w-4 mr-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Verification Queue */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">طلبات التحقق المعلقة</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-[#2B227C]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#2B227C] font-medium">م</span>
                  </div>
                  <div>
                    <p className="font-medium">مشروع استثماري {item}</p>
                    <p className="text-sm text-gray-500">تم التقديم: {new Date().toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <Check className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}