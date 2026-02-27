import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';

import { IngredientPreviewList } from '../ingredient-preview-list/ingredient-preview-list';
import { OrderStatus } from '../order-status/order-status';
import { Price } from '../price/price';

import type { TEnrichedOrder } from '@/store/selectors/orders';
import type React from 'react';

import styles from './card-order.module.css';

export type TCardOrderProps = {
  order: TEnrichedOrder;
  isStatusShown?: boolean;
  onClick?: (order: TEnrichedOrder) => void;
};

export const CardOrder = ({
  order,
  onClick,
  isStatusShown = false,
}: TCardOrderProps): React.JSX.Element => {
  return (
    <div
      className={`p-6 ${styles.card} ${onClick ? styles.cardClickable : ''}`}
      onClick={() => onClick?.(order)}
    >
      <div className={`text text_type_main-default ${styles.header}`}>
        <p className={`${styles.orderId}`}>#{order.number}</p>
        <FormattedDate date={new Date(order.createdAt)} className={styles.time} />
      </div>

      <p className="text text_type_main-medium mt-6">{order.name}</p>
      {isStatusShown && order.status ? <OrderStatus status={order.status} /> : undefined}

      <div className={`mt-6 ${styles.ingredients}`}>
        <IngredientPreviewList
          className={styles.ingredientsList}
          ingredients={order.ingredientsWithDetails}
        />
        <Price price={order.totalPrice} />
      </div>
    </div>
  );
};
