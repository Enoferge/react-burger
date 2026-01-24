import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { registerThunk } from './actions';

type User = {
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  registerSuccess: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  registerSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.registerSuccess = false;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.registerSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.registerSuccess = false;
    });
    builder.addCase(
      registerThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          user: User;
          accessToken: string;
          refreshToken: string;
        }>
      ) => {
        state.isLoading = false;
        state.registerSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }
    );
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to register';
      state.registerSuccess = false;
    });
  },
});

export const { resetAuthState, clearAuth } = authSlice.actions;
export default authSlice.reducer;
