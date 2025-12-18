import fetchApi from './client';

import type { TIngredient } from '@/utils/types';

export async function fetchIngredients(): Promise<TIngredient[]> {
  const { data } = await fetchApi<{ data: TIngredient[] }>('/ingredients');
  return data;
}
