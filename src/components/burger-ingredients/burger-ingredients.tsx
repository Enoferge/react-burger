import { IngredientTypeNames } from '@/utils/constants';
import { typedObjectEntries } from '@/utils/helpers';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { BurgerIngredientsSection } from './burger-ingredients-section/burger-ingredients-section';

import type { TIngredientType, TIngredient } from '@/utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const preparedIngredients: Record<TIngredientType, TIngredient[]> = useMemo(() => {
    return ingredients.reduce(
      (acc, ingredient) => {
        acc[ingredient.type] = [...(acc[ingredient.type] || []), ingredient];
        return acc;
      },
      {} as Record<TIngredientType, TIngredient[]>
    );
  }, [ingredients]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {Object.entries(IngredientTypeNames).map(([type, name]) => (
            <Tab
              key={type}
              value={type}
              active={type === 'bun'}
              onClick={() => {
                /* TODO */
              }}
            >
              {name}
            </Tab>
          ))}
        </ul>
      </nav>
      <div className={styles.sections_wrapper}>
        {typedObjectEntries(preparedIngredients).map(([type, ingredients]) => (
          <BurgerIngredientsSection
            key={type}
            title={IngredientTypeNames[type]}
            ingredients={ingredients}
          />
        ))}
      </div>
    </section>
  );
};
