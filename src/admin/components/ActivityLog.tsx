import React from 'react';
import { Calendar, FileText, Shield, CreditCard } from 'lucide-react';
import { useAuditStore } from '../../services/audit';

interface ActivityLogProps {
  userId: string;
}

export default function ActivityLog({ userId }: ActivityLogProps) {
  const { getLogs } = useAuditStore();
  const logs = getLogs(userId);

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <FileText className="h-5 w-5 text-[#2B227C]" />;
      case 'update':
        return <Shield className="h-5 w-5 text-[#2B227C]" />;
      case 'status_change':
        return <CreditCard className="h-5 w-5 text-[#2B227C]" />;
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
        {logs.map((log) => (
          <div key={log.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                  {getActivityIcon(log.action)}
                </div>
                <div>
                  <p className="font-medium">{log.details}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>{new Date(log.timestamp).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            لا يوجد نشاط حتى الآن
          </div>
        )}
      </div>
    </div>
  );
}