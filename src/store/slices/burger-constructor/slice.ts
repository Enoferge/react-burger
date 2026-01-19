import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

export type TConstructorIngredient = TIngredient & {
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
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push({ ...action.payload });
      },
      prepare: (ingredient: TIngredient) => {
        const uniqueId = crypto.randomUUID();
        return { payload: { ...ingredient, uniqueId } };
      },
    },
    removeIngredient: (
      state,
      action: PayloadAction<{ uniqueId: TConstructorIngredient['uniqueId'] }>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId !== action.payload.uniqueId
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];

      const newIngredients = [...state.ingredients];

      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, draggedItem);
      state.ingredients = newIngredients;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
