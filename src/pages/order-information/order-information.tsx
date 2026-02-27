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
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => selectOrderWithDetails(state, id));
  const { isOrderDetailsLoading } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (!order && id) {
      void dispatch(getOrderByNumberThunk(id));
    }
  }, [id, order, dispatch]);

  if (isOrderDetailsLoading) {
    return (
      <PageLayout className={styles.pageWithTopPadding}>
        <div className={styles.wrapper}>
          <Loading message="Загрузка информации о заказе..." />
        </div>
      </PageLayout>
    );
  }

  if (!order) {
    return (
      <PageLayout className={styles.pageWithTopPadding}>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default">Заказ не найден</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout className={styles.pageWithTopPadding}>
      <div className={styles.wrapper}>
        <h1 className={`${styles.title} text text_type_digits-default mb-10`}>
          #{order.number ?? '??????'}
        </h1>
        <OrderDetails order={order} />
      </div>
    </PageLayout>
  );
};
