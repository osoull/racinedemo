import { create } from 'zustand';
import { demoUsers } from '../data/demo';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: number;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, role: 'user' | 'borrower') => Promise<User>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updatePhoto: (photoUrl: string) => Promise<void>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
  toggleUserStatus: (userId: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateLastActivity: () => void;
  hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  users: demoUsers,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastActivity: Date.now(),

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        set({ 
          user: userWithoutPassword, 
          isAuthenticated: true, 
          error: null,
          lastActivity: Date.now()
        });
        return userWithoutPassword;
      }
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email: string, password: string, role: 'user' | 'borrower') => {
    set({ isLoading: true, error: null });
    try {
      if (demoUsers.some(u => u.email === email)) {
        throw new Error('البريد الإلكتروني مسجل مسبقاً');
      }

      const newUser: User = {
        id: String(demoUsers.length + 1),
        email,
        name: 'مستخدم جديد',
        role,
        status: 'active',
        kycStatus: 'pending',
        ...(role === 'user' ? { investorType: 'basic' as const } : { borrowerType: 'company' as const }),
        permissions: role === 'user' 
          ? ['view_projects', 'view_investments', 'view_wallet', 'view_profile']
          : ['view_projects', 'view_profile', 'manage_documents']
      };

      demoUsers.push(newUser);
      
      set({ 
        user: newUser, 
        users: demoUsers,
        isAuthenticated: true, 
        error: null,
        lastActivity: Date.now()
      });
      return newUser;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<User>) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not authenticated');

    try {
      set({ isLoading: true, error: null });
      
      // Update user in demo data
      const userIndex = demoUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex === -1) throw new Error('User not found');

      const updatedUser = { ...currentUser, ...updates };
      demoUsers[userIndex] = { ...demoUsers[userIndex], ...updates };

      set({ 
        user: updatedUser,
        users: demoUsers
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updatePhoto: async (photoUrl: string) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not authenticated');

    try {
      set({ isLoading: true, error: null });
      await get().updateProfile({ photoUrl });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (userId: string, updates: Partial<User>) => {
    try {
      set({ isLoading: true, error: null });
      
      const userIndex = demoUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) throw new Error('User not found');

      demoUsers[userIndex] = { ...demoUsers[userIndex], ...updates };

      // If updating current user, update state
      const currentUser = get().user;
      if (currentUser && currentUser.id === userId) {
        set({ user: { ...currentUser, ...updates } });
      }

      set({ users: [...demoUsers] });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  toggleUserStatus: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const userIndex = demoUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) throw new Error('User not found');

      const user = demoUsers[userIndex];
      const newStatus = user.status === 'active' ? 'inactive' : 'active';

      // Check if this is the last active admin
      if (user.role === 'admin' && newStatus === 'inactive') {
        const activeAdmins = demoUsers.filter(u => 
          u.role === 'admin' && u.status === 'active'
        );
        if (activeAdmins.length <= 1) {
          throw new Error('Cannot deactivate the last active admin');
        }
      }

      demoUsers[userIndex] = { ...user, status: newStatus };

      // If toggling current user, update state
      const currentUser = get().user;
      if (currentUser && currentUser.id === userId) {
        set({ user: { ...currentUser, status: newStatus } });
      }

      set({ users: [...demoUsers] });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),

  updateLastActivity: () => set({ lastActivity: Date.now() }),

  hasPermission: (permission: string) => {
    const user = get().user;
    if (!user || !user.permissions) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Check specific permission
    return user.permissions.includes(permission);
  }
}));