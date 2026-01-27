import { requestPasswordReset, confirmPasswordReset } from '@/api/password-reset';
import { createAsyncThunk } from '@reduxjs/toolkit';

type TRequestPasswordResetPayload = {
  email: string;
};

type TConfirmPasswordResetPayload = {
  password: string;
  token: string;
};

export const requestPasswordResetThunk = createAsyncThunk(
  'passwordReset/request',
  async (payload: TRequestPasswordResetPayload) => {
    return await requestPasswordReset(payload.email);
  }
);

export const confirmPasswordResetThunk = createAsyncThunk(
  'passwordReset/confirm',
  async (payload: TConfirmPasswordResetPayload) => {
    return await confirmPasswordReset(payload.password, payload.token);
  }
);
