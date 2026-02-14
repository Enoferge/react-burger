import { uniqueId } from 'lodash-es';

import { IngredientPreview } from '../ingredient-preview/ingredient-preview';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-preview-list.module.css';

export type TIngredientPreviewListProps = {
  className?: string;
  ingredients: TIngredient[];
};

export const IngredientPreviewList = ({
  ingredients,
  className,
}: TIngredientPreviewListProps): React.JSX.Element => {
  return (
    <ul className={`${styles.list} ${className}`}>
      {ingredients.map((ing) => (
        <li key={`${ing._id}-${uniqueId()}`} className={styles.listItem}>
          <IngredientPreview ingredient={ing} />
        </li>
      ))}
    </ul>
  );
};
