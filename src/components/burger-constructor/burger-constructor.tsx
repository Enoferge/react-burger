import { Price } from '@/components/price/price';
import { useOrder } from '@/contexts/order-context';
import { useCreateOrder } from '@/hooks/use-create-order';
import { useOrderIngredients } from '@/hooks/use-order-ingredients';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorItem } from './burger-constuctor-item/burger-constructor-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

// TODO: remove
const noop = (): void => {
  console.log('noop');
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const { order, setOrder } = useOrder();

  // пока просто сетим заказ
  useEffect(() => {
    setOrder({
      '60666c42cc7b410027a1a9b1': 1,
      '60666c42cc7b410027a1a9b5': 2,
      '60666c42cc7b410027a1a9b6': 1,
      '60666c42cc7b410027a1a9b7': 1,
      '60666c42cc7b410027a1a9bc': 1,
      '60666c42cc7b410027a1a9b10': 1,
      '60666c42cc7b410027a1a9b9': 1,
    });
  }, []);

  const { totalPrice, innerIngredients, bunIngredient } = useOrderIngredients({
    ingredients,
    order,
  });

  const [isOrderDetailsModalOpened, setIsOrderDetailsModalOpened] = useState(false);
  const { orderId, handleCreateOrder, isOrderCreating } = useCreateOrder({
    onCreationSuccess: () => setIsOrderDetailsModalOpened(true),
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.ingredients}>
        {bunIngredient ? (
          <>
            <BurgerConstructorItem
              ingredient={bunIngredient}
              elementProps={{ type: 'top', isLocked: true, handleClose: noop }}
            />
            <ul className={styles.scrollable_area}>
              {innerIngredients.map((ingredient, index) => (
                <li key={`${ingredient._id}-${index}`}>
                  <BurgerConstructorItem
                    ingredient={ingredient}
                    elementProps={{ isLocked: false, handleClose: noop }}
                  />
                </li>
              ))}
            </ul>
            <BurgerConstructorItem
              ingredient={bunIngredient}
              elementProps={{ type: 'bottom', isLocked: true, handleClose: noop }}
            />
          </>
        ) : (
          <div className={styles.empty_state}>
            <p className="text text_type_main-default text_color_inactive">
              Выберите булку и ингредиенты для бургера
            </p>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <Price price={totalPrice} size="M" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={isOrderCreating}
          onClick={() => {
            void handleCreateOrder();
          }}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpen={isOrderDetailsModalOpened}
        onClose={(): void => setIsOrderDetailsModalOpened(false)}
      >
        <OrderDetails id={orderId} />
      </Modal>
    </section>
  );
};
