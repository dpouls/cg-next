import axios from 'axios';
import api from '@/lib/axios';
import TokenService from './token';
import { User, getCurrentUser } from './user';

interface LoginResponse {
  refresh: string;
  access: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResult {
  access: string;
  refresh: string;
  user: User;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
  try {
    // Get tokens
    const { data: tokenData } = await api.post<LoginResponse>('/api/v1/auth/token', credentials);
    
    // Store tokens using TokenService
    TokenService.setTokens(tokenData.access, tokenData.refresh);
    
    // Get user data
    const user = await getCurrentUser();
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      access: tokenData.access,
      refresh: tokenData.refresh,
      user
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
    throw new Error('Login failed');
  }
};

export const logout = (): void => {
  TokenService.removeTokens();
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return TokenService.isAccessTokenValid();
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}; 