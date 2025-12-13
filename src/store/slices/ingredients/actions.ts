import { fetchIngredients } from '@/api/ingredients';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const data = await fetchIngredients();
    return data;
  }
);
