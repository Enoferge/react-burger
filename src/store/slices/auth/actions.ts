import { register, login, type LoginRequest, type RegisterRequest } from '@/api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: RegisterRequest) => {
    return await register(payload);
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest) => {
    return await login(payload);
  }
);
