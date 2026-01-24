import { requestPasswordReset, confirmPasswordReset } from '@/api/password-reset';
import { createAsyncThunk } from '@reduxjs/toolkit';

type RequestPasswordResetPayload = {
  email: string;
};

type ConfirmPasswordResetPayload = {
  password: string;
  token: string;
};

export const requestPasswordResetThunk = createAsyncThunk(
  'passwordReset/request',
  async (payload: RequestPasswordResetPayload) => {
    return await requestPasswordReset(payload.email);
  }
);

export const confirmPasswordResetThunk = createAsyncThunk(
  'passwordReset/confirm',
  async (payload: ConfirmPasswordResetPayload) => {
    return await confirmPasswordReset(payload.password, payload.token);
  }
);
