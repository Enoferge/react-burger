import fetchApi from './client';

import type { TIngredient } from '@/utils/types';

export async function fetchIngredients(
  accessToken?: string | null
): Promise<TIngredient[]> {
  const { data } = await fetchApi<{ data: TIngredient[] }>(
    '/ingredients',
    undefined,
    accessToken
  );
  return data;
}
