import { forwardRef } from 'react';

import { BurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';

import type { TIngredient } from '@/utils/types';

import styles from './burger-ingredients-section.module.css';

type TBurgerIngredientsSectionProps = {
  title: string;
  ingredients: TIngredient[];
  onIngredientClick: (ingredient: TIngredient) => void;
};

const BurgerIngredientsSection = forwardRef<
  HTMLDivElement,
  TBurgerIngredientsSectionProps
>(({ title, ingredients, onIngredientClick }, ref): React.JSX.Element => {
  return (
    <div className={styles.section} ref={ref}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={styles.list}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <BurgerIngredientsItem
              ingredient={ingredient}
              onItemClick={() => onIngredientClick(ingredient)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

BurgerIngredientsSection.displayName = 'BurgerIngredientsSection';

export { BurgerIngredientsSection };
