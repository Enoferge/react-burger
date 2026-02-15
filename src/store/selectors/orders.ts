import { createSelector } from '@reduxjs/toolkit';

import type { TRootState } from '..';
import type { TOrderInformation } from '../slices/order/slice';
import type { TFeedOrder, TOrdersData } from '../types';
import type { TIngredient } from '@/utils/types';

export type TEnrichedOrder = TFeedOrder & {
  ingredientsWithDetails: TIngredient[];
  totalPrice: number;
};

const enrichOrder = (
  order: TFeedOrder | TOrderInformation,
  ingredients: TIngredient[]
): TEnrichedOrder => {
  const itemsMap = new Map(ingredients.map((i) => [i._id, i]));
  const ingredientsWithDetails = order.ingredients
    .map((id) => itemsMap.get(id))
    .filter((ing): ing is TIngredient => ing != null);
  const totalPrice = ingredientsWithDetails.reduce((sum, i) => sum + i.price, 0);

  return {
    ...order,
    ingredientsWithDetails,
    totalPrice,
  };
};

export const selectFeedOrdersWithDetails = createSelector(
  [
    (state: TRootState): TOrdersData => state.feed.data,
    (state: TRootState): TIngredient[] => state.ingredients.ingredients,
  ],
  (feedData, ingredients): TEnrichedOrder[] => {
    if (!feedData?.orders) {
      return [];
    }

    return feedData.orders.map((order) => enrichOrder(order, ingredients));
  }
);

export const selectOrderWithDetails = createSelector(
  [
    (state: TRootState): TEnrichedOrder[] => selectFeedOrdersWithDetails(state),
    (state: TRootState): TOrderInformation | null => state.order.orderDetails,
    (state: TRootState): TIngredient[] => state.ingredients.ingredients,
    (_state: TRootState, number?: string): string | undefined => number,
  ],
  (feedOrders, orderDetails, ingredients, number): TEnrichedOrder | null => {
    if (!number) {
      return null;
    }

    const fromFeed = feedOrders.find((o) => String(o.number) === number);

    if (fromFeed) {
      return fromFeed;
    }

    if (orderDetails && String(orderDetails.number) === number) {
      return enrichOrder(orderDetails, ingredients);
    }

    return null;
  }
);
