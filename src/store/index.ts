import {
  combineSlices,
  configureStore,
  type ThunkDispatch,
  type UnknownAction,
} from '@reduxjs/toolkit';

import { socketMiddleware } from './middleware/socket-middleware';
import authReducer from './slices/auth/slice';
import burgerConstructorReducer from './slices/burger-constructor/slice';
import { wsConnect, wsDisconnect } from './slices/feed/actions';
import feedReducer, {
  onConnecting,
  onClose,
  onOpen,
  onError,
  onMessage,
} from './slices/feed/slice';
import ingredientsReducer from './slices/ingredients/slice';
import orderReducer from './slices/order/slice';
import passwordResetReducer from './slices/password-reset/slice';

const rootReducer = combineSlices({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  passwordReset: passwordResetReducer,
  auth: authReducer,
  feed: feedReducer,
});

const feedModdleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: onConnecting,
  onOpen: onOpen,
  onClose: onClose,
  onError: onError,
  onMessage: onMessage,
});

// TODO: addprofileMiddleware = socketMiddleware

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedModdleware),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = ThunkDispatch<TRootState, unknown, UnknownAction>;
