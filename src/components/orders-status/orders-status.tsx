import { useState } from 'react';

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
  const [ordersReady] = useState(['034533', '034532', '034530']);
  const [ordersInProgress] = useState(['034538', '034541', '034542']);
  const [ordersTotalCount] = useState(28752);
  const [ordersTodayCount] = useState(138);

  return (
    <section className={className}>
      <div className={styles.currentOrdersWrapper}>
        <OrdersListBlock title="Готовы:" numbers={ordersReady} isReady />
        <OrdersListBlock title="В работе:" numbers={ordersInProgress} />
      </div>

      <StatBlock title="Выполнено за все время:" value={ordersTotalCount} />
      <StatBlock title="Выполнено за сегодня:" value={ordersTodayCount} />
    </section>
  );
};
