/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

import type { TIngredient } from '@/utils/types';
import type { ReactNode } from 'react';

export type TOrder = Record<TIngredient['_id'], number>;

type TOrderContextValue = {
  order: TOrder;
  setOrder: (order: TOrder) => void;
  addIngredient: (ingredientId: TIngredient['_id']) => void;
  removeIngredient: (ingredientId: TIngredient['_id']) => void;
};

type TOrderProviderProps = {
  children: ReactNode;
};

const OrderContext = createContext<TOrderContextValue | undefined>(undefined);

export const OrderProvider = ({
  children,
  // order,
}: TOrderProviderProps): React.JSX.Element => {
  const [order, setOrder] = useState<TOrder>({});

  const addIngredient = (ingredientId: TIngredient['_id']): void => {
    setOrder((prev) => ({
      ...prev,
      [ingredientId]: (prev?.[ingredientId] ?? 0) + 1,
    }));
  };

  const removeIngredient = (ingredientId: TIngredient['_id']): void => {
    setOrder((prev) => {
      const updatedOrder = { ...prev };

      if (updatedOrder[ingredientId] > 1) {
        updatedOrder[ingredientId] -= 1;
      } else {
        delete updatedOrder[ingredientId];
      }
      return updatedOrder;
    });
  };

  const value = {
    order,
    setOrder,
    addIngredient,
    removeIngredient,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = (): TOrderContextValue => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};

export const useIngredientCount = (ingredientId: TIngredient['_id']): number => {
  const { order } = useOrder();
  return order[ingredientId] || 0;
};
