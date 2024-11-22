import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronLeft, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { demoProjects } from '../../data/demo';
import NewProjectRequestModal from '../components/NewProjectRequestModal';

export default function BorrowerProjects() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const projects = demoProjects;

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
        <h2 className="text-2xl font-bold text-gray-900">المشاريع</h2>
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
          <button 
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
          >
            <Plus className="h-5 w-5" />
            <span>مشروع جديد</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-[#2B227C]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.category}</span>
                </div>
              </div>
              <Link
                to={`/projects/${project.id}`}
                className="text-[#2B227C] hover:text-[#1a1648] text-sm font-medium inline-flex items-center"
              >
                التفاصيل
                <ChevronLeft className="h-4 w-4 mr-1" />
              </Link>
            </div>

            <p className="text-gray-600 mb-6">{project.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">المبلغ المطلوب</p>
                <p className="font-medium">{formatCurrency(project.target)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">المبلغ المجمع</p>
                <p className="font-medium">{formatCurrency(project.raised)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">عدد المستثمرين</p>
                <p className="font-medium">{project.investors}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">تاريخ الانتهاء</p>
                <p className="font-medium">
                  {new Date(project.endDate).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    قيد التمويل
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {Math.round((project.raised / project.target) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${(project.raised / project.target) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      <NewProjectRequestModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onSubmit={handleNewProject}
      />
    </div>
  );
}