import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import ProjectOverview from '../../components/ProjectOverview';
import ProjectFinancials from '../../components/ProjectFinancials';
import ProjectMilestones from '../../components/ProjectMilestones';
import ProjectDocuments from '../../components/ProjectDocuments';
import ProjectDetailsSidebar from '../../components/ProjectDetailsSidebar';
import { demoProjects } from '../../data/demo';
import { toast } from 'react-hot-toast';
import type { Project } from '../../types/project';

export function ProjectManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | undefined>(
    demoProjects.find(p => p.id === id) as Project | undefined
  );

  if (!editedProject) {
    return <div>مشروع غير موجود</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    try {
      toast.success('تم حفظ التغييرات بنجاح');
      setIsEditing(false);
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ التغييرات');
    }
  };

  const handleCancel = () => {
    setEditedProject(demoProjects.find(p => p.id === id) as Project | undefined);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Project, value: any) => {
    setEditedProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleFinancialsUpdate = (year: string, field: string, value: number) => {
    setEditedProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        financialMetrics: {
          ...prev.financialMetrics,
          [year]: {
            ...prev.financialMetrics[year],
            [field]: value
          }
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#2B227C] hover:text-[#1a1648] group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>العودة</span>
          </button>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <X className="h-5 w-5" />
                  <span>إلغاء</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
                >
                  <Save className="h-5 w-5" />
                  <span>حفظ التغييرات</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
              >
                <Edit className="h-5 w-5" />
                <span>تعديل المشروع</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProjectOverview 
              project={editedProject} 
              isEditing={isEditing}
              canEdit={true}
              onUpdate={handleInputChange}
            />
            <ProjectFinancials 
              metrics={editedProject.financialMetrics}
              isEditing={isEditing}
              canEdit={true}
              onUpdate={handleFinancialsUpdate}
            />
            <ProjectMilestones 
              milestones={editedProject.milestones}
              isEditing={isEditing}
              canEdit={true}
              onUpdate={(milestones) => handleInputChange('milestones', milestones)}
            />
            <ProjectDocuments 
              documents={editedProject.documents}
              isAdmin={true}
              isEditing={isEditing}
              isOwner={false}
            />
          </div>

          <div className="lg:col-span-1">
            <ProjectDetailsSidebar 
              project={editedProject}
              isEditing={isEditing}
              canEdit={true}
              canInvest={false}
              isOwner={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}