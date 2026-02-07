import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth/slice';
import burgerConstructorReducer from './slices/burger-constructor/slice';
import feedReducer from './slices/feed/slice';
import ingredientsReducer from './slices/ingredients/slice';
import orderReducer from './slices/order/slice';
import passwordResetReducer from './slices/password-reset/slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    passwordReset: passwordResetReducer,
    auth: authReducer,
    feed: feedReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
