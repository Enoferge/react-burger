import { HttpError } from '@/utils/http-error';

export const BASE_API_URL = 'https://norma.education-services.ru/api';

type ApiResponse<T> = {
  success: boolean;
} & T;

type ApiErrorResponse = {
  success: false;
  message?: string;
};

export default async function fetchApi<T>(
  url: string,
  options?: RequestInit,
  accessToken?: string | null
): Promise<T> {
  const headers = new Headers(options?.headers);

  if (accessToken) {
    headers.set('authorization', accessToken);
  }

  const response = await fetch(`${BASE_API_URL}${url}`, {
    ...options,
    headers,
  });

  let result: unknown;
  try {
    result = await response.json();
  } catch (_jsonError) {
    if (!response.ok) {
      throw new HttpError(
        `HTTP error: ${response.status} ${response.statusText}`,
        response.status,
        response.statusText
      );
    }
    throw new HttpError('Failed to parse response as JSON', response.status);
  }

  if (!response.ok) {
    const errorMessage =
      result &&
      typeof result === 'object' &&
      'message' in result &&
      typeof result.message === 'string'
        ? result.message
        : `HTTP error: ${response.status} ${response.statusText}`;
    throw new HttpError(errorMessage, response.status, response.statusText);
  }

  const apiResult = result as ApiResponse<T> | ApiErrorResponse;

  if (!apiResult.success) {
    const errorMessage =
      'message' in apiResult && apiResult.message
        ? apiResult.message
        : 'API returned success: false';
    throw new HttpError(errorMessage, response.status);
  }

  const { success: _success, ...rest } = apiResult;

  return rest as T;
}
