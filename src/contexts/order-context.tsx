/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

import type { TIngredient } from '@/utils/types';
import type { ReactNode } from 'react';

export type TOrder = Record<TIngredient['_id'], number>;

type TOrderContextValue = {
  order: TOrder;
};

type TOrderProviderProps = {
  children: ReactNode;
  order: TOrder;
};

const OrderContext = createContext<TOrderContextValue | undefined>(undefined);

export const OrderProvider = ({
  children,
  order,
}: TOrderProviderProps): React.JSX.Element => {
  return <OrderContext.Provider value={{ order }}>{children}</OrderContext.Provider>;
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
