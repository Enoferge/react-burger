import {
  register,
  login,
  type LoginRequest,
  type RegisterRequest,
  refreshToken,
} from '@/api/auth';
import { tokenStorage } from '@/utils/token-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

let refreshPromise: Promise<{ accessToken: string; refreshToken: string }> | null = null;

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: RegisterRequest) => {
    return await register(payload, null);
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest) => {
    return await login(payload, null);
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    if (refreshPromise) {
      try {
        return await refreshPromise;
      } catch (error) {
        refreshPromise = null;
        throw error;
      }
    }

    refreshPromise = (async (): Promise<{
      accessToken: string;
      refreshToken: string;
    }> => {
      const refreshTokenValue = tokenStorage.getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      try {
        const result = await refreshToken({ token: refreshTokenValue }, null);
        return result;
      } finally {
        refreshPromise = null;
      }
    })();

    try {
      return await refreshPromise;
    } catch (error) {
      refreshPromise = null;
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to refresh token'
      );
    }
  }
);
