import api from './api';
import { User } from '@/types/user';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

class AuthService {
  // Login user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // In a real app, this would be an actual API call
      // const response = await api.post('/auth/login', credentials);
      
      // Mock response for now
      const mockResponse: LoginResponse = {
        user: {
          id: '1',
          username: credentials.username,
          level: 5,
          experience: 45,
          xaviCoins: 1500,
          completedActivities: 12,
          totalXaviCoins: 3250,
          currentStreak: 5,
          purchasedItems: 8,
          avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        },
        token: 'mock-jwt-token',
      };

      // Store token
      localStorage.setItem('authToken', mockResponse.token);
      
      return mockResponse;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      // In a real app, this would call the logout endpoint
      // await api.post('/auth/logout');
      
      // Remove token
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      // In a real app, this would call the user profile endpoint
      // const response = await api.get('/auth/me');
      
      // Mock response for now
      const mockUser: User = {
        id: '1',
        username: 'Entrenador Ash',
        level: 5,
        experience: 45,
        xaviCoins: 1500,
        completedActivities: 12,
        totalXaviCoins: 3250,
        currentStreak: 5,
        purchasedItems: 8,
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      };

      return mockUser;
    } catch (error) {
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

export default new AuthService(); 