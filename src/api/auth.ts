import fetchApi from './client';

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type User = {
  email: string;
  name: string;
};

export type RegisterResponse = {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: true;
  accessToken: string;
  refreshToken: string;
  user: User;
  email: string;
  name: string;
};

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  return await fetchApi<RegisterResponse>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return await fetchApi<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
