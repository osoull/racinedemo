import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { demoInvestments } from '../data/demo';
import type { Investment } from '../types/project';

export function useInvestments(userId?: string) {
  return useQuery({
    queryKey: ['investments', userId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return userId 
        ? demoInvestments.filter(i => i.userId === userId)
        : demoInvestments;
    },
    enabled: !!userId
  });
}

export function useInvestment(id: string) {
  return useQuery({
    queryKey: ['investments', id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return demoInvestments.find(i => i.id === id);
    }
  });
}

export function useCreateInvestment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (investment: Omit<Investment, 'id' | 'createdAt'>) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newInvestment: Investment = {
        ...investment,
        id: String(demoInvestments.length + 1),
        createdAt: new Date().toISOString()
      };
      
      demoInvestments.push(newInvestment);
      return newInvestment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
    }
  });
}

export function useUpdateInvestment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<Investment>) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const index = demoInvestments.findIndex(i => i.id === id);
      if (index === -1) throw new Error('Investment not found');
      
      const updatedInvestment = {
        ...demoInvestments[index],
        ...updates
      };
      
      demoInvestments[index] = updatedInvestment;
      return updatedInvestment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
    }
  });
}