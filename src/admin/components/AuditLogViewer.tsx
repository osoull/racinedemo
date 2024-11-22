import React from 'react';
import { Clock, User, Shield } from 'lucide-react';
import { useAuditStore, AuditLog } from '../../services/audit';

interface AuditLogViewerProps {
  userId?: string;
}

export default function AuditLogViewer({ userId }: AuditLogViewerProps) {
  const { getLogs } = useAuditStore();
  const logs = getLogs(userId);

  const getActionLabel = (action: AuditLog['action']) => {
    switch (action) {
      case 'create':
        return 'إنشاء';
      case 'update':
        return 'تحديث';
      case 'delete':
        return 'حذف';
      case 'status_change':
        return 'تغيير الحالة';
      default:
        return action;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">سجل التغييرات</h3>
      </div>
      <div className="divide-y">
        {logs.map((log) => (
          <div key={log.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-[#2B227C]/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#2B227C]" />
                </div>
                <div>
                  <p className="font-medium">{getActionLabel(log.action)}</p>
                  <p className="text-sm text-gray-500">{log.details}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 ml-1" />
                  <span>بواسطة: {log.performedBy}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 ml-1" />
                  <span>{new Date(log.timestamp).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            لا توجد سجلات حتى الآن
          </div>
        )}
      </div>
    </div>
  );
}