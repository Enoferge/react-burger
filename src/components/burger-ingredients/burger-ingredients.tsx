import { useTabScroll } from '@/hooks/use-tab-scroll';
import { IngredientTypeNames } from '@/utils/constants';
import { typedObjectEntries } from '@/utils/helpers';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
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

  const [currentDetailedIngredient, setCurrentDetailedIngredient] = useState<
    TIngredient | undefined
  >(undefined);

  const handleIngredientClick = (ingredient: TIngredient): void => {
    setCurrentDetailedIngredient(ingredient);
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={`${styles.menu} p-0 m-0`}>
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
      <div className={`${styles.sections_wrapper} mt-10 mb-10`}>
        {typedObjectEntries(preparedIngredients).map(([type, ingredients]) => (
          <BurgerIngredientsSection
            key={type}
            ref={(el) => setSectionRef(type, el)}
            title={IngredientTypeNames[type]}
            ingredients={ingredients}
            onIngredientClick={handleIngredientClick}
          />
        ))}
      </div>
      {!!currentDetailedIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={(): void => setCurrentDetailedIngredient(undefined)}
        >
          {currentDetailedIngredient && (
            <IngredientDetails ingredient={currentDetailedIngredient} />
          )}
        </Modal>
      )}
    </section>
  );
};
