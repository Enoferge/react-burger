import { useAppSelector } from '@/hooks/use-redux-hooks';
import { selectFeedOrdersWithDetails } from '@/store/selectors/orders';

import { CardOrder, type TCardOrderProps } from '../card-order/card-order';

import styles from './card-orders-list.module.css';

type TOrderListProps = {
  className?: string;
  onCardOrderClick?: TCardOrderProps['onClick'];
};

export const CardOrdersList = ({
  className,
  onCardOrderClick,
}: TOrderListProps): React.JSX.Element => {
  const orders = useAppSelector(selectFeedOrdersWithDetails);

  return (
    <section className={`${styles.list} ${className}`}>
      {orders.map((o) => (
        <CardOrder key={o._id} order={o} onClick={onCardOrderClick} />
      ))}
    </section>
  );
};
