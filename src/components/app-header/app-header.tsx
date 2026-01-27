import { ROUTES } from '@/pages/constants';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import styles from './app-header.module.css';

const getNavLinkClassName =
  (baseClassName?: string) =>
  ({ isActive }: { isActive: boolean }): string => {
    const classes: string[] = [styles.link];
    if (isActive) classes.push(styles.link_active);
    if (baseClassName) classes.push(baseClassName);
    return classes.join(' ');
  };

export const AppHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to={ROUTES.HOME} className={getNavLinkClassName()}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>
          <NavLink to={ROUTES.FEED} className={getNavLinkClassName('ml-10')}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink
          to={ROUTES.PROFILE}
          className={getNavLinkClassName(styles.link_position_last)}
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};
