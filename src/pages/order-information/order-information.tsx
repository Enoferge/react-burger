import { Loading } from '@/components/loading/loading';
import { OrderDetails } from '@/components/order-details/order-details';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { selectOrderWithDetails } from '@/store/selectors/orders';
import { getOrderByNumberThunk } from '@/store/slices/order/actions';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './order-information.module.css';

export const OrderInformation = (): React.JSX.Element => {
  const { number } = useParams();
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => selectOrderWithDetails(state, number));
  const { isOrderDetailsLoading } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (!order && number) {
      void dispatch(getOrderByNumberThunk(number));
    }
  }, [number, order, dispatch]);

  if (isOrderDetailsLoading) {
    return (
      <PageLayout>
        <div className={styles.wrapper}>
          <Loading message="Загрузка информации о заказе..." />
        </div>
      </PageLayout>
    );
  }

  if (!order) {
    return (
      <PageLayout>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default">Заказ не найден</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={styles.wrapper}>
        <h1 className={`${styles.title} text text_type_digits-default pb-5 pt-5`}>
          #{order.number ?? '??????'}
        </h1>
        <OrderDetails order={order} />
      </div>
    </PageLayout>
  );
};
