import fetchApi from './client';

export type TUser = {
  email: string;
  name: string;
};

export type TTokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type TTokenRequest = {
  token: string;
};

export type TUserResponse = {
  user: TUser;
};

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TLoginRequest = Pick<TRegisterRequest, 'email' | 'password'>;

export type TLogoutRequest = TTokenRequest;

export type TRefreshTokenRequest = TTokenRequest;

export type TRegisterResponse = TTokenPair & TUserResponse;

export type TLoginResponse = TTokenPair &
  TUserResponse & {
    email: string;
    name: string;
  };

export type TRefreshTokenResponse = TTokenPair;

export type TLogoutResponse = {
  message: string;
};

export type TEditUserProfileResponse = TUserResponse;

export type TGetUserResponse = TUserResponse;

export type TEditUserProfileRequest = Partial<TRegisterRequest>;

export async function register(data: TRegisterRequest): Promise<TRegisterResponse> {
  return await fetchApi<TRegisterResponse>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function login(data: TLoginRequest): Promise<TLoginResponse> {
  return await fetchApi<TLoginResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function logout(data: TLogoutRequest): Promise<TLogoutResponse> {
  return await fetchApi<TLogoutResponse>('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function refreshToken(
  data: TRefreshTokenRequest
): Promise<TRefreshTokenResponse> {
  return await fetchApi<TRefreshTokenResponse>('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function getUser(): Promise<TGetUserResponse> {
  return await fetchApi<TGetUserResponse>('/auth/user', {
    method: 'GET',
  });
}

export async function editUserProfile(
  data: TEditUserProfileRequest
): Promise<TEditUserProfileResponse> {
  return await fetchApi<TEditUserProfileResponse>('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
