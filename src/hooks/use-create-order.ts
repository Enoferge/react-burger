import { createOrderThunk } from '@/store/slices/order/actions';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/store';
import type { TOrderSliceState } from '@/store/slices/order/slice';

type TUseCreateOrderProps = {
  onCreationSuccess: () => void;
};

type TUseCreateOrderResult = TOrderSliceState & {
  handleCreateOrder: () => void;
};

export const useCreateOrder = ({
  onCreationSuccess,
}: TUseCreateOrderProps): TUseCreateOrderResult => {
  const dispatch = useDispatch<AppDispatch>();
  const { ingredients, bun } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const { order, name, isCreating } = useSelector((state: RootState) => state.order);

  const previousOrderNumberRef = useRef<number | null>(null);

  const handleCreateOrder = (): void => {
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
      onCreationSuccess();
      previousOrderNumberRef.current = currentOrderNumber;
    }
  }, [order?.number, isCreating, onCreationSuccess]);

  return { order, name, isCreating, handleCreateOrder };
};
