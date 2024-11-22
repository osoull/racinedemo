import React from 'react';

interface PriorityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PriorityCard({ title, description, icon }: PriorityCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300">
      <div className="bg-[#2B227C]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#2B227C] mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}