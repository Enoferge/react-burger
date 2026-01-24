import { tokenStorage } from '@/utils/token-storage';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { loginThunk, refreshTokenThunk, registerThunk } from './actions';

import type {
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
  User,
} from '@/api/auth';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  authSuccess: boolean;
};

const savedRefreshToken = tokenStorage.getRefreshToken();

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: savedRefreshToken,
  isLoading: false,
  error: null,
  authSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.authSuccess = false;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.authSuccess = false;
      state.error = null;
      tokenStorage.removeRefreshToken();
    },
    updateTokens: (
      state,
      {
        payload: { accessToken, refreshToken },
      }: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      tokenStorage.setRefreshToken(refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.authSuccess = false;
    });
    builder.addCase(
      registerThunk.fulfilled,
      (
        state,
        { payload: { accessToken, refreshToken, user } }: PayloadAction<RegisterResponse>
      ) => {
        state.isLoading = false;
        state.authSuccess = true;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        tokenStorage.setRefreshToken(refreshToken);
      }
    );
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to register';
      state.authSuccess = false;
    });

    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.authSuccess = false;
    });
    builder.addCase(
      loginThunk.fulfilled,
      (
        state,
        { payload: { accessToken, refreshToken, user } }: PayloadAction<LoginResponse>
      ) => {
        state.isLoading = false;
        state.error = null;
        state.authSuccess = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.user = user;
        tokenStorage.setRefreshToken(refreshToken);
      }
    );
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to login';
      state.authSuccess = false;
    });
    builder.addCase(
      refreshTokenThunk.fulfilled,
      (
        state,
        { payload: { accessToken, refreshToken } }: PayloadAction<RefreshTokenResponse>
      ) => {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        tokenStorage.setRefreshToken(refreshToken);
      }
    );
  },
});

export const { resetAuthState, clearAuth, updateTokens } = authSlice.actions;
export default authSlice.reducer;
