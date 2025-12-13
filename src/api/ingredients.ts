import fetchApi from './client';

import type { TIngredient } from '@/utils/types';

export async function fetchIngredients(): Promise<TIngredient[]> {
  return fetchApi('/ingredients');
}
