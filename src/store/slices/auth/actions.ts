import { register } from '@/api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload) => {
    return await register(payload);
  }
);
