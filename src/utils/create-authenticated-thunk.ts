import { tokenContext } from '@/api/token-context';
import { refreshTokenThunk } from '@/store/slices/auth/actions';
import { clearAuth } from '@/store/slices/auth/slice';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestWithTokenRefresh } from './request-with-token-refresh';

import type { TAppDispatch, TRootState } from '@/store';
import type { AsyncThunk } from '@reduxjs/toolkit';

export function createAuthenticatedThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  apiFn: (arg: ThunkArg) => Promise<Returned>
): AsyncThunk<Returned, ThunkArg, { state: TRootState; dispatch: TAppDispatch }> {
  return createAsyncThunk<
    Returned,
    ThunkArg,
    { state: TRootState; dispatch: TAppDispatch }
  >(typePrefix, async (arg, { getState, dispatch }) => {
    return await requestWithTokenRefresh<Returned>(
      (accessToken) => {
        tokenContext.set(accessToken);
        try {
          return apiFn(arg);
        } finally {
          tokenContext.clear();
        }
      },
      getState,
      dispatch,
      refreshTokenThunk,
      clearAuth
    );
  });
}
