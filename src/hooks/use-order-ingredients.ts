import { useMemo } from 'react';

import type { TOrder } from '@/contexts/order-context';
import type { TIngredient } from '@/utils/types';

type TOrderIngredientsProps = {
  ingredients: TIngredient[];
  order: TOrder;
};

type OrderIngredientsInfo = {
  innerIngredients: TIngredient[];
  bunIngredient: TIngredient | null;
  totalPrice: number;
};

export const useOrderIngredients = ({
  ingredients,
  order,
}: TOrderIngredientsProps): OrderIngredientsInfo => {
  const orderIngredients = useMemo(() => {
    return Object.entries(order).reduce<OrderIngredientsInfo>(
      (acc, [id, count]) => {
        const ingredient = ingredients.find((ingredient) => ingredient._id === id);
        if (!ingredient) {
          return acc;
        }

        acc.totalPrice += ingredient.price * count;

        if (ingredient.type === 'bun') {
          acc.bunIngredient = ingredient;
          return acc;
        }

        for (let i = 0; i < count; i++) {
          acc.innerIngredients.push(ingredient);
        }

        return acc;
      },
      {
        innerIngredients: [],
        bunIngredient: null,
        totalPrice: 0,
      } satisfies OrderIngredientsInfo
    );
  }, [ingredients, order]);

  return orderIngredients;
};
