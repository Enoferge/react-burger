import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchIngredientsThunk } from './actions';

import type { TIngredient } from '@/utils/types';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredientsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchIngredientsThunk.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      }
    );
    builder.addCase(fetchIngredientsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to fetch ingredients';
    });
  },
});

export default ingredientsSlice.reducer;
