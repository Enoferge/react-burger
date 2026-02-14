import type { TIngredient } from '@/utils/types';

import styles from './ingredient-preview.module.css';

export type TIngredientPreviewProps = {
  ingredient: TIngredient;
};

export const IngredientPreview = ({
  ingredient,
}: TIngredientPreviewProps): React.JSX.Element => {
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: ingredient?.image_mobile }}
    >
      <div className={styles.inner}>
        {ingredient ? (
          <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
        ) : undefined}
      </div>
    </div>
  );
};
