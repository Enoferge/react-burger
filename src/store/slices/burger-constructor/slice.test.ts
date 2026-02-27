import { describe, it, expect, vi } from 'vitest';

import burgerConstructorReducer, {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from './slice';

import type { TIngredient } from '@/utils/types';

const mockBun: TIngredient = {
  _id: 'bun-1',
  name: 'Bun',
  type: 'bun',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: '',
  __v: 0,
};

const mockMain: TIngredient = {
  _id: 'main-1',
  name: 'Main',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: '',
  __v: 0,
};

const initialState = {
  bun: null,
  ingredients: [],
};

describe('burgerConstructor slice', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setBun', () => {
    const next = burgerConstructorReducer(undefined, setBun(mockBun));
    expect(next.bun).toEqual(mockBun);
    expect(next.ingredients).toEqual([]);
  });

  it('should handle addIngredient', () => {
    vi.stubGlobal('crypto', { randomUUID: () => 'unique-123' });
    const next = burgerConstructorReducer(undefined, addIngredient(mockMain));
    expect(next.ingredients).toHaveLength(1);
    expect(next.ingredients[0]).toMatchObject({ ...mockMain, uniqueId: 'unique-123' });
    vi.unstubAllGlobals();
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [
        { ...mockMain, uniqueId: 'id-1' },
        { ...mockMain, _id: 'main-2', uniqueId: 'id-2' },
      ],
    };
    const next = burgerConstructorReducer(
      stateWithIngredient,
      removeIngredient({ uniqueId: 'id-1' })
    );
    expect(next.ingredients).toHaveLength(1);
    expect(next.ingredients[0].uniqueId).toBe('id-2');
  });

  it('should handle moveIngredient', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...mockMain, uniqueId: 'a' },
        { ...mockMain, _id: 'm2', uniqueId: 'b' },
        { ...mockMain, _id: 'm3', uniqueId: 'c' },
      ],
    };
    const next = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredient({ dragIndex: 0, hoverIndex: 2 })
    );
    expect(next.ingredients.map((i) => i.uniqueId)).toEqual(['b', 'c', 'a']);
  });

  it('should handle clearConstructor', () => {
    const state = {
      bun: mockBun,
      ingredients: [{ ...mockMain, uniqueId: 'x' }],
    };
    const next = burgerConstructorReducer(state, clearConstructor());
    expect(next).toEqual(initialState);
  });
});
