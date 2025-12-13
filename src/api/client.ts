export const BASE_API_URL = 'https://norma.education-services.ru/api';

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export default async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${BASE_API_URL}${url}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const result = (await response.json()) as ApiResponse<T>;

    if (!result.success) {
      throw new Error('API returned success: false');
    }

    return result.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`API error: ${errorMessage}`);
    throw error;
  }
}
