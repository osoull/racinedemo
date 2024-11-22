import { Investment } from '../types/investment';
import { demoInvestments } from '../data/demo';

export async function getUserInvestments(userId: string): Promise<Investment[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return demoInvestments.filter(i => i.userId === userId);
}

export async function createInvestment(investment: Omit<Investment, 'id' | 'createdAt'>): Promise<Investment> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newInvestment: Investment = {
    ...investment,
    id: String(demoInvestments.length + 1),
    createdAt: new Date().toISOString()
  };
  
  demoInvestments.push(newInvestment);
  return newInvestment;
}

export async function updateInvestmentStatus(id: string, status: Investment['status']): Promise<Investment> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = demoInvestments.findIndex(i => i.id === id);
  if (index === -1) throw new Error('Investment not found');
  
  demoInvestments[index] = { ...demoInvestments[index], status };
  return demoInvestments[index];
}