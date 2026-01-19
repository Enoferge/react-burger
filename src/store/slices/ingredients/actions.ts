import { fetchIngredients } from '@/api/ingredients';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  fetchIngredients
);
