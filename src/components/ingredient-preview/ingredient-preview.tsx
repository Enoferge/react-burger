import type { TIngredient } from '@/utils/types';

import styles from './ingredient-preview.module.css';

export type TIngredientPreviewProps = {
  ingredient: TIngredient;
  moreCount?: number;
};

export const IngredientPreview = ({
  ingredient,
  moreCount,
}: TIngredientPreviewProps): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
        {moreCount ? (
          <>
            <div className={styles.moreCountBg}></div>
            <span className={`text text_type_main-default ${styles.moreCount}`}>
              +{moreCount}
            </span>
          </>
        ) : undefined}
      </div>
    </div>
  );
};
