import { refreshTokenThunk } from '@/store/slices/auth/actions';
import { clearAuth } from '@/store/slices/auth/slice';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestWithTokenRefresh } from './request-with-token-refresh';

import type { AppDispatch, RootState } from '@/store';
import type { AsyncThunk } from '@reduxjs/toolkit';

export function createAuthenticatedThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  requestFn: (arg: ThunkArg, accessToken: string | null) => Promise<Returned>
): AsyncThunk<Returned, ThunkArg, { state: RootState; dispatch: AppDispatch }> {
  return createAsyncThunk<
    Returned,
    ThunkArg,
    { state: RootState; dispatch: AppDispatch }
  >(typePrefix, async (arg, { getState, dispatch }) => {
    return await requestWithTokenRefresh<Returned>(
      (accessToken) => requestFn(arg, accessToken),
      getState,
      dispatch,
      refreshTokenThunk,
      clearAuth
    );
  });
}
