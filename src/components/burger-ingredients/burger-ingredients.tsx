import { IngredientTypeNames } from '@/utils/constants';
import { typedObjectEntries } from '@/utils/helpers';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useRef, useState } from 'react';

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

  const [activeTab, setActiveTab] = useState<TIngredientType>('bun');
  const sectionRefs = useRef<Map<TIngredientType, HTMLDivElement>>(new Map());

  const setSectionRef = (
    type: TIngredientType,
    element: HTMLDivElement | null
  ): void => {
    if (element) {
      sectionRefs.current.set(type, element);
    } else {
      sectionRefs.current.delete(type);
    }
  };

  const handleTabClick = (type: TIngredientType): void => {
    setActiveTab(type);
    const sectionElement = sectionRefs.current.get(type);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
