import { describe, it, expect } from 'vitest';

import { fetchIngredientsThunk } from './actions';
import ingredientsReducer, { initialState } from './slice';

import type { TIngredient } from '@/utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Ingredient',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 10,
    image: '',
    image_large: '',
    image_mobile: '',
    __v: 0,
  },
];

describe('ingredients slice', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchIngredientsThunk.pending', () => {
    const next = ingredientsReducer(
      undefined,
      fetchIngredientsThunk.pending('reqId', undefined)
    );
    expect(next.isLoading).toBe(true);
    expect(next.error).toBe(null);
  });

  it('should handle fetchIngredientsThunk.fulfilled', () => {
    const next = ingredientsReducer(
      undefined,
      fetchIngredientsThunk.fulfilled(mockIngredients, 'reqId', undefined)
    );
    expect(next.isLoading).toBe(false);
    expect(next.ingredients).toEqual(mockIngredients);
  });

  it('should handle fetchIngredientsThunk.rejected', () => {
    const next = ingredientsReducer(
      undefined,
      fetchIngredientsThunk.rejected(new Error('Fetch failed'), 'reqId', undefined)
    );
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe('Fetch failed');
  });
});
