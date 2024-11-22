import type { User } from '../types/user';
import type { Project, Investment } from '../types/project';

// Demo Users
export const demoUsers: User[] = [
  {
    id: '1',
    email: 'admin@racine.sa',
    name: 'مدير النظام',
    role: 'admin',
    status: 'active',
    password: 'Admin@123',
    kycStatus: 'verified',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    permissions: ['*']
  },
  {
    id: '2',
    email: 'manager@racine.sa',
    name: 'مدير العمليات',
    role: 'manager',
    status: 'active',
    password: 'Manager@123',
    kycStatus: 'verified',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    permissions: [
      'view_dashboard',
      'view_investors',
      'view_projects',
      'view_borrowers',
      'view_wallets',
      'view_kyc',
      'view_upgrade_requests',
      'view_profile',
      'manage_projects',
      'manage_investors',
      'manage_borrowers',
      'manage_kyc'
    ]
  },
  {
    id: '3',
    email: 'investor1@example.com',
    name: 'محمد أحمد',
    role: 'user',
    status: 'active',
    password: 'Investor@123',
    kycStatus: 'verified',
    investorType: 'basic',
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    permissions: ['view_projects', 'view_investments', 'view_wallet', 'view_profile']
  }
];

// Demo Projects
export const demoProjects: Project[] = [
  {
    id: '1',
    title: 'مشروع وقف الخير',
    description: 'مشروع وقفي لبناء مجمع سكني للأيتام في المدينة المنورة',
    category: 'تمويل مشاريع طرف ثاني',
    target: 1000000,
    raised: 750000,
    investors: 120,
    expectedReturn: '12%',
    minInvestment: 1000,
    creditRating: 'A',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'المدينة المنورة',
    manager: '8',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    milestones: [
      {
        title: 'بداية المشروع',
        date: '2024-01-01',
        completed: true
      },
      {
        title: 'اكتمال التمويل',
        date: '2024-03-15',
        completed: false
      }
    ],
    documents: [
      {
        id: '1',
        title: 'عرض تقديمي للمشروع',
        type: 'pdf',
        size: '2.5 MB',
        url: '/documents/presentation.pdf',
        isPublic: true,
        uploadedAt: '2024-03-15',
        uploadedBy: 'مدير المشروع'
      }
    ],
    financialMetrics: {
      '2023': {
        revenue: 5000000,
        profit: 750000,
        roi: 15.2,
        debtRatio: 0.32
      },
      '2022': {
        revenue: 4200000,
        profit: 620000,
        roi: 14.8,
        debtRatio: 0.35
      }
    },
    riskAssessment: {
      creditRating: 'A',
      companyHistory: 'ممتاز',
      financialPosition: 'ممتاز',
      managementQuality: 'ممتاز',
      marketPosition: 'ممتاز',
      riskAssessment: 'المشروع يتمتع بمخاطر منخفضة نظراً لقوة المركز المالي للشركة وخبرتها في السوق'
    }
  }
];

// Demo Investments
export const demoInvestments: Investment[] = [
  {
    id: '1',
    userId: '3',
    projectId: '1',
    amount: 25000,
    status: 'active',
    createdAt: '2024-03-15',
    expectedReturn: 12,
    nextPayment: {
      amount: 2500,
      date: '2024-04-15'
    }
  }
];