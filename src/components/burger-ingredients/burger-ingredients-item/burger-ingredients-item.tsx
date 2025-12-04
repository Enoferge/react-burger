import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './burger-ingredients-item.module.css';

type TBurgerIngredientsItemProps = {
  ingredient: TIngredient;
};

export const BurgerIngredientsItem = ({
  ingredient,
}: TBurgerIngredientsItemProps): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </div>
      <span className="text text_type_main-default">{ingredient.name}</span>
    </div>
  );
};
