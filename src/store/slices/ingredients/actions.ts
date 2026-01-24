import { fetchIngredients } from '@/api/ingredients';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;
    return await fetchIngredients(accessToken);
  }
);
