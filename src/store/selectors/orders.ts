import { createSelector } from '@reduxjs/toolkit';

import type { TRootState } from '..';
import type { TOrderInformation } from '../slices/order/slice';
import type { TFeedOrder, TOrdersData } from '../types';
import type { TIngredient } from '@/utils/types';

export type TEnrichedIngredient = TIngredient & {
  count: number;
};

export type TEnrichedOrder = TFeedOrder & {
  ingredientsWithDetails: TEnrichedIngredient[];
  totalPrice: number;
};

const countByIngredientId = (ids: string[]): Map<string, number> =>
  ids.reduce((acc, id) => {
    acc.set(id, (acc.get(id) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

const enrichOrder = (
  order: TFeedOrder | TOrderInformation,
  ingredients: TIngredient[]
): TEnrichedOrder => {
  const itemsMap = new Map(ingredients.map((i) => [i._id, i]));
  const countById = countByIngredientId(order.ingredients);

  const ingredientsWithDetails: TEnrichedIngredient[] = Array.from(countById.entries())
    .map(([id, count]) => {
      const ingredient = itemsMap.get(id);
      return ingredient ? { ...ingredient, count } : null;
    })
    .filter((ing): ing is TEnrichedIngredient => ing != null);

  const totalPrice = ingredientsWithDetails.reduce(
    (sum, i) => sum + i.price * i.count,
    0
  );

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

export const selectProfileOrdersWithDetails = createSelector(
  [
    (state: TRootState): TOrdersData => state.profileHistory.data,
    (state: TRootState): TIngredient[] => state.ingredients.ingredients,
  ],
  (profileData, ingredients): TEnrichedOrder[] => {
    if (!profileData?.orders) {
      return [];
    }

    return profileData.orders.map((order) => enrichOrder(order, ingredients));
  }
);

export const selectOrderWithDetails = createSelector(
  [
    (state: TRootState): TEnrichedOrder[] => selectFeedOrdersWithDetails(state),
    (state: TRootState): TEnrichedOrder[] => selectProfileOrdersWithDetails(state),
    (state: TRootState): TOrderInformation | null => state.order.orderDetails,
    (state: TRootState): TIngredient[] => state.ingredients.ingredients,
    (_state: TRootState, number?: string): string | undefined => number,
  ],
  (
    feedOrders,
    profileOrders,
    orderDetails,
    ingredients,
    number
  ): TEnrichedOrder | null => {
    if (!number) {
      return null;
    }

    const fromFeed = feedOrders.find((o) => String(o.number) === number);

    if (fromFeed) {
      return fromFeed;
    }

    const fromProfile = profileOrders.find((o) => String(o.number) === number);

    if (fromProfile) {
      return fromProfile;
    }

    if (orderDetails && String(orderDetails.number) === number) {
      return enrichOrder(orderDetails, ingredients);
    }

    return null;
  }
);
