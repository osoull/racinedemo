import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { Users, ChevronLeft } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    target: number;
    raised: number;
    investors: number;
    expectedReturn: string;
    minInvestment: number;
    endDate: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const progress = (project.raised / project.target) * 100;

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-3 space-x-reverse mb-4">
        <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
          <span className="text-[#2B227C] font-medium text-base lg:text-lg">{project.title[0]}</span>
        </div>
        <div>
          <h3 className="font-medium text-base lg:text-lg text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">المبلغ المستهدف</span>
            <span className="font-medium">{formatCurrency(project.target)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#2B227C] rounded-full h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">تم جمع {formatCurrency(project.raised)}</span>
            <div className="flex items-center gap-1 text-gray-500">
              <Users className="h-4 w-4" />
              <span>{formatNumber(project.investors)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          <div>
            <p className="text-sm text-gray-500">العائد المتوقع</p>
            <p className="font-medium">{project.expectedReturn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">الحد الأدنى</p>
            <p className="font-medium">{formatCurrency(project.minInvestment)}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              ينتهي: {new Date(project.endDate).toLocaleDateString('ar-SA')}
            </span>
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="w-full flex items-center justify-center gap-2 py-2 lg:py-3 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] transition-colors"
          >
            <span>عرض التفاصيل</span>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}