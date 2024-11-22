import { useQuery } from '@tanstack/react-query';
import { useDashboardStore } from '../store/dashboardStore';
import { useAuthStore } from '../services/auth';

export function useSharedStats() {
  const { user } = useAuthStore();
  const { fetchStats, getAdminStats, getInvestorStats, getBorrowerStats } = useDashboardStore();

  return useQuery({
    queryKey: ['dashboard-stats', user?.id, user?.role],
    queryFn: async () => {
      await fetchStats();
      
      if (!user) return null;

      if (user.role === 'admin' || user.role === 'manager') {
        return getAdminStats();
      }
      
      if (user.role === 'user') {
        return getInvestorStats(user.id);
      }
      
      if (user.role === 'borrower') {
        return getBorrowerStats(user.id);
      }

      return null;
    },
    enabled: !!user
  });
}