import { create } from 'zustand';
import axios from 'axios';

interface Investment {
  id: string;
  projectId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

interface InvestmentStore {
  investments: Investment[];
  isLoading: boolean;
  error: string | null;
  createInvestment: (projectId: string, amount: number) => Promise<void>;
  fetchUserInvestments: (userId: string) => Promise<void>;
}

export const useInvestmentStore = create<InvestmentStore>((set) => ({
  investments: [],
  isLoading: false,
  error: null,

  createInvestment: async (projectId: string, amount: number) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call - Replace with actual API endpoint
      const response = await axios.post('/api/investments', {
        projectId,
        amount,
      });
      set((state) => ({
        investments: [...state.investments, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'فشل في إنشاء الاستثمار', isLoading: false });
    }
  },

  fetchUserInvestments: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call - Replace with actual API endpoint
      const response = await axios.get(`/api/users/${userId}/investments`);
      set({ investments: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'فشل في جلب الاستثمارات', isLoading: false });
    }
  },
}));