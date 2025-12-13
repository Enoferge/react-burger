import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TOrder = {
  number: number | null;
  name: string | null;
};

type State = {
  order: TOrder | null;
  isCreating: boolean;
};

const initialState: State = {
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
});

export const { setOrder, setIsCreating, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
