import { create } from 'zustand';

interface WalletStore {
  balances: { [userId: string]: number };
  getWalletBalance: (userId: number | string) => number;
  updateBalance: (userId: number | string, amount: number) => void;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  balances: {
    1: 50000, // Demo balance for user ID 1
  },

  getWalletBalance: (userId) => {
    return get().balances[userId] || 0;
  },

  updateBalance: (userId, amount) => {
    set((state) => ({
      balances: {
        ...state.balances,
        [userId]: amount,
      },
    }));
  },
}));