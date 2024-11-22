import React from 'react';
import { Calendar } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface Project {
  id: string;
  target: number;
  raised: number;
  investors: number;
  expectedReturn: string;
  minInvestment: number;
  status: string;
  endDate: string;
}

interface ProjectDetailsSidebarProps {
  project: Project;
  isEditing?: boolean;
  canEdit?: boolean;
  canInvest?: boolean;
  isOwner?: boolean;
}

export default function ProjectDetailsSidebar({ 
  project,
  isEditing = false,
  canEdit = false,
  canInvest = false,
  isOwner = false
}: ProjectDetailsSidebarProps) {
  const daysRemaining = Math.ceil(
    (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-4 lg:space-y-6 lg:sticky lg:top-8">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          {/* Progress */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <p className="text-xl lg:text-2xl font-bold">{formatCurrency(project.raised)}</p>
                <p className="text-sm text-gray-500">
                  من {formatCurrency(project.target)}
                </p>
              </div>
              <span className="text-base lg:text-lg font-bold text-[#2B227C]">
                {formatNumber((project.raised / project.target) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
              <div
                className="bg-[#2B227C] rounded-full h-2 lg:h-3 transition-all duration-500"
                style={{ width: `${(project.raised / project.target) * 100}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div>
              <p className="text-sm text-gray-500">المستثمرون</p>
              <p className="text-base lg:text-lg font-bold">{formatNumber(project.investors)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">العائد المتوقع</p>
              {isEditing && canEdit ? (
                <input
                  type="text"
                  value={project.expectedReturn}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                />
              ) : (
                <p className="text-base lg:text-lg font-bold">{project.expectedReturn}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">الحد الأدنى</p>
              {isEditing && canEdit ? (
                <input
                  type="number"
                  value={project.minInvestment}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                />
              ) : (
                <p className="text-base lg:text-lg font-bold">{formatCurrency(project.minInvestment)}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">الحالة</p>
              {isEditing && canEdit ? (
                <select
                  value={project.status}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                >
                  <option value="active">نشط</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                </select>
              ) : (
                <p className="text-base lg:text-lg font-bold">{project.status}</p>
              )}
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-gray-50 p-3 lg:p-4 rounded-xl">
            <div className="flex items-center gap-2 lg:gap-3 text-gray-600">
              <Calendar className="h-4 lg:h-5 w-4 lg:w-5" />
              <span className="text-sm lg:text-base">متبقي على إغلاق الاكتتاب</span>
            </div>
            {isEditing && canEdit ? (
              <input
                type="date"
                value={project.endDate}
                className="w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
            ) : (
              <p className="text-xl lg:text-2xl font-bold mt-2">{daysRemaining} يوم</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}