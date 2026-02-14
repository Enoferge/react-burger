import { WebsocketStatus, type TWebsocketStatus } from '@/store/middleware/types';
import { createSlice, type PayloadAction, type Slice } from '@reduxjs/toolkit';

import type { TOrdersData } from '@/store/types/feed-order';

const emptyOrdersData: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0,
};

type TWebSocketOrdersState = {
  status: TWebsocketStatus;
  success: boolean;
  error?: string;
  data: TOrdersData;
};

export const createWebSocketOrdersSlice = (
  name: string
): Slice<TWebSocketOrdersState> => {
  const initialState: TWebSocketOrdersState = {
    status: WebsocketStatus.OFFLINE,
    success: true,
    data: emptyOrdersData,
  } as TWebSocketOrdersState;

  return createSlice({
    name,
    initialState,
    reducers: {
      onConnecting: (state) => {
        state.status = WebsocketStatus.CONNECTING;
      },
      onOpen: (state) => {
        state.status = WebsocketStatus.ONLINE;
      },
      onClose: (state) => {
        state.status = WebsocketStatus.OFFLINE;
      },
      onError: (state, action: PayloadAction<string>) => {
        state.success = false;
        state.error = action.payload;
        state.data = emptyOrdersData;
      },
      onMessage: (state, action: PayloadAction<TOrdersData>) => {
        state.success = false;
        const data = { ...action.payload };
        data.orders.map((order) => {
          // const totalPrices = order.
          return { ...order };
        });
        state.data = action.payload;
      },
    },
  });
};
