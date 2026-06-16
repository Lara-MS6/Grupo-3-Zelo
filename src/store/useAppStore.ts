import { create } from 'zustand';

interface AppState {
  isZeloPrime: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  setPrimeStatus: (status: boolean) => void;
  setUser: (user: { name: string; email: string } | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isZeloPrime: false, 
  user: {
    name: "Lara Magalhães",
    email: "lara@ucb.br"
  },
  setPrimeStatus: (status) => set({ isZeloPrime: status }),
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, isZeloPrime: false }),
}));