import React from 'react';
import { useSharedStats } from '../hooks/useSharedStats';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import { 
  Wallet, 
  Users, 
  Building2, 
  TrendingUp,
  DollarSign,
  Shield,
  ArrowUpRight
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  color: 'emerald' | 'blue' | 'purple' | 'amber';
}

interface DashboardStatsData {
  totalInvestments?: number;
  activeProjects?: number;
  totalInvestors?: number;
  averageReturn?: number;
  pendingKyc?: number;
  pendingUpgrades?: number;
  totalBorrowers?: number;
  totalCommissions?: number;
}

const StatCard = ({ title, value, icon, change, color }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`bg-${color}-100 p-3 rounded-lg`}>
        {icon}
      </div>
      {change && (
        <span className={`text-sm text-${color}-600 font-medium`}>
          {change}
        </span>
      )}
    </div>
    <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default function DashboardStats() {
  const { data: stats, isLoading } = useSharedStats();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards: StatCardProps[] = [
    {
      title: 'إجمالي الاستثمارات',
      value: formatCurrency(stats.totalInvestments || 0),
      icon: <Wallet className="h-6 w-6 text-emerald-600" />,
      change: '+12%',
      color: 'emerald'
    },
    {
      title: 'المشاريع النشطة',
      value: formatNumber(stats.activeProjects || 0),
      icon: <Building2 className="h-6 w-6 text-blue-600" />,
      change: '+8%',
      color: 'blue'
    }
  ];

  // Add admin-specific stats
  if ('totalCommissions' in stats) {
    statCards.push(
      {
        title: 'إجمالي العمولات',
        value: formatCurrency(stats.totalCommissions || 0),
        icon: <DollarSign className="h-6 w-6 text-purple-600" />,
        change: '+15%',
        color: 'purple'
      },
      {
        title: 'طلبات معلقة',
        value: formatNumber((stats.pendingKyc || 0) + (stats.pendingUpgrades || 0)),
        icon: <Shield className="h-6 w-6 text-amber-600" />,
        color: 'amber'
      }
    );
  }
  // Add investor-specific stats
  else if ('averageReturn' in stats) {
    statCards.push(
      {
        title: 'العائد المتوقع',
        value: formatPercentage(stats.averageReturn || 0),
        icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
        change: '+2.1%',
        color: 'purple'
      },
      {
        title: 'المستثمرون',
        value: formatNumber(stats.totalInvestors || 0),
        icon: <Users className="h-6 w-6 text-amber-600" />,
        color: 'amber'
      }
    );
  }
  // Add borrower-specific stats
  else if ('totalInvestors' in stats) {
    statCards.push(
      {
        title: 'المستثمرون',
        value: formatNumber(stats.totalInvestors || 0),
        icon: <Users className="h-6 w-6 text-purple-600" />,
        color: 'purple'
      },
      {
        title: 'طلبات التمويل',
        value: formatNumber(2), // Demo value
        icon: <ArrowUpRight className="h-6 w-6 text-amber-600" />,
        color: 'amber'
      }
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}