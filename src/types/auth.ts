export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: number;
  bio?: string;
  membership?: Membership;
  points: number;
}

export interface Membership {
  level: 'free' | 'basic' | 'pro' | 'vip';
  expiryDate: number | null;
  benefits: string[];
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface PointsHistory {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  source: string;
  timestamp: number;
  description: string;
}

export interface AdReward {
  id: string;
  points: number;
  watched: boolean;
  watchedAt?: number;
}

export interface LotteryPrize {
  id: string;
  name: string;
  points: number;
  probability: number;
  type: 'points' | 'vip' | 'discount';
  image?: string;
}

export interface ExchangeItem {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  type: 'vip' | 'feature' | 'gift';
  duration?: string;
  icon: string;
}
