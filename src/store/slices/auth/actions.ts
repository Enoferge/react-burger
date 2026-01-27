import {
  register,
  login,
  getUser,
  type TLoginRequest,
  type TRegisterRequest,
  refreshToken,
  type TGetUserResponse,
  logout,
  editUserProfile,
  type TEditUserProfileResponse,
  type TEditUserProfileRequest,
} from '@/api/auth';
import { createAuthenticatedThunk } from '@/utils/create-authenticated-thunk';
import { tokenStorage } from '@/utils/token-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TAppDispatch, TRootState } from '@/store';

let refreshPromise: Promise<{ accessToken: string; refreshToken: string }> | null = null;

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: TRegisterRequest) => {
    const result = await register(payload);

    tokenStorage.setRefreshToken(result.refreshToken);

    return result;
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: TLoginRequest) => {
    const result = await login(payload);

    tokenStorage.setRefreshToken(result.refreshToken);

    return result;
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    refreshPromise ??= (async (): Promise<{
      accessToken: string;
      refreshToken: string;
    }> => {
      const refreshTokenValue = tokenStorage.getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      try {
        const result = await refreshToken({ token: refreshTokenValue });
        tokenStorage.setRefreshToken(result.refreshToken);
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

export const getUserThunk = createAuthenticatedThunk<TGetUserResponse, void>(
  'auth/getUser',
  getUser
);

export const checkUserAuthThunk = createAsyncThunk<
  TGetUserResponse | null,
  void,
  { state: TRootState; dispatch: TAppDispatch }
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

  tokenStorage.removeRefreshToken();
});

export const editUserProfileThunk = createAuthenticatedThunk<
  TEditUserProfileResponse,
  TEditUserProfileRequest
>('auth/editUser', editUserProfile);
