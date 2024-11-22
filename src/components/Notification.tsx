import React from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

export default function Notification({ message, type = 'info', onClose }: NotificationProps) {
  const bgColor = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50'
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }[type];

  return (
    <div className={`rounded-lg p-4 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className={`${textColor} hover:opacity-75`}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}