// User types

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Error types
export interface ApiError {
  message: string;
  code: string;
  status: number;
} 