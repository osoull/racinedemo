export interface Investment {
  id: string;
  userId: string;
  projectId: string;
  amount: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  expectedReturn: number;
  nextPayment?: {
    amount: number;
    date: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  target: number;
  raised: number;
  investors: number;
  expectedReturn: string;
  minInvestment: number;
  creditRating: 'A' | 'B' | 'C' | 'D';
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  location: string;
  manager: string;
  imageUrl: string;
  milestones: {
    title: string;
    date: string;
    completed: boolean;
  }[];
  documents: {
    id: string;
    title: string;
    type: 'pdf' | 'doc' | 'xls';
    size: string;
    url: string;
    isPublic: boolean;
    uploadedAt: string;
    uploadedBy: string;
  }[];
  financialMetrics: {
    [year: string]: {
      revenue: number;
      profit: number;
      roi: number;
      debtRatio: number;
    };
  };
  riskAssessment?: {
    creditRating: string;
    companyHistory: string;
    financialPosition: string;
    managementQuality: string;
    marketPosition: string;
    riskAssessment: string;
  };
}