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