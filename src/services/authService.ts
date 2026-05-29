import type { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

const STORAGE_KEY = 'lyrics_studio_user';

const mockUsers: User[] = [
  {
    id: '1',
    username: '音乐爱好者',
    email: 'demo@example.com',
    createdAt: Date.now(),
    bio: '热爱音乐创作'
  }
];

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = mockUsers.find(
      u => u.email === credentials.email && credentials.password.length >= 6
    );

    if (user) {
      const token = `token_${user.id}_${Date.now()}`;
      const userData = { ...user, token };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return {
        success: true,
        message: '登录成功',
        user,
        token
      };
    }

    return {
      success: false,
      message: '邮箱或密码错误'
    };
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (credentials.password !== credentials.confirmPassword) {
      return {
        success: false,
        message: '两次输入的密码不一致'
      };
    }

    if (credentials.password.length < 6) {
      return {
        success: false,
        message: '密码长度至少需要6位'
      };
    }

    const existingUser = mockUsers.find(u => u.email === credentials.email);
    if (existingUser) {
      return {
        success: false,
        message: '该邮箱已被注册'
      };
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: credentials.username,
      email: credentials.email,
      createdAt: Date.now()
    };

    mockUsers.push(newUser);
    const token = `token_${newUser.id}_${Date.now()}`;
    const userData = { ...newUser, token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

    return {
      success: true,
      message: '注册成功',
      user: newUser,
      token
    };
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        return {
          id: data.id,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          createdAt: data.createdAt,
          bio: data.bio
        };
      } catch {
        return null;
      }
    }
    return null;
  },

  getToken(): string | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        return data.token || null;
      } catch {
        return null;
      }
    }
    return null;
  }
};
