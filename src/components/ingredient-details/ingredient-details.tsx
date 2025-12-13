import { useMemo } from 'react';

import { IngredientDetail } from './ingredient-detail/ingredient-detail';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

export type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element => {
  const detailsList = useMemo(() => {
    return [
      { label: 'Калории,ккал', value: ingredient.calories },
      { label: 'Белки, г', value: ingredient.proteins },
      { label: 'Жиры, г', value: ingredient.fat },
      { label: 'Углеводы, г', value: ingredient.carbohydrates },
    ];
  }, [ingredient]);

  return (
    <div className={styles.wrapper}>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
      <span className="text text_type_main-medium mt-4">{ingredient.name}</span>
      <ul className={`${styles.details} mt-8`}>
        {detailsList.map(({ label, value }) => (
          <li key={label}>
            <IngredientDetail label={label} value={value} />
          </li>
        ))}
      </ul>
    </div>
  );
};
