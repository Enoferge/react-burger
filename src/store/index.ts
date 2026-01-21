import { configureStore } from '@reduxjs/toolkit';

import burgerConstructorReducer from './slices/burger-constructor/slice';
import ingredientsReducer from './slices/ingredients/slice';
import orderReducer from './slices/order/slice';
import passwordResetReducer from './slices/password-reset/slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    passwordReset: passwordResetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
