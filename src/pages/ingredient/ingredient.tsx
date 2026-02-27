import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import { Loading } from '@/components/loading/loading';
import { PageLayout } from '@/components/page-layout/page-layout';
import { useAppSelector } from '@/hooks/use-redux-hooks';
import { useParams } from 'react-router-dom';

import styles from './ingredient.module.css';

export const Ingredient = (): React.JSX.Element => {
  const { id } = useParams();
  const { ingredients, isLoading } = useAppSelector((state) => state.ingredients);
  const ingredient = ingredients.find((item) => item._id === id);

  if (isLoading) {
    return (
      <PageLayout className={styles.pageWithTopPadding}>
        <div className={styles.wrapper}>
          <Loading message="Загрузка ингредиентов..." />
        </div>
      </PageLayout>
    );
  }

  if (!ingredient) {
    return (
      <PageLayout className={styles.pageWithTopPadding}>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default">Ингредиент не найден</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout className={styles.pageWithTopPadding}>
      <div className={styles.wrapper}>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>
          Детали ингредиента
        </h1>
        <IngredientDetails ingredient={ingredient} />
      </div>
    </PageLayout>
  );
};
