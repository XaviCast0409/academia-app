import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user: User) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  updateUser: (userData: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    })),
})); 