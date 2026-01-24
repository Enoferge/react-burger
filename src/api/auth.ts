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
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
  email: string;
  name: string;
};

export type RefreshTokenRequest = {
  token: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
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

export async function refreshToken(
  data: RefreshTokenRequest
): Promise<RefreshTokenResponse> {
  return await fetchApi<RefreshTokenResponse>('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
