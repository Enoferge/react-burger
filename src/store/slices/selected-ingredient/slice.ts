import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

const initialState: { selectedIngredient: TIngredient | null } = {
  selectedIngredient: null,
};

const selectedIngredientSlice = createSlice({
  name: 'selectedIngredientSlice',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<TIngredient | null>) => {
      state.selectedIngredient = action.payload;
    },
    clearSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { setSelectedIngredient, clearSelectedIngredient } =
  selectedIngredientSlice.actions;
export default selectedIngredientSlice.reducer;
