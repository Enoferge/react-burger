import { PageLayout } from '@/components/page-layout/page-layout';
import { useAppDispatch } from '@/hooks/use-redux-hooks';
import { logoutThunk } from '@/store/slices/auth/actions';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '../constants';

import styles from './profile-layout.module.css';

const PROFILE_DESCRIPTION = 'В этом разделе вы можете изменить свои персональные данные';
const ORDERS_DESCRIPTION = 'В этом разделе вы можете просмотреть свою историю заказов';

export const ProfileLayout = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const isOrdersRoute = pathname.startsWith(`${ROUTES.PROFILE}/orders`);
  const description = isOrdersRoute ? ORDERS_DESCRIPTION : PROFILE_DESCRIPTION;

  const handleLogout = (): void => {
    void dispatch(logoutThunk());
  };

  return (
    <PageLayout className={styles.wrapper}>
      <nav className={styles.nav}>
        <NavLink
          to={ROUTES.PROFILE}
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''} text text_type_main-medium`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to={`${ROUTES.PROFILE}/orders`}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''} text text_type_main-medium`
          }
        >
          История заказов
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          className={`${styles.navLink} ${styles.navButton} text text_type_main-medium`}
        >
          Выход
        </button>
        <p
          className={`${styles.description} text text_type_main-default text_color_inactive mt-20`}
        >
          {description}
        </p>
      </nav>

      <div className={styles.outlet}>
        <Outlet />
      </div>
    </PageLayout>
  );
};
