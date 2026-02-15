import { clearConstructor } from '@/store/slices/burger-constructor/slice';
import { createOrderThunk } from '@/store/slices/order/actions';
import { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from './use-redux-hooks';

import type { TOrderSliceState } from '@/store/slices/order/slice';

type TUseCreateOrderProps = {
  onCreationSuccess: () => void;
};

type TUseCreateOrderResult = Pick<TOrderSliceState, 'order' | 'name' | 'isCreating'> & {
  createOrder: () => void;
};

export const useCreateOrder = ({
  onCreationSuccess,
}: TUseCreateOrderProps): TUseCreateOrderResult => {
  const dispatch = useAppDispatch();
  const { ingredients, bun } = useAppSelector((state) => state.burgerConstructor);

  const { order, name, isCreating } = useAppSelector((state) => state.order);

  const previousOrderNumberRef = useRef<number | null>(null);

  const createOrder = (): void => {
    if (!bun?._id) {
      return;
    }

    const preparedPayload = [bun?._id, ...ingredients.map(({ _id }) => _id), bun?._id];

    void dispatch(createOrderThunk(preparedPayload));
  };

  useEffect(() => {
    const currentOrderNumber = order?.number ?? null;
    const previousOrderNumber = previousOrderNumberRef.current;

    if (
      currentOrderNumber &&
      !isCreating &&
      currentOrderNumber !== previousOrderNumber
    ) {
      dispatch(clearConstructor());
      onCreationSuccess();
      previousOrderNumberRef.current = currentOrderNumber;
    }
  }, [order?.number, isCreating, onCreationSuccess, dispatch]);

  return {
    order,
    name,
    isCreating,
    createOrder,
  };
};
