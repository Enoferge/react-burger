import { useAppDispatch } from '@/hooks/use-redux-hooks';
import { ROUTES } from '@/pages/constants';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { IngredientModal } from '@/pages/ingredient-modal/ingredient-modal';
import { Ingredient } from '@/pages/ingredient/ingredient';
import { Login } from '@/pages/login/login';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
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
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path="/ingredients/:id" element={<Ingredient />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
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
