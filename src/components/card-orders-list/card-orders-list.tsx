import { CardOrder, type TCardOrderProps } from '../card-order/card-order';

import type { TEnrichedOrder } from '@/store/selectors/orders';

import styles from './card-orders-list.module.css';

type TOrderListProps = {
  className?: string;
  onCardOrderClick?: TCardOrderProps['onClick'];
  orders: TEnrichedOrder[];
  isStatusShown?: boolean;
};

export const CardOrdersList = ({
  className,
  onCardOrderClick,
  orders,
  isStatusShown = false,
}: TOrderListProps): React.JSX.Element => {
  return (
    <section className={`${styles.list} ${className}`}>
      {orders.map((o) => (
        <CardOrder
          key={o._id}
          order={o}
          onClick={onCardOrderClick}
          isStatusShown={isStatusShown}
        />
      ))}
    </section>
  );
};
