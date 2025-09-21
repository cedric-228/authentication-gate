import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'young' | 'provider';
  photo?: string;
  bio?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  email: string;
  password: string;
  role: 'young' | 'provider';
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'young' | 'provider';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/login', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
  },

  async getMe(): Promise<User> {
    const response = await api.get('/me');
    return response.data;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await api.put('/profile', updates);
    return response.data;
  },
};

