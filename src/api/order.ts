import fetchApi from './client';

import type { TIngredient } from '@/utils/types';

export type TCreateOrderResponse = {
  name: string;
  order: {
    number: number;
  };
};

export async function createOrder(
  ingredientIds: TIngredient['_id'][]
): Promise<TCreateOrderResponse> {
  return fetchApi('/orders', {
    method: 'POST',
    body: JSON.stringify({ ids: ingredientIds }),
  });
}
