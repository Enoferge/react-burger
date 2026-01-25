import { Loading } from '@/components/loading/loading';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { fetchIngredientsThunk } from '@/store/slices/ingredients/actions';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const { isLoading } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading ? (
          <Loading message="Загрузка ингредиентов..." />
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </>
  );
};
