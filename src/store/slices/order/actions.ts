import { createOrder } from '@/api/order';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

export const createOrderThunk = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: TIngredient['_id'][]) => {
    const data = await createOrder(ingredientIds);
    return data;
  }
);
