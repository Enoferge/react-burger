import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';

import { IngredientPreviewList } from '../ingredient-preview-list/ingredient-preview-list';
import { Price } from '../price/price';

import type { TEnrichedOrder } from '@/store/selectors/orders';
import type React from 'react';

import styles from './card-order.module.css';

type TCardOrderProps = {
  order: TEnrichedOrder;
};

export const CardOrder = ({ order }: TCardOrderProps): React.JSX.Element => {
  return (
    <div className={`p-6 ${styles.card}`}>
      <div className={`text text_type_main-default ${styles.header}`}>
        <p className={`${styles.orderId}`}>#{order.number}</p>
        <FormattedDate date={new Date(order.createdAt)} className={styles.time} />
      </div>

      <p className="text text_type_main-medium mt-6">{order.name}</p>

      <div className={`mt-6 ${styles.ingredients}`}>
        <IngredientPreviewList
          className={styles.ingredientsList}
          ingredients={order.ingredientsWithDetails}
        />
        {/* <Price price={order.totalPrice} /> */}
        <Price price={order.totalPrice} />
      </div>
    </div>
  );
};
