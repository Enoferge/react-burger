import {
  combineSlices,
  configureStore,
  type ThunkDispatch,
  type UnknownAction,
} from '@reduxjs/toolkit';

import { socketMiddleware, type TWSActions } from './middleware/socket-middleware';
import { refreshTokenThunk } from './slices/auth/actions';
import authReducer from './slices/auth/slice';
import burgerConstructorReducer from './slices/burger-constructor/slice';
import { feedWsConnect, feedWsDisconnect } from './slices/feed/actions';
import feedReducer, {
  onConnecting as feedOnConnecting,
  onClose as feedOnClose,
  onOpen as feedOnOpen,
  onError as feedOnError,
  onMessage as feedOnMessage,
} from './slices/feed/slice';
import ingredientsReducer from './slices/ingredients/slice';
import orderReducer from './slices/order/slice';
import passwordResetReducer from './slices/password-reset/slice';
import { profileWsConnect, profileWsDisconnect } from './slices/profile-history/actions';
import profileHistoryReducer, {
  onConnecting as profileOnConnecting,
  onClose as profileOnClose,
  onOpen as profileOnOpen,
  onError as profileOnError,
  onMessage as profileOnMessage,
} from './slices/profile-history/slice';

import type { TOrdersData } from './types';

const rootReducer = combineSlices({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  passwordReset: passwordResetReducer,
  auth: authReducer,
  feed: feedReducer,
  profileHistory: profileHistoryReducer,
});

const feedActions = {
  connect: feedWsConnect,
  disconnect: feedWsDisconnect,
  onConnecting: feedOnConnecting,
  onOpen: feedOnOpen,
  onClose: feedOnClose,
  onError: feedOnError,
  onMessage: feedOnMessage,
};

const feedMiddleware = socketMiddleware(feedActions as TWSActions<TOrdersData>);

const profileActions = {
  connect: profileWsConnect,
  disconnect: profileWsDisconnect,
  onConnecting: profileOnConnecting,
  onOpen: profileOnOpen,
  onClose: profileOnClose,
  onError: profileOnError,
  onMessage: profileOnMessage,
};

const profileHistoryMiddleware = socketMiddleware(
  profileActions as TWSActions<TOrdersData>,
  refreshTokenThunk
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedMiddleware).concat(profileHistoryMiddleware),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = ThunkDispatch<TRootState, unknown, UnknownAction>;
