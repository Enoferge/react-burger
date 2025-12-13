import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TConstructorIngredient = TIngredient & {
  uniqueId: string;
};

type State = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: State = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const uniqueId = crypto.randomUUID();
      state.ingredients.push({ ...action.payload, uniqueId });
    },
    removeIngredient: (
      state,
      action: PayloadAction<{ uniqueId: TConstructorIngredient['uniqueId'] }>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId !== action.payload.uniqueId
      );
    },
  },
});

export const { setBun, addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
