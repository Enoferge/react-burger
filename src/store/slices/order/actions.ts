import { createOrder, type TCreateOrderResponse } from '@/api/order';
import { createAuthenticatedThunk } from '@/utils/create-authenticated-thunk';

import type { TIngredient } from '@/utils/types';

export const createOrderThunk = createAuthenticatedThunk<
  TCreateOrderResponse,
  TIngredient['_id'][]
>('order/createOrder', (ingredientIds, accessToken) =>
  createOrder(ingredientIds, accessToken)
);
