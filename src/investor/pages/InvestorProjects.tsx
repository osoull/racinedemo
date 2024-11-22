import React from 'react';
import { Search, Filter, ChevronLeft } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { demoProjects } from '../../data/demo';

export default function InvestorProjects() {
  const projects = demoProjects;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">الفرص الاستثمارية</h2>
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <div className="w-12 h-12 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                <span className="text-[#2B227C] font-medium">{project.title[0]}</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <span className="text-sm text-gray-500">{project.category}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">المبلغ المستهدف</span>
                  <span className="font-medium">{formatCurrency(project.target)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#2B227C] rounded-full h-2"
                    style={{ width: `${(project.raised / project.target) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">تم جمع {formatCurrency(project.raised)}</span>
                  <span className="text-gray-500">{project.investors} مستثمر</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">العائد المتوقع</p>
                  <p className="font-medium">{project.expectedReturn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">التصنيف الائتماني</p>
                  <p className="font-medium">{project.creditRating}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    الحد الأدنى: {formatCurrency(project.minInvestment)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ينتهي: {new Date(project.endDate).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="w-full inline-block text-center py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] transition-colors"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}