import type { TEnrichedOrder } from '@/store/selectors/orders';
import type React from 'react';

import styles from './order-status.module.css';

const STATUS_NAME: Record<TEnrichedOrder['status'], string> = {
  created: 'Создан',
  done: 'Выполнен',
  pending: 'Готовится',
  cancelled: 'Отменён',
};

type TOrderStatusProps = {
  status: TEnrichedOrder['status'];
  className?: string;
  accentClassName?: string;
};

const STATUS_ACCENT_CLASS: Partial<Record<TEnrichedOrder['status'], string>> = {
  done: styles.statusColorSuccess,
  cancelled: styles.statusColorCancelled,
};

export const OrderStatus = ({
  status,
  className = '',
}: TOrderStatusProps): React.JSX.Element => {
  const accentClass = STATUS_ACCENT_CLASS[status] ?? '';
  const resolvedClassName =
    `text text_type_main-default mt-2 ${className} ${accentClass}`.trim();

  return <p className={resolvedClassName}>{STATUS_NAME[status]}</p>;
};
