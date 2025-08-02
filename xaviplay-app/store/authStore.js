import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginService } from '../services/authService';
import { resetNavigation } from '../services/navigationService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,
      error: null,

      // Login action
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await loginService({ email, password });
          set({
            token: data.token,
            user: data.user,
            loading: false,
            error: null
          });

          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Logout action
      logout: () => {
        // No hace nada, solo existe para compatibilidad
      },

      // Limpia el estado de autenticación
      clearAuth: () => set({
        token: null,
        user: null,
        loading: false,
        error: null,
      }),

      // Check if user is authenticated
      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.user;
      },

      // Get current user
      getUser: () => get().user,

      // Get auth token
      getToken: () => get().token,

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
