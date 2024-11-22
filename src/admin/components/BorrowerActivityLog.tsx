import React from 'react';
import { Calendar, FileText, Shield, CreditCard } from 'lucide-react';

interface Activity {
  id: string;
  type: 'document' | 'payment' | 'kyc' | 'status';
  title: string;
  description: string;
  date: string;
  status?: string;
}

interface BorrowerActivityLogProps {
  activities: Activity[];
}

export default function BorrowerActivityLog({ activities }: BorrowerActivityLogProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-[#2B227C]" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-[#2B227C]" />;
      case 'kyc':
        return <Shield className="h-5 w-5 text-[#2B227C]" />;
      default:
        return <FileText className="h-5 w-5 text-[#2B227C]" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">سجل النشاط</h3>
      </div>
      <div className="divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 ml-2" />
                <span className="text-sm text-gray-500">
                  {new Date(activity.date).toLocaleDateString('ar-SA')}
                </span>
              </div>
            </div>
            {activity.status && (
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activity.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}