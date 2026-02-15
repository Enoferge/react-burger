import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';

import { IngredientPreview } from '../ingredient-preview/ingredient-preview';
import { Price } from '../price/price';

import type { TEnrichedOrder } from '@/store/selectors/orders';
import type React from 'react';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  order?: TEnrichedOrder;
};

const STATUS_NAME: Record<TEnrichedOrder['status'], string> = {
  created: 'Создан',
  done: 'Выполнен',
  pending: 'Готовится',
};

export const OrderDetails = ({ order }: TOrderDetailsProps): React.JSX.Element => {
  if (!order) {
    return <p className="text text_type_main-medium mt-15">Нет информации о заказе</p>;
  }

  return (
    <div className={`${styles.wrapper}`}>
      <p className="text text_type_main-medium">{order.name}</p>
      <p
        className={`text text_type_main-default mt-2 ${order.status === 'done' ? styles.statusColorAccent : ''} ${styles.status}`}
      >
        {STATUS_NAME[order.status]}
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>

      <ul className={`pr-6 ${styles.ingredientsList} mt-6`}>
        {order.ingredientsWithDetails?.map((ing, i) => (
          <li key={`${ing._id}-${i}`}>
            <div className={`${styles.ingredientRow}`}>
              <IngredientPreview ingredient={ing} />
              <p className="ml-4 text text_type_main-default">{ing.name}</p>
              <div className={`${styles.ingredientPrice}`}>
                <Price price={ing.price} count={1} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={`text text_type_main-default mt-10 ${styles.footer}`}>
        <FormattedDate date={new Date(order.createdAt)} className={styles.time} />
        <Price price={order.totalPrice} />
      </div>
    </div>
  );
};
