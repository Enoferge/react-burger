import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { useTabScroll } from '@/hooks/use-tab-scroll';
import {
  setSelectedIngredient,
  clearSelectedIngredient,
} from '@/store/slices/selected-ingredient/slice';
import { IngredientTypeNames } from '@/utils/constants';
import { typedObjectEntries } from '@/utils/helpers';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { BurgerIngredientsSection } from './burger-ingredients-section/burger-ingredients-section';

import type { TIngredientType, TIngredient } from '@/utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { selectedIngredient } = useAppSelector((state) => state.selectedIngredient);

  const preparedIngredients: Record<TIngredientType, TIngredient[]> = useMemo(() => {
    return ingredients.reduce(
      (acc, ingredient) => {
        acc[ingredient.type] = [...(acc[ingredient.type] || []), ingredient];
        return acc;
      },
      {} as Record<TIngredientType, TIngredient[]>
    );
  }, [ingredients]);

  const {
    ingredientsSectionRef,
    tabsContainerRef,
    activeTab,
    setSectionRef,
    handleTabClick,
  } = useTabScroll<TIngredientType>({
    initialActiveTab: 'bun',
  });

  const handleIngredientClick = (ingredient: TIngredient): void => {
    dispatch(setSelectedIngredient(ingredient));
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav ref={tabsContainerRef}>
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
      <div
        className={`${styles.sections_wrapper} mt-10 mb-10`}
        ref={ingredientsSectionRef}
      >
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
      {!!selectedIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(clearSelectedIngredient())}
        >
          {selectedIngredient && <IngredientDetails ingredient={selectedIngredient} />}
        </Modal>
      )}
    </section>
  );
};
