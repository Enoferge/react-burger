import { useAppSelector } from './use-redux-hooks';

import type { TIngredient } from '@/utils/types';

export const useIngredientCount = (ingredientId: TIngredient['_id']): number => {
  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);

  if (bun?._id === ingredientId) {
    return 2;
  }

  return ingredients.filter((ingredient) => ingredient._id === ingredientId).length;
};
