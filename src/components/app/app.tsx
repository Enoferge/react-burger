import { useAppDispatch } from '@/hooks/use-redux-hooks';
import { Home } from '@/pages/home/home';
import { IngredientModal } from '@/pages/ingredient-modal/ingredient-modal';
import { Ingredient } from '@/pages/ingredient/ingredient';
import { Login } from '@/pages/login/login';
import { Register } from '@/pages/register/register';
import { fetchIngredientsThunk } from '@/store/slices/ingredients/actions';
import { useEffect } from 'react';
import { Route, Routes, useLocation, type Location } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const backgroundLocation = (location.state as { background?: Location } | null)
    ?.background;

  useEffect(() => {
    void dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:id" element={<Ingredient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
