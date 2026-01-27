import fetchApi from './client';

type TPasswordResetRequest = {
  email: string;
};

type TPasswordResetResponse = {
  message: string;
};

type TPasswordResetConfirmRequest = {
  password: string;
  token: string;
};

type TPasswordResetConfirmResponse = {
  message: string;
};

export async function requestPasswordReset(
  email: string
): Promise<TPasswordResetResponse> {
  const body: TPasswordResetRequest = { email };
  return await fetchApi<TPasswordResetResponse>('/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function confirmPasswordReset(
  password: string,
  token: string
): Promise<TPasswordResetConfirmResponse> {
  const body: TPasswordResetConfirmRequest = { password, token };
  return await fetchApi<TPasswordResetConfirmResponse>('/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
