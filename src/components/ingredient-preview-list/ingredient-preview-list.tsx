import { IngredientPreview } from '../ingredient-preview/ingredient-preview';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-preview-list.module.css';

export type TIngredientPreviewListProps = {
  className?: string;
  ingredients: TIngredient[];
};

const MAX_VISIBLE = 6;

export const IngredientPreviewList = ({
  ingredients,
  className,
}: TIngredientPreviewListProps): React.JSX.Element => {
  const ingredientsToShow = ingredients.slice(0, MAX_VISIBLE);
  const moreCount = Math.max(ingredients.length - MAX_VISIBLE, 0);

  return (
    <ul className={`${styles.list} ${className}`}>
      {ingredientsToShow.map((ing, i) => (
        <li key={`${ing._id}-${i}`} className={styles.listItem}>
          <IngredientPreview
            ingredient={ing}
            moreCount={moreCount && i === MAX_VISIBLE - 1 ? moreCount : undefined}
          />
        </li>
      ))}
    </ul>
  );
};
