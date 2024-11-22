import React from 'react';
import { useAuthStore } from '../../services/auth';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import {
  BarChart3,
  Users,
  FileText,
  ChevronLeft,
  TrendingUp,
  User,
  Check,
  X,
  ArrowUpRight,
  DollarSign,
  Calendar,
  Clock,
  Shield,
  Building2,
  AlertCircle,
  Wallet,
  Eye
} from 'lucide-react';
import RevenueChart from '../components/RevenueChart';
import { Link } from 'react-router-dom';
import { demoUsers, demoProjects } from '../../data/demo';

export default function AdminDashboard() {
  const { user } = useAuthStore();

  // Calculate statistics from demo data
  const investors = demoUsers.filter(u => u.role === 'user');
  const borrowers = demoUsers.filter(u => u.role === 'borrower');
  const activeProjects = demoProjects.filter(p => p.status === 'active');
  const totalInvestments = demoProjects.reduce((sum, p) => sum + p.raised, 0);
  const pendingKyc = demoUsers.filter(u => u.kycStatus === 'pending').length;
  const pendingUpgrades = investors.filter(u => u.investorType === 'basic').length;

  const stats = [
    {
      title: 'إجمالي العمولات',
      value: formatCurrency(2800000),
      change: '+15.2%',
      icon: <DollarSign className="h-6 w-6 text-[#2B227C]" />,
      subValue: formatCurrency(450000),
      subLabel: 'الشهر الحالي',
      color: 'emerald'
    },
    {
      title: 'إجمالي المستثمرين',
      value: formatNumber(investors.length),
      change: '+12.5%',
      icon: <Users className="h-6 w-6 text-[#2B227C]" />,
      subValue: formatNumber(investors.filter(i => i.investorType === 'qualified').length),
      subLabel: 'مستثمرين مؤهلين',
      color: 'blue'
    },
    {
      title: 'المشاريع النشطة',
      value: formatNumber(activeProjects.length),
      change: '+8.3%',
      icon: <Building2 className="h-6 w-6 text-[#2B227C]" />,
      subValue: formatCurrency(totalInvestments),
      subLabel: 'إجمالي التمويل',
      color: 'purple'
    },
    {
      title: 'المقترضون',
      value: formatNumber(borrowers.length),
      change: '+2.1%',
      icon: <Wallet className="h-6 w-6 text-[#2B227C]" />,
      subValue: formatNumber(borrowers.filter(b => b.kycStatus === 'verified').length),
      subLabel: 'مقترضون معتمدون',
      color: 'amber'
    }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'طلبات التمويل',
      count: 3,
      status: 'pending',
      icon: <FileText className="h-5 w-5" />,
      color: 'yellow',
      link: '/admin/projects'
    },
    {
      id: 2,
      title: 'التحقق من الهوية',
      count: pendingKyc,
      status: 'pending',
      icon: <Shield className="h-5 w-5" />,
      color: 'blue',
      link: '/admin/kyc'
    },
    {
      id: 3,
      title: 'ترقية الحسابات',
      count: pendingUpgrades,
      status: 'pending',
      icon: <ArrowUpRight className="h-5 w-5" />,
      color: 'purple',
      link: '/admin/upgrade-requests'
    }
  ];

  const recentActivities = [
    ...demoUsers
      .filter(u => u.kycStatus === 'pending')
      .map(u => ({
        id: `kyc-${u.id}`,
        type: 'kyc',
        user: u,
        date: new Date(),
        title: 'طلب تحقق جديد',
        description: `تم استلام طلب تحقق من ${u.name}`,
        icon: <Shield className="h-5 w-5" />,
        color: 'blue',
        link: '/admin/kyc'
      })),
    ...demoProjects
      .filter(p => p.status === 'active')
      .map(p => ({
        id: `project-${p.id}`,
        type: 'project',
        project: p,
        date: new Date(p.startDate),
        title: 'مشروع جديد',
        description: `تم إضافة مشروع ${p.title}`,
        icon: <Building2 className="h-5 w-5" />,
        color: 'emerald',
        link: `/admin/projects/${p.id}`
      }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  return (
    <div className="space-y-6 text-right">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-${stat.color}-100 p-3 rounded-xl`}>
                {stat.icon}
              </div>
              <span className={`text-sm text-${stat.color}-600 font-medium`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{stat.subLabel}</span>
                <span className="font-medium">{stat.subValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">المهام العاجلة</h3>
            <span className="text-sm text-red-500">{quickActions.reduce((sum, action) => sum + action.count, 0)} مهام جديدة</span>
          </div>

          <div className="space-y-4">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                to={action.link}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`bg-${action.color}-100 p-2 rounded-lg`}>
                    {action.icon}
                  </div>
                  <div>
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-gray-500">{action.count} طلبات معلقة</p>
                  </div>
                </div>
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">النشاط الحديث</h3>
        </div>
        <div className="divide-y">
          {recentActivities.map((activity) => (
            <Link
              key={activity.id}
              to={activity.link}
              className="block p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`w-10 h-10 bg-${activity.color}-100 rounded-lg flex items-center justify-center`}>
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 ml-2" />
                  <span className="text-sm text-gray-500">
                    {activity.date.toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}