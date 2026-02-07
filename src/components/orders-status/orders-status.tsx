import { useAppSelector } from '@/hooks/use-redux-hooks';
import { useMemo } from 'react';

import styles from './orders-status.module.css';

type TOrderStatusProps = {
  className?: string;
};

type TOrdersListBlockProps = {
  title: string;
  numbers: string[];
  isReady?: boolean;
};

type TStatBlockProps = {
  title: string;
  value: number;
};

const OrdersListBlock = ({
  title,
  numbers,
  isReady = false,
}: TOrdersListBlockProps): React.JSX.Element => (
  <div className={styles.currentOrdersBlock}>
    <h3 className="text text_type_main-medium">{title}</h3>
    <ul
      className={`mt-6 text text_type_digits-default ${styles.numbersList} ${isReady ? styles.numbersListReady : ''}`}
    >
      {numbers.map((num) => (
        <li key={num}>{num}</li>
      ))}
    </ul>
  </div>
);

const StatBlock = ({ title, value }: TStatBlockProps): React.JSX.Element => (
  <div className="mt-15">
    <h3 className="text text_type_main-medium">{title}</h3>
    <p className={`text text_type_digits-large ${styles.numberGlow}`}>{value}</p>
  </div>
);

export const OrdersStatus = ({ className }: TOrderStatusProps): React.JSX.Element => {
  const { total, totalToday, orders } = useAppSelector((state) => state.feed);

  const { ordersReady, ordersInProgress } = useMemo(() => {
    const ready: string[] = [];
    const inProgress: string[] = [];

    for (const order of orders) {
      if (order.status === 'done') {
        ready.push(order._id);
      } else if (order.status === 'in_progress') {
        inProgress.push(order._id);
      }
    }
    return { ordersReady: ready, ordersInProgress: inProgress };
  }, [orders]);

  return (
    <section className={className}>
      <div className={styles.currentOrdersWrapper}>
        <OrdersListBlock title="Готовы:" numbers={ordersReady} isReady />
        <OrdersListBlock title="В работе:" numbers={ordersInProgress} />
      </div>

      <StatBlock title="Выполнено за все время:" value={total} />
      <StatBlock title="Выполнено за сегодня:" value={totalToday} />
    </section>
  );
};
