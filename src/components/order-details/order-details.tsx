import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';

import { IngredientPreview } from '../ingredient-preview/ingredient-preview';
import { OrderStatus } from '../order-status/order-status';
import { Price } from '../price/price';

import type { TEnrichedOrder } from '@/store/selectors/orders';
import type React from 'react';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  order?: TEnrichedOrder;
};

export const OrderDetails = ({ order }: TOrderDetailsProps): React.JSX.Element => {
  if (!order) {
    return <p className="text text_type_main-medium mt-15">Нет информации о заказе</p>;
  }

  return (
    <div className={`${styles.wrapper}`}>
      <p className="text text_type_main-medium">{order.name}</p>
      <OrderStatus status={order.status} className={styles.status} />
      <p className="text text_type_main-medium mt-15">Состав:</p>

      <ul className={`pr-6 ${styles.ingredientsList} mt-6`}>
        {order.ingredientsWithDetails?.map((ing, i) => (
          <li key={`${ing._id}-${i}`}>
            <div className={`${styles.ingredientRow}`}>
              <IngredientPreview ingredient={ing} />
              <p className="ml-4 text text_type_main-default">{ing.name}</p>
              <div className={`${styles.ingredientPrice}`}>
                <Price price={ing.price} count={ing.count} />
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
