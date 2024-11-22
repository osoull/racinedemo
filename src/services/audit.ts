import { create } from 'zustand';

export interface AuditLog {
  id: string;
  action: 'create' | 'update' | 'delete' | 'status_change';
  userId: string;
  performedBy: string;
  details: string;
  timestamp: string;
}

interface AuditStore {
  logs: AuditLog[];
  addLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  getLogs: (userId?: string) => AuditLog[];
}

export const useAuditStore = create<AuditStore>((set, get) => ({
  logs: [],
  
  addLog: (log) => {
    const newLog: AuditLog = {
      ...log,
      id: String(Date.now()),
      timestamp: new Date().toISOString()
    };
    
    set(state => ({
      logs: [newLog, ...state.logs]
    }));
  },
  
  getLogs: (userId) => {
    const { logs } = get();
    if (userId) {
      return logs.filter(log => log.userId === userId);
    }
    return logs;
  }
}));