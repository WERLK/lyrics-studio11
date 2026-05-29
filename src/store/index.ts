import { create } from 'zustand';
import { User } from '../types/auth';
import { authService } from '../services/authService';

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;

  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, confirmPassword: string) => Promise<boolean>;
  logout: () => void;
  initAuth: () => void;
}

export const useStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  token: null,

  setUser: (user) => set({ user }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setToken: (token) => set({ token }),

  login: async (email, password) => {
    const result = await authService.login({ email, password });
    if (result.success && result.user) {
      set({ user: result.user, isLoggedIn: true, token: result.token || null });
      return true;
    }
    return false;
  },

  register: async (username, email, password, confirmPassword) => {
    const result = await authService.register({ username, email, password, confirmPassword });
    if (result.success && result.user) {
      set({ user: result.user, isLoggedIn: true, token: result.token || null });
      return true;
    }
    return false;
  },

  logout: () => {
    authService.logout();
    set({ user: null, isLoggedIn: false, token: null });
  },

  initAuth: () => {
    const user = authService.getCurrentUser();
    const token = authService.getToken();
    if (user) {
      set({ user, isLoggedIn: true, token });
    }
  },
}));
