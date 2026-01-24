import fetchApi from './client';

type PasswordResetRequest = {
  email: string;
};

type PasswordResetResponse = {
  message: string;
};

type PasswordResetConfirmRequest = {
  password: string;
  token: string;
};

type PasswordResetConfirmResponse = {
  message: string;
};

export async function requestPasswordReset(
  email: string,
  accessToken?: string | null
): Promise<PasswordResetResponse> {
  const body: PasswordResetRequest = { email };
  return await fetchApi<PasswordResetResponse>(
    '/password-reset',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
    accessToken
  );
}

export async function confirmPasswordReset(
  password: string,
  token: string,
  accessToken?: string | null
): Promise<PasswordResetConfirmResponse> {
  const body: PasswordResetConfirmRequest = { password, token };
  return await fetchApi<PasswordResetConfirmResponse>(
    '/password-reset/reset',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
    accessToken
  );
}
