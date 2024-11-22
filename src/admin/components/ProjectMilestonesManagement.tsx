import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X } from 'lucide-react';

const milestoneSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  date: z.string().min(1, 'يجب تحديد التاريخ'),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

type MilestoneForm = z.infer<typeof milestoneSchema>;

interface ProjectMilestonesManagementProps {
  projectId?: string;
}

export default function ProjectMilestonesManagement({ projectId }: ProjectMilestonesManagementProps) {
  const [milestones, setMilestones] = useState<MilestoneForm[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MilestoneForm>({
    resolver: zodResolver(milestoneSchema),
  });

  const onSubmit = async (data: MilestoneForm) => {
    try {
      // Add new milestone
      setMilestones([...milestones, data]);
      
      // Reset form
      reset();
    } catch (error) {
      console.error('Error adding milestone:', error);
    }
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const toggleMilestoneStatus = (index: number) => {
    setMilestones(
      milestones.map((milestone, i) => 
        i === index 
          ? { ...milestone, completed: !milestone.completed }
          : milestone
      )
    );
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6">
      {/* Add New Milestone Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان المرحلة<span className="text-red-500">*</span>
            </label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              التاريخ المتوقع<span className="text-red-500">*</span>
            </label>
            <input
              {...register('date')}
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة مرحلة</span>
          </button>
        </div>
      </form>

      {/* Milestones List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">المراحل المضافة</h3>
        
        {milestones.length === 0 ? (
          <p className="text-gray-500 text-center py-8">لم يتم إضافة أي مراحل بعد</p>
        ) : (
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={milestone.completed}
                    onChange={() => toggleMilestoneStatus(index)}
                    className="rounded text-[#2B227C] focus:ring-[#2B227C]"
                  />
                  <div>
                    <h4 className="font-medium">{milestone.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(milestone.date).toLocaleDateString('ar-SA')}
                    </p>
                    {milestone.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {milestone.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => removeMilestone(index)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}