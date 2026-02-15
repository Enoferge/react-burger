import type { TIngredient } from '@/utils/types';

export type TFeedOrder = {
  ingredients: TIngredient['_id'][];
  _id: string;
  status: 'created' | 'pending' | 'done' | 'cancelled';
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TOrdersData = {
  orders: TFeedOrder[];
  total: number;
  totalToday: number;
};
