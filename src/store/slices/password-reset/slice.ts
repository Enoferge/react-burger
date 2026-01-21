import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { requestPasswordResetThunk, confirmPasswordResetThunk } from './actions';

type PasswordResetState = {
  isLoading: boolean;
  error: string | null;
  resetRequestSuccess: boolean;
  resetConfirmSuccess: boolean;
  message: string | null;
};

const initialState: PasswordResetState = {
  isLoading: false,
  error: null,
  resetRequestSuccess: false,
  resetConfirmSuccess: false,
  message: null,
};

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    resetState: (state) => {
      state.resetRequestSuccess = false;
      state.resetConfirmSuccess = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestPasswordResetThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.resetRequestSuccess = false;
    });
    builder.addCase(
      requestPasswordResetThunk.fulfilled,
      (state, action: PayloadAction<{ message: string }>) => {
        state.isLoading = false;
        state.resetRequestSuccess = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(requestPasswordResetThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to request password reset';
      state.resetRequestSuccess = false;
    });

    builder.addCase(confirmPasswordResetThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.resetConfirmSuccess = false;
    });
    builder.addCase(
      confirmPasswordResetThunk.fulfilled,
      (state, action: PayloadAction<{ message: string }>) => {
        state.isLoading = false;
        state.resetConfirmSuccess = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(confirmPasswordResetThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to confirm password reset';
      state.resetConfirmSuccess = false;
    });
  },
});

export const { resetState } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;
