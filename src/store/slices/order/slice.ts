import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createOrderThunk, getOrderByNumberThunk } from './actions';

import type { TCreateOrderResponse, TGetOrderResponse } from '@/api/order';
import type { TFeedOrder } from '@/store/types';

export type TOrder = {
  number: number | null;
};

export type TOrderInformation = TFeedOrder & {
  owner: string;
};

export type TOrderSliceState = {
  name: string | null;
  order: TOrder | null;
  isCreating: boolean;
  isOrderDetailsLoading: boolean;
  orderDetails: TOrderInformation | null;
};

const initialState: TOrderSliceState = {
  name: null,
  order: null,
  isCreating: false,
  isOrderDetailsLoading: false,
  orderDetails: null,
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<TOrder>) => {
      state.order = action.payload;
    },
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
      state.isCreating = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createOrderThunk.rejected, (state) => {
        state.isCreating = false;
        state.order = null;
      })
      .addCase(
        createOrderThunk.fulfilled,
        (state, action: PayloadAction<TCreateOrderResponse>) => {
          state.isCreating = false;
          state.order = { number: action.payload.order.number };
          state.name = action.payload.name;
        }
      )
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isOrderDetailsLoading = true;
      })
      .addCase(getOrderByNumberThunk.rejected, (state) => {
        state.isOrderDetailsLoading = false;
        state.orderDetails = null;
      })
      .addCase(
        getOrderByNumberThunk.fulfilled,
        (state, action: PayloadAction<TGetOrderResponse>) => {
          state.isOrderDetailsLoading = false;
          state.orderDetails = action.payload.orders?.[0] ?? null;
        }
      );
  },
});

export const { setOrder, setIsCreating, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
