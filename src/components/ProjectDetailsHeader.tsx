import React from 'react';

interface ProjectDetailsHeaderProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export default function ProjectDetailsHeader({ title, category, description, imageUrl }: ProjectDetailsHeaderProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8">
      <div className="relative h-96">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 w-full p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium">
              {category}
            </span>
          </div>
          <p className="text-white/90 text-lg max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
}