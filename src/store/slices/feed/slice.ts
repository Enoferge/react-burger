import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TOrder = {
  ingredients: TIngredient['_id'][];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

type TFeedState = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  success: true,
  orders: [
    {
      ingredients: [
        '60d3463f7034a000269f45e7',
        '60d3463f7034a000269f45e9',
        '60d3463f7034a000269f45e8',
        '60d3463f7034a000269f45ea',
      ],
      _id: '034533',
      status: 'done',
      number: 0,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3463f7034a000269f45e7',
        '60d3463f7034a000269f45e9',
        '60d3463f7034a000269f45e8',
        '60d3463f7034a000269f45ea',
      ],
      _id: '034532',
      status: 'done',
      number: 0,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      ingredients: [
        '60d3463f7034a000269f45e7',
        '60d3463f7034a000269f45e9',
        '60d3463f7034a000269f45e8',
        '60d3463f7034a000269f45ea',
      ],
      _id: '034538',
      status: 'in_progress',
      number: 0,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
  ],
  total: 28752,
  totalToday: 138,
};

const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
});

export default feedSlice.reducer;
