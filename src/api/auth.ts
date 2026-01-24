import fetchApi from './client';

type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

type User = {
  email: string;
  name: string;
};

type RegisterResponse = {
  user: User;
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
