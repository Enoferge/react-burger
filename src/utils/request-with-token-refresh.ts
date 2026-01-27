import { tokenStorage } from '@/utils/token-storage';

import { HttpError } from './http-error';

import type { TRefreshTokenResponse } from '@/api/auth';
import type { TAppDispatch, TRootState } from '@/store';
import type { AsyncThunk } from '@reduxjs/toolkit';

const ERROR_MSG = 'Session expired. Please login again.';

export async function requestWithTokenRefresh<T>(
  requestFn: (accessToken: string | null) => Promise<T>,
  getState: () => TRootState,
  dispatch: TAppDispatch,
  refreshTokenThunk: AsyncThunk<TRefreshTokenResponse, void, Record<string, never>>,
  clearAuthAction: () => { type: string }
): Promise<T> {
  const state = getState();
  const accessToken = state.auth.accessToken;

  const expireAction = (): never => {
    tokenStorage.removeRefreshToken();
    dispatch(clearAuthAction());
    throw new Error(ERROR_MSG);
  };

  try {
    return await requestFn(accessToken);
  } catch (error) {
    if (!(error instanceof HttpError && error.status === 401)) {
      throw error;
    }

    if (!state.auth.refreshToken) {
      return expireAction();
    }

    try {
      const refreshResult = await dispatch(refreshTokenThunk()).unwrap();
      return await requestFn(refreshResult.accessToken);
    } catch (_refreshError) {
      return expireAction();
    }
  }
}
