import {
  createOrder,
  getOrderByNumber,
  type TCreateOrderResponse,
  type TGetOrderResponse,
} from '@/api/order';
import { createAuthenticatedThunk } from '@/utils/create-authenticated-thunk';

import type { TIngredient } from '@/utils/types';

export const createOrderThunk = createAuthenticatedThunk<
  TCreateOrderResponse,
  TIngredient['_id'][]
>('order/createOrder', createOrder);

export const getOrderByNumberThunk = createAuthenticatedThunk<TGetOrderResponse, string>(
  'order/getOrderByNumber',
  getOrderByNumber
);
