import React from 'react';

interface CommitmentCardProps {
  imageUrl: string;
  altText: string;
}

export default function CommitmentCard({ imageUrl, altText }: CommitmentCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 flex items-center justify-center">
      <img 
        src={imageUrl} 
        alt={altText} 
        className="max-h-24 object-contain"
      />
    </div>
  );
}