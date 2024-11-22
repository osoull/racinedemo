import React, { useState } from 'react';
import { Search, Plus, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import NewProjectModal from '../components/NewProjectModal';

export default function AdminProjects() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'مشروع وقف الخير',
      category: 'تمويل مشاريع طرف ثاني',
      target: 1000000,
      raised: 750000,
      investors: 120,
      status: 'نشط',
      startDate: '2024-01-01',
      creditRating: 'A',
      returns: '12%',
      minInvestment: 1000,
      kycStatus: 'verified'
    }
  ];

  const handleNewProject = async (data: any) => {
    try {
      // Here you would make an API call to create the project
      console.log('Creating new project:', data);
      setShowNewProjectModal(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إدارة المشاريع</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              className="w-64 pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select className="text-sm border rounded-lg px-3 py-2">
            <option value="">جميع التصنيفات</option>
            <option value="تمويل مشاريع طرف ثاني">تمويل مشاريع طرف ثاني</option>
            <option value="تمويل الفواتير">تمويل الفواتير</option>
            <option value="تمويل رأس المال العامل">تمويل رأس المال العامل</option>
            <option value="تمويل التوسع">تمويل التوسع</option>
            <option value="تمويل المشاريع العقارية">تمويل المشاريع العقارية</option>
          </select>
          <button 
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
          >
            <Plus className="h-5 w-5" />
            <span>مشروع جديد</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المشروع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التصنيف
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المبلغ المستهدف
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التحقق
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التصنيف الائتماني
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                العائد
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                إجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-lg bg-[#2B227C]/10 flex items-center justify-center">
                        <span className="text-[#2B227C] font-medium">{project.title[0]}</span>
                      </div>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{project.title}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(project.startDate).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm text-gray-900">{formatCurrency(project.target)}</div>
                    <div className="text-xs text-gray-500">
                      الحد الأدنى: {formatCurrency(project.minInvestment)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    project.kycStatus === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.kycStatus === 'verified' ? 'تم التحقق' : 'قيد المراجعة'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{project.creditRating}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{project.returns}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    project.status === 'نشط'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-left">
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-[#2B227C] hover:text-[#1a1648] text-sm font-medium inline-flex items-center"
                  >
                    التفاصيل
                    <ChevronLeft className="h-4 w-4 mr-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onSubmit={handleNewProject}
      />
    </div>
  );
}