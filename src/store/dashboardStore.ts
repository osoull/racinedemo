import { create } from 'zustand';
import { demoProjects, demoInvestments } from '../data/demo';
import { formatCurrency } from '../utils/formatters';

interface DashboardStats {
  totalInvestments: number;
  activeProjects: number;
  totalInvestors: number;
  averageReturn: number;
  pendingKyc: number;
  pendingUpgrades: number;
  totalBorrowers: number;
  totalCommissions: number;
}

interface DashboardStore {
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
  getAdminStats: () => Partial<DashboardStats>;
  getInvestorStats: (userId: string) => Partial<DashboardStats>;
  getBorrowerStats: (userId: string) => Partial<DashboardStats>;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  stats: {
    totalInvestments: 0,
    activeProjects: 0,
    totalInvestors: 0,
    averageReturn: 0,
    pendingKyc: 0,
    pendingUpgrades: 0,
    totalBorrowers: 0,
    totalCommissions: 0
  },
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      // Calculate stats from demo data
      const totalInvestments = demoInvestments.reduce((sum, inv) => sum + inv.amount, 0);
      const activeProjects = demoProjects.filter(p => p.status === 'active').length;
      const averageReturn = demoProjects.reduce((sum, p) => {
        const returnValue = parseFloat(p.expectedReturn.replace('%', ''));
        return sum + returnValue;
      }, 0) / demoProjects.length;

      set({
        stats: {
          totalInvestments,
          activeProjects,
          totalInvestors: 150, // Demo value
          averageReturn,
          pendingKyc: 5,
          pendingUpgrades: 3,
          totalBorrowers: 20,
          totalCommissions: totalInvestments * 0.025 // 2.5% commission
        }
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  getAdminStats: () => {
    const { stats } = get();
    return {
      totalInvestments: stats.totalInvestments,
      activeProjects: stats.activeProjects,
      totalInvestors: stats.totalInvestors,
      totalCommissions: stats.totalCommissions,
      pendingKyc: stats.pendingKyc,
      pendingUpgrades: stats.pendingUpgrades
    };
  },

  getInvestorStats: (userId: string) => {
    const userInvestments = demoInvestments.filter(inv => inv.userId === userId);
    const totalInvested = userInvestments.reduce((sum, inv) => sum + inv.amount, 0);
    const activeInvestments = userInvestments.filter(inv => inv.status === 'completed').length;

    return {
      totalInvestments: totalInvested,
      activeProjects: activeInvestments,
      averageReturn: 12.5 // Demo value
    };
  },

  getBorrowerStats: (userId: string) => {
    const borrowerProjects = demoProjects.filter(p => p.manager === userId);
    const totalFunding = borrowerProjects.reduce((sum, p) => sum + p.raised, 0);
    const activeProjects = borrowerProjects.filter(p => p.status === 'active').length;

    return {
      totalInvestments: totalFunding,
      activeProjects,
      totalInvestors: borrowerProjects.reduce((sum, p) => sum + p.investors, 0)
    };
  }
}));