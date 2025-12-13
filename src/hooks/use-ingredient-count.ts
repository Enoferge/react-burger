import { useSelector } from 'react-redux';

import type { RootState } from '@/store';
import type { TIngredient } from '@/utils/types';

export const useIngredientCount = (ingredientId: TIngredient['_id']): number => {
  const { bun, ingredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  if (bun?._id === ingredientId) {
    return 2;
  }

  return ingredients.filter((ingredient) => ingredient._id === ingredientId).length;
};
