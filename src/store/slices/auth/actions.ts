import {
  register,
  login,
  getUser,
  type LoginRequest,
  type RegisterRequest,
  refreshToken,
  type GetUserResponse,
  logout,
  editUserProfile,
  type EditUserProfileResponse,
  type EditUserProfileRequest,
} from '@/api/auth';
import { createAuthenticatedThunk } from '@/utils/create-authenticated-thunk';
import { tokenStorage } from '@/utils/token-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from '@/store';

let refreshPromise: Promise<{ accessToken: string; refreshToken: string }> | null = null;

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: RegisterRequest) => {
    return await register(payload);
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest) => {
    return await login(payload);
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
        const result = await refreshToken({ token: refreshTokenValue });
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

export const getUserThunk = createAuthenticatedThunk<GetUserResponse, void>(
  'auth/getUser',
  getUser
);

export const checkUserAuthThunk = createAsyncThunk<
  GetUserResponse | null,
  void,
  { state: RootState; dispatch: AppDispatch }
>('auth/checkUserAuth', async (_, { dispatch }) => {
  const refreshTokenValue = tokenStorage.getRefreshToken();

  if (!refreshTokenValue) {
    return null;
  }

  try {
    await dispatch(refreshTokenThunk()).unwrap();
    const userData = await dispatch(getUserThunk()).unwrap();
    return userData;
  } catch {
    return null;
  }
});

export const logoutThunk = createAsyncThunk<void, void>('auth/logout', async () => {
  const refreshTokenValue = tokenStorage.getRefreshToken();

  if (refreshTokenValue) {
    try {
      await logout({ token: refreshTokenValue });
    } catch {
      return;
    }
  }
});

export const editUserProfileThunk = createAuthenticatedThunk<
  EditUserProfileResponse,
  EditUserProfileRequest
>('auth/editUser', editUserProfile);
