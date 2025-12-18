import { Price } from '@/components/price/price';
import { useCreateOrder } from '@/hooks/use-create-order';
import {
  removeIngredient as removeIngredientAction,
  type TConstructorIngredient,
} from '@/store/slices/burger-constructor/slice';
import { clearOrder } from '@/store/slices/order/slice';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorBunDropZone } from './burger-constructor-bun-drop-zone/burger-constructor-bun-drop-zone';
import { BurgerConstructorIngredientsDropZone } from './burger-constructor-ingredients-drop-zone/burger-constructor-ingredients-drop-zone';

import type { AppDispatch, RootState } from '@/store';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { bun, ingredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const [isOrderDetailsModalOpened, setIsOrderDetailsModalOpened] = useState(false);

  const { order, isCreating, handleCreateOrder } = useCreateOrder({
    onCreationSuccess: () => setIsOrderDetailsModalOpened(true),
  });

  const totalPrice = useMemo(() => {
    const ingredientsTotal = ingredients.reduce((acc, { price }) => (acc += price), 0);

    return ingredientsTotal + (bun?.price ?? 0) * 2;
  }, [bun, ingredients]);

  const removeIngredient = (ingredient: TConstructorIngredient): void => {
    dispatch(removeIngredientAction({ uniqueId: ingredient.uniqueId }));
  };

  return (
    <section className={`${styles.wrapper} pb-3`}>
      <div className={`${styles.ingredients} p-0 m-0`}>
        <BurgerConstructorBunDropZone type="top" bun={bun} />

        <BurgerConstructorIngredientsDropZone
          ingredients={ingredients}
          onRemoveIngredient={removeIngredient}
        />

        <BurgerConstructorBunDropZone type="bottom" bun={bun} />
      </div>

      <div className={`${styles.footer} pl-4 pr-4 pt-10 pb-10`}>
        <Price price={totalPrice} size="M" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={isCreating}
          onClick={handleCreateOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsModalOpened && (
        <Modal
          onClose={(): void => {
            setIsOrderDetailsModalOpened(false);
            dispatch(clearOrder());
          }}
        >
          <OrderDetails order={order} />
        </Modal>
      )}
    </section>
  );
};
