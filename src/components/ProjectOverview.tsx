import React from 'react';
import { Building2, MapPin, Shield, Target } from 'lucide-react';
import type { Project } from '../types/project';

interface ProjectOverviewProps {
  project: Project;
  isEditing?: boolean;
  canEdit?: boolean;
  onUpdate?: (field: keyof Project, value: any) => void;
}

export default function ProjectOverview({ 
  project, 
  isEditing = false, 
  canEdit = false,
  onUpdate 
}: ProjectOverviewProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">نظرة عامة</h2>
      
      {isEditing && canEdit ? (
        <textarea
          value={project.description}
          onChange={(e) => onUpdate?.('description', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2B227C] mb-8"
          rows={4}
        />
      ) : (
        <p className="text-gray-600 leading-relaxed mb-8">{project.description}</p>
      )}
      
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <div className="bg-[#2B227C]/10 p-3 rounded-xl">
            <Building2 className="h-6 w-6 text-[#2B227C]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">مدير المشروع</p>
            {isEditing && canEdit ? (
              <input
                type="text"
                value={project.manager}
                onChange={(e) => onUpdate?.('manager', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
            ) : (
              <p className="font-medium">{project.manager}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-[#2B227C]/10 p-3 rounded-xl">
            <MapPin className="h-6 w-6 text-[#2B227C]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">الموقع</p>
            {isEditing && canEdit ? (
              <input
                type="text"
                value={project.location}
                onChange={(e) => onUpdate?.('location', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              />
            ) : (
              <p className="font-medium">{project.location}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-[#2B227C]/10 p-3 rounded-xl">
            <Target className="h-6 w-6 text-[#2B227C]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">التصنيف</p>
            {isEditing && canEdit ? (
              <select
                value={project.category}
                onChange={(e) => onUpdate?.('category', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              >
                <option value="تمويل مشاريع طرف ثاني">تمويل مشاريع طرف ثاني</option>
                <option value="تمويل الفواتير">تمويل الفواتير</option>
                <option value="تمويل رأس المال العامل">تمويل رأس المال العامل</option>
                <option value="تمويل التوسع">تمويل التوسع</option>
                <option value="تمويل المشاريع العقارية">تمويل المشاريع العقارية</option>
              </select>
            ) : (
              <p className="font-medium">{project.category}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-[#2B227C]/10 p-3 rounded-xl">
            <Shield className="h-6 w-6 text-[#2B227C]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">التصنيف الائتماني</p>
            {isEditing && canEdit ? (
              <select
                value={project.creditRating}
                onChange={(e) => onUpdate?.('creditRating', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
              >
                <option value="A">A - ممتاز</option>
                <option value="B">B - جيد جداً</option>
                <option value="C">C - جيد</option>
                <option value="D">D - مقبول</option>
              </select>
            ) : (
              <p className="font-medium">{project.creditRating}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}