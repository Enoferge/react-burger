import fetchApi from './client';

import type { TOrderInformation } from '@/store/slices/order/slice';
import type { TIngredient } from '@/utils/types';

export type TCreateOrderResponse = {
  name: string;
  order: {
    number: number;
  };
};

export type TGetOrderRequest = {
  number: string;
};

export type TGetOrderResponse = {
  orders: TOrderInformation[];
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

  return response;
}

export async function getOrderByNumber(
  number: TGetOrderRequest['number']
): Promise<TGetOrderResponse> {
  return await fetchApi<TGetOrderResponse>(`/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
