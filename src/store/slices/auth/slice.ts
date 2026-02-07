import { tokenStorage } from '@/utils/token-storage';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  checkUserAuthThunk,
  editUserProfileThunk,
  getUserThunk,
  loginThunk,
  logoutThunk,
  refreshTokenThunk,
  registerThunk,
} from './actions';

import type {
  TEditUserProfileResponse,
  TGetUserResponse,
  TLoginResponse,
  TRefreshTokenResponse,
  TRegisterResponse,
  TUser,
} from '@/api/auth';

type TAuthState = {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  authSuccess: boolean;
  isAuthChecked: boolean;
  isEditInProgress: boolean;
  editError: string | null;
};

const savedRefreshToken = tokenStorage.getRefreshToken();

const initialState: TAuthState = {
  user: null,
  accessToken: null,
  refreshToken: savedRefreshToken,
  isLoading: false,
  error: null,
  authSuccess: false,
  isAuthChecked: false,
  isEditInProgress: false,
  editError: null,
};

const clearAuthReducer = (state: TAuthState): void => {
  state.user = null;
  state.accessToken = null;
  state.refreshToken = null;
  state.authSuccess = false;
  state.error = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.authSuccess = false;
      state.error = null;
    },
    clearAuth: clearAuthReducer,
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
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
        {
          payload: { accessToken, refreshToken, user },
        }: PayloadAction<TRegisterResponse>
      ) => {
        state.isLoading = false;
        state.authSuccess = true;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
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
        { payload: { accessToken, refreshToken, user } }: PayloadAction<TLoginResponse>
      ) => {
        state.isLoading = false;
        state.error = null;
        state.authSuccess = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.user = user;
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
        { payload: { accessToken, refreshToken } }: PayloadAction<TRefreshTokenResponse>
      ) => {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }
    );

    builder.addCase(
      getUserThunk.fulfilled,
      (state, { payload: { user } }: PayloadAction<TGetUserResponse>) => {
        state.user = user;
      }
    );

    builder.addCase(checkUserAuthThunk.pending, (state) => {
      state.isAuthChecked = false;
    });
    builder.addCase(checkUserAuthThunk.fulfilled, (state) => {
      state.isAuthChecked = true;
    });
    builder.addCase(checkUserAuthThunk.rejected, (state) => {
      state.isAuthChecked = true;
    });

    builder.addCase(logoutThunk.fulfilled, clearAuthReducer);
    builder.addCase(logoutThunk.rejected, clearAuthReducer);

    builder.addCase(editUserProfileThunk.pending, (state) => {
      state.isEditInProgress = true;
      state.editError = null;
    });
    builder.addCase(
      editUserProfileThunk.fulfilled,
      (state, { payload }: PayloadAction<TEditUserProfileResponse>) => {
        state.user = payload.user;
        state.isEditInProgress = false;
        state.editError = null;
      }
    );
    builder.addCase(editUserProfileThunk.rejected, (state, { error }) => {
      state.isEditInProgress = false;
      state.editError = error?.message ?? 'Failed to edit user profile';
    });
  },
});

export const { resetAuthState, clearAuth } = authSlice.actions;
export default authSlice.reducer;
