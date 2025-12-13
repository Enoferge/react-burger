import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createOrderThunk } from './actions';

import type { TCreateOrderResponse } from '@/api/order';

export type TOrder = {
  number: number | null;
};

export type TOrderSliceState = {
  name: string | null;
  order: TOrder | null;
  isCreating: boolean;
};

const initialState: TOrderSliceState = {
  name: null,
  order: null,
  isCreating: false,
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
      );
  },
});

export const { setOrder, setIsCreating, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
