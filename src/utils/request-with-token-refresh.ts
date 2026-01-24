import { HttpError } from './http-error';

import type { RefreshTokenResponse } from '@/api/auth';
import type { AppDispatch, RootState } from '@/store';
import type { AsyncThunk } from '@reduxjs/toolkit';

export async function requestWithTokenRefresh<T>(
  requestFn: (accessToken: string | null) => Promise<T>,
  getState: () => RootState,
  dispatch: AppDispatch,
  refreshTokenThunk: AsyncThunk<RefreshTokenResponse, void, Record<string, never>>,
  clearAuthAction: () => { type: string }
): Promise<T> {
  const state = getState();
  const accessToken = state.auth.accessToken;

  try {
    return await requestFn(accessToken);
  } catch (error) {
    if (!(error instanceof HttpError && error.status === 401)) {
      throw error;
    }

    if (!state.auth.refreshToken) {
      dispatch(clearAuthAction());
      throw new Error('Session expired. Please login again.');
    }

    try {
      const refreshResult = await dispatch(refreshTokenThunk()).unwrap();
      return await requestFn(refreshResult.accessToken);
    } catch (_refreshError) {
      dispatch(clearAuthAction());
      throw new Error('Session expired. Please login again.');
    }
  }
}
