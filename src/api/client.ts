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
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${BASE_API_URL}${url}`, options);

    let result: unknown;
    try {
      result = await response.json();
    } catch (_jsonError) {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
      }
      throw new Error('Failed to parse response as JSON');
    }

    if (!response.ok) {
      const errorMessage =
        result &&
        typeof result === 'object' &&
        'message' in result &&
        typeof result.message === 'string'
          ? result.message
          : `HTTP error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const apiResult = result as ApiResponse<T> | ApiErrorResponse;

    if (!apiResult.success) {
      const errorMessage =
        'message' in apiResult && apiResult.message
          ? apiResult.message
          : 'API returned success: false';
      throw new Error(errorMessage);
    }

    const { success: _success, ...rest } = apiResult;

    return rest as T;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`API error: ${errorMessage}`);
    throw error;
  }
}
