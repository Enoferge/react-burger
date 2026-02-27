import { Modal } from '@/components/modal/modal';
import { OrderDetails } from '@/components/order-details/order-details';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { selectOrderWithDetails } from '@/store/selectors/orders';
import { getOrderByNumberThunk } from '@/store/slices/order/actions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const OrderDetailsModal = (): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => selectOrderWithDetails(state, id));

  useEffect(() => {
    if (!order && id) {
      void dispatch(getOrderByNumberThunk(id));
    }
  }, [id, order, dispatch]);

  const onClose = (): void => {
    void navigate(-1);
  };

  return (
    <Modal title="Заказ" onClose={onClose}>
      {order && <OrderDetails order={order} />}
    </Modal>
  );
};
