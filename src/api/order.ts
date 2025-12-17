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
  const response = await fetchApi<TCreateOrderResponse>('/orders', {
    body: JSON.stringify({ ingredients: ingredientIds }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return {
    name: response.name,
    order: response.order,
  };
}
