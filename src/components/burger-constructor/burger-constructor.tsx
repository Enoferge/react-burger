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

// TODO: change in future
const removeIngredient = (): void => {
  console.log('removeIngredient');
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const { order, setOrder } = useOrder();

  // пока просто сетим заказ
  useEffect(() => {
    setOrder({
      '643d69a5c3f7b9001cfa093c': 1,
      '643d69a5c3f7b9001cfa093f': 2,
      '643d69a5c3f7b9001cfa0944': 1,
      '643d69a5c3f7b9001cfa0947': 1,
      '643d69a5c3f7b9001cfa094a': 1,
      '643d69a5c3f7b9001cfa0943': 1,
      '643d69a5c3f7b9001cfa0948': 1,
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
    <section className={`${styles.wrapper} pb-3`}>
      <div className={`${styles.ingredients} p-0 m-0`}>
        {bunIngredient ? (
          <>
            <BurgerConstructorItem
              ingredient={bunIngredient}
              elementProps={{
                type: 'top',
                isLocked: true,
                handleClose: removeIngredient,
              }}
            />
            <ul className={`${styles.scrollable_area} pl-4 pr-4`}>
              {innerIngredients.map((ingredient, index) => (
                <li key={`${ingredient._id}-${index}`}>
                  <BurgerConstructorItem
                    ingredient={ingredient}
                    elementProps={{ isLocked: false, handleClose: removeIngredient }}
                  />
                </li>
              ))}
            </ul>
            <BurgerConstructorItem
              ingredient={bunIngredient}
              elementProps={{
                type: 'bottom',
                isLocked: true,
                handleClose: removeIngredient,
              }}
            />
          </>
        ) : (
          <div className={`${styles.empty_state} p-10`}>
            <p className="text text_type_main-default text_color_inactive">
              Выберите булку и ингредиенты для бургера
            </p>
          </div>
        )}
      </div>
      <div className={`${styles.footer} pl-4 pr-4 pt-10 pb-10`}>
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
