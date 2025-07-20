import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// API Client Class
class ApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    this.loadTokensFromStorage();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private loadTokensFromStorage() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
  }

  private saveTokensToStorage(tokens: AuthTokens) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  private clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    this.accessToken = null;
    this.refreshToken = null;
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.client.post<ApiResponse<AuthResponse>>('/auth/refresh', {
      refreshToken: this.refreshToken,
    });

    const { accessToken, refreshToken } = response.data.data;
    this.saveTokensToStorage({ accessToken, refreshToken });
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client(config);
      return response.data.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  // Authentication methods
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>({
      method: 'POST',
      url: '/auth/register',
      data,
    });

    this.saveTokensToStorage({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    return response;
  }

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>({
      method: 'POST',
      url: '/auth/login',
      data,
    });

    this.saveTokensToStorage({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.request({
        method: 'POST',
        url: '/auth/logout',
      });
    } finally {
      this.clearTokens();
    }
  }

  async getProfile(): Promise<User> {
    return this.request<User>({
      method: 'GET',
      url: '/auth/profile',
    });
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    return this.request({
      method: 'PATCH',
      url: '/auth/change-password',
      data,
    });
  }

  // Survey methods
  async getSurveys(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<any>> {
    return this.request<PaginatedResponse<any>>({
      method: 'GET',
      url: '/surveys',
      params,
    });
  }

  async getSurvey(id: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/surveys/${id}`,
    });
  }

  async createSurvey(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/surveys',
      data,
    });
  }

  async updateSurvey(id: string, data: any): Promise<any> {
    return this.request({
      method: 'PATCH',
      url: `/surveys/${id}`,
      data,
    });
  }

  async deleteSurvey(id: string): Promise<void> {
    return this.request({
      method: 'DELETE',
      url: `/surveys/${id}`,
    });
  }

  async publishSurvey(id: string): Promise<any> {
    return this.request({
      method: 'PATCH',
      url: `/surveys/${id}/publish`,
    });
  }

  async closeSurvey(id: string): Promise<any> {
    return this.request({
      method: 'PATCH',
      url: `/surveys/${id}/close`,
    });
  }

  // Response methods
  async getResponses(surveyId: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<any>> {
    return this.request<PaginatedResponse<any>>({
      method: 'GET',
      url: `/responses/survey/${surveyId}`,
      params,
    });
  }

  async submitResponse(data: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/responses',
      data,
    });
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
