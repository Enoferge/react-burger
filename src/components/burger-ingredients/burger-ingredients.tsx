import { useTabScroll } from '@/hooks/use-tab-scroll';
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

  const { activeTab, setSectionRef, handleTabClick } = useTabScroll<TIngredientType>({
    initialActiveTab: 'bun',
  });

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {typedObjectEntries(IngredientTypeNames).map(([type, name]) => (
            <Tab
              key={type}
              value={type}
              active={type === activeTab}
              onClick={() => {
                handleTabClick(type);
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
            ref={(el) => setSectionRef(type, el)}
            title={IngredientTypeNames[type]}
            ingredients={ingredients}
          />
        ))}
      </div>
    </section>
  );
};
