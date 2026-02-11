/**
 * Authentication Service
 */

import type {
    ApiResponse,
    AuthTokens,
    LoginCredentials,
    User
} from '@/types';
import { secureStorage } from '@/utils/storage';
import { apiClient, clearAuthToken, setAuthToken } from './client';

const AUTH_TOKENS_KEY = 'auth_tokens';
const USER_KEY = 'user_data';

interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

interface RefreshResponse {
  tokens: AuthTokens;
}

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

    if (response.success && response.data) {
      await this.saveSession(response.data.user, response.data.tokens);
    }

    return response;
  },

  /**
   * Register new user
   */
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>('/auth/register', userData);

    if (response.success && response.data) {
      await this.saveSession(response.data.user, response.data.tokens);
    }

    return response;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Continue with local logout even if API fails
    } finally {
      await this.clearSession();
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<ApiResponse<RefreshResponse>> {
    const tokens = await this.getStoredTokens();
    
    if (!tokens?.refreshToken) {
      return {
        data: null as unknown as RefreshResponse,
        success: false,
        message: 'No refresh token available',
      };
    }

    const response = await apiClient.post<RefreshResponse>('/auth/refresh', {
      refreshToken: tokens.refreshToken,
    });

    if (response.success && response.data) {
      await secureStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(response.data.tokens));
      setAuthToken(response.data.tokens.accessToken);
    }

    return response;
  },

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get('/auth/me');
  },

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.patch('/auth/profile', data);
  },

  /**
   * Save session data to secure storage
   */
  async saveSession(user: User, tokens: AuthTokens): Promise<void> {
    await secureStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(tokens));
    await secureStorage.setItem(USER_KEY, JSON.stringify(user));
    setAuthToken(tokens.accessToken);
  },

  /**
   * Clear session data
   */
  async clearSession(): Promise<void> {
    await secureStorage.removeItem(AUTH_TOKENS_KEY);
    await secureStorage.removeItem(USER_KEY);
    clearAuthToken();
  },

  /**
   * Get stored tokens
   */
  async getStoredTokens(): Promise<AuthTokens | null> {
    const tokensStr = await secureStorage.getItem(AUTH_TOKENS_KEY);
    return tokensStr ? JSON.parse(tokensStr) : null;
  },

  /**
   * Get stored user
   */
  async getStoredUser(): Promise<User | null> {
    const userStr = await secureStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if session is valid
   */
  async isSessionValid(): Promise<boolean> {
    const tokens = await this.getStoredTokens();
    if (!tokens) return false;
    
    // Check if token is expired (with 5 min buffer)
    const bufferTime = 5 * 60 * 1000;
    return tokens.expiresAt > Date.now() + bufferTime;
  },

  /**
   * Restore session on app launch
   */
  async restoreSession(): Promise<{ user: User; tokens: AuthTokens } | null> {
    const tokens = await this.getStoredTokens();
    const user = await this.getStoredUser();

    if (!tokens || !user) return null;

    // Check if token needs refresh
    if (!await this.isSessionValid()) {
      const refreshResult = await this.refreshToken();
      if (!refreshResult.success) {
        await this.clearSession();
        return null;
      }
      return { user, tokens: refreshResult.data.tokens };
    }

    setAuthToken(tokens.accessToken);
    return { user, tokens };
  },
};
