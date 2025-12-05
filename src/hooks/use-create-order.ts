import { useOrder, type TOrder } from '@/contexts/order-context';
import { useState } from 'react';

type TUseCreateOrderProps = {
  onCreationSuccess: () => void;
};

type TUseCreateOrderResult = {
  orderId?: number;
  isOrderCreating?: boolean;
  handleCreateOrder: () => Promise<void>;
};

export const useCreateOrder = ({
  onCreationSuccess,
}: TUseCreateOrderProps): TUseCreateOrderResult => {
  const [orderId, setOrderId] = useState<number>();
  const [isOrderCreating, setIsOrderCreating] = useState<boolean>();
  const { order } = useOrder();

  const createOrderRequest = async (_order: TOrder): Promise<number> => {
    return new Promise((resolve) => setTimeout(() => resolve(123456), 500));
  };

  const handleCreateOrder = async (): Promise<void> => {
    try {
      setIsOrderCreating(true);
      const id = await createOrderRequest(order);
      if (id) {
        setOrderId(id);
        onCreationSuccess();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsOrderCreating(false);
    }
  };

  return { orderId, isOrderCreating, handleCreateOrder };
};
