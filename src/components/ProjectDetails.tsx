import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../services/auth';
import ProjectOverview from './ProjectOverview';
import ProjectFinancials from './ProjectFinancials';
import ProjectMilestones from './ProjectMilestones';
import ProjectDocuments from './ProjectDocuments';
import ProjectDetailsSidebar from './ProjectDetailsSidebar';
import { demoProjects } from '../data/demo';
import type { Project } from '../types/project';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const project = demoProjects.find(p => p.id === id);

  if (!project) {
    return <div>مشروع غير موجود</div>;
  }

  const canEdit = user?.role === 'admin' || user?.role === 'manager';
  const canInvest = user?.role === 'user';
  const isOwner = user?.role === 'borrower' && project.manager === user.name;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#2B227C] hover:text-[#1a1648] group mb-6"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>العودة</span>
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <ProjectOverview 
              project={project} 
              isEditing={isEditing}
              canEdit={canEdit}
            />
            <ProjectFinancials 
              metrics={project.financialMetrics}
              isEditing={isEditing}
              canEdit={canEdit}
            />
            <ProjectMilestones 
              milestones={project.milestones}
              isEditing={isEditing}
              canEdit={canEdit}
            />
            <ProjectDocuments 
              documents={project.documents}
              isAdmin={canEdit}
              isEditing={isEditing}
              isOwner={isOwner}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <ProjectDetailsSidebar 
              project={project}
              isEditing={isEditing}
              canEdit={canEdit}
              canInvest={canInvest}
              isOwner={isOwner}
            />
          </div>
        </div>
      </div>
    </div>
  );
}