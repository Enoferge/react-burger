import { Price } from '@/components/price/price';
import { useOrder } from '@/contexts/order-context';
import { useOrderIngredients } from '@/hooks/use-order-ingredients';
import { Button } from '@krgaa/react-developer-burger-ui-components';

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
  const { order } = useOrder();
  const { totalPrice, innerIngredients, bunIngredient } = useOrderIngredients({
    ingredients,
    order,
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
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
