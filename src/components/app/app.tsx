import { useAppDispatch } from '@/hooks/use-redux-hooks';
import { ROUTES } from '@/pages/constants';
import { Feed } from '@/pages/feed/feed';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { IngredientModal } from '@/pages/ingredient-modal/ingredient-modal';
import { Ingredient } from '@/pages/ingredient/ingredient';
import { Login } from '@/pages/login/login';
import { ProfileOrders } from '@/pages/profile-orders/profile-orders';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { checkUserAuthThunk } from '@/store/slices/auth/actions';
import { useEffect } from 'react';
import { Route, Routes, useLocation, type Location } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import { ProtectedRoute } from '../protected-route/protected-route';
import { ACCESS_TYPE } from '../protected-route/protected-route.constants';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const backgroundLocation = (location.state as { background?: Location } | null)
    ?.background;

  useEffect(() => {
    void dispatch(checkUserAuthThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation ?? location}>
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingredients/:id"
          element={
            <ProtectedRoute>
              <Ingredient />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <ProtectedRoute access={ACCESS_TYPE.GUEST}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <ProtectedRoute access={ACCESS_TYPE.GUEST}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute access={ACCESS_TYPE.AUTH}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.PROFILE}/orders`}
          element={
            <ProtectedRoute access={ACCESS_TYPE.AUTH}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.FEED}`}
          element={
            <ProtectedRoute access={ACCESS_TYPE.ANY}>
              <Feed />
            </ProtectedRoute>
          }
        />
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
