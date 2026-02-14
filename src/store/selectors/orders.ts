import { createSelector } from '@reduxjs/toolkit';

import type { TRootState } from '..';
import type { TFeedOrder, TOrdersData } from '../types';
import type { TIngredient } from '@/utils/types';

export type TEnrichedOrder = TFeedOrder & {
  ingredientsWithDetails: TIngredient[];
  totalPrice: number;
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

    const itemsMap = new Map(ingredients.map((i) => [i._id, i]));

    return feedData.orders.map((order) => {
      const ingredientsWithDetails = order.ingredients
        .map((id) => itemsMap.get(id))
        .filter((ing): ing is TIngredient => ing != null);

      const totalPrice = ingredientsWithDetails.reduce((sum, i) => sum + i.price, 0);

      return {
        ...order,
        ingredientsWithDetails,
        totalPrice,
      };
    });
  }
);
