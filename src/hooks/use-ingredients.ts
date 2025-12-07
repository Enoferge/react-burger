import { fetchIngredients } from '@/api/ingredients';
import { useCallback, useState } from 'react';

import type { TIngredient } from '@/utils/types';

type TUseIngredientsResult = {
  ingredients: TIngredient[];
  isLoading: boolean;
  getIngredients: () => Promise<void>;
};

export const useIngredients = (): TUseIngredientsResult => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIngredients = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await fetchIngredients();
      setIngredients(data);
    } catch (error) {
      console.error('Failed to fetch ingredients from API, using fallback data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    ingredients,
    isLoading,
    getIngredients,
  };
};
