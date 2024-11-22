import React from 'react';
import { Check, Clock } from 'lucide-react';

interface Milestone {
  title: string;
  date: string;
  completed: boolean;
}

interface ProjectMilestonesProps {
  milestones: Milestone[];
  isEditing?: boolean;
  canEdit?: boolean;
  onUpdate?: (milestones: Milestone[]) => void;
}

export default function ProjectMilestones({ 
  milestones, 
  isEditing = false,
  canEdit = false,
  onUpdate 
}: ProjectMilestonesProps) {
  const handleMilestoneUpdate = (index: number, field: keyof Milestone, value: any) => {
    if (!onUpdate || !canEdit) return;
    
    const updatedMilestones = milestones.map((milestone, i) => {
      if (i === index) {
        return { ...milestone, [field]: value };
      }
      return milestone;
    });
    
    onUpdate(updatedMilestones);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">مراحل المشروع</h2>
      <div className="space-y-6">
        {milestones.map((milestone, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
              milestone.completed ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {milestone.completed ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              {isEditing && canEdit ? (
                <>
                  <input
                    type="text"
                    value={milestone.title}
                    onChange={(e) => handleMilestoneUpdate(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C] mb-2"
                  />
                  <div className="flex items-center gap-4">
                    <input
                      type="date"
                      value={milestone.date}
                      onChange={(e) => handleMilestoneUpdate(index, 'date', e.target.value)}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={milestone.completed}
                        onChange={(e) => handleMilestoneUpdate(index, 'completed', e.target.checked)}
                        className="rounded text-[#2B227C] focus:ring-[#2B227C]"
                      />
                      <span className="text-sm text-gray-600">مكتمل</span>
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(milestone.date).toLocaleDateString('ar-SA')}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}