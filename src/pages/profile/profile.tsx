import { PageLayout } from '@/components/page-layout/page-layout';
import { TextInput } from '@/components/text-input/text-input';
import { useAppDispatch } from '@/hooks/use-redux-hooks';
import { logoutThunk } from '@/store/slices/auth/actions';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '../constants';

import styles from './profile.module.css';

const initialFormValues = {
  name: 'Марк',
  email: 'mail@stellar.burger',
  password: '12345',
};

export const Profile = (): React.JSX.Element => {
  const [name, setName] = useState(initialFormValues.name);
  const [email, setEmail] = useState(initialFormValues.email);
  const [password, setPassword] = useState(initialFormValues.password);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password: password || undefined,
    });
  };

  const handleCancel = (): void => {
    setName(initialFormValues.name);
    setEmail(initialFormValues.email);
    setPassword(initialFormValues.password);
  };

  const handleLogout = (): void => {
    void dispatch(logoutThunk());
  };

  const hasChanges = useMemo(() => {
    return (
      name !== initialFormValues.name ||
      email !== initialFormValues.email ||
      password !== initialFormValues.password
    );
  }, [name, email, password]);
  const isProfileActive = location.pathname === ROUTES.PROFILE;

  return (
    <PageLayout className={styles.wrapper}>
      <nav className={styles.nav}>
        <Link
          to={ROUTES.PROFILE}
          className={`${styles.navLink} ${isProfileActive ? styles.navLinkActive : ''} text text_type_main-medium`}
        >
          Профиль
        </Link>
        <Link
          to={`${ROUTES.PROFILE}/orders`}
          className={`${styles.navLink} text text_type_main-medium`}
        >
          История заказов
        </Link>
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
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <main className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            value={name}
            name={'name'}
            placeholder="Имя"
            isIcon
          />
          <EmailInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            value={email}
            name={'email'}
            placeholder="Логин"
            isIcon
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            value={password}
            name={'password'}
            placeholder="Пароль"
            extraClass="mt-6"
            icon="EditIcon"
          />
          {hasChanges && (
            <div className={`${styles.buttons} mt-6`}>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                extraClass="mt-6"
                onClick={handleCancel}
              >
                Отмена
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                size="medium"
                extraClass="mt-6 ml-4"
              >
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </main>
    </PageLayout>
  );
};
