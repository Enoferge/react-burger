import { configureStore } from '@reduxjs/toolkit';

import burgerConstructorReducer from './slices/burger-constructor/slice';
import ingredientsReducer from './slices/ingredients/slice';
import orderReducer from './slices/order/slice';
import selectedIngredientReducer from './slices/selected-ingredient/slice';

export const store = configureStore({
  reducer: {
    selectedIngredient: selectedIngredientReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
