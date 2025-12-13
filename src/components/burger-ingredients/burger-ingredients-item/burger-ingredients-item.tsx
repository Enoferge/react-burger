import { Price } from '@/components/price/price';
import { useIngredientCount } from '@/hooks/use-ingredient-count';
import { Counter } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './burger-ingredients-item.module.css';

type TBurgerIngredientsItemProps = {
  ingredient: TIngredient;
  onItemClick: () => void;
};

export const BurgerIngredientsItem = ({
  ingredient,
  onItemClick,
}: TBurgerIngredientsItemProps): React.JSX.Element => {
  const count = useIngredientCount(ingredient._id);

  return (
    <div className={styles.wrapper} onClick={onItemClick}>
      <img
        className={`${styles.image} ml-4 mr-4`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <Price price={ingredient.price} />
      <span className="text text_type_main-default">{ingredient.name}</span>
      {count > 0 && <Counter count={count} size="default" extraClass={styles.counter} />}
    </div>
  );
};
