import { PageLayout } from '@/components/page-layout/page-layout';
import { TextInput } from '@/components/text-input/text-input';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { editUserProfileThunk, logoutThunk } from '@/store/slices/auth/actions';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

import type { TEditUserProfileRequest, TUser } from '@/api/auth';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const { user, isEditInProgress } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [innerUser, setInnerUser] = useState<TUser | null>(user);
  const [password, setPassword] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      setInnerUser(user);
      setPassword('');
    } else {
      void navigate(ROUTES.LOGIN);
    }
  }, [user, navigate]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!innerUser || !user) {
      return;
    }

    const payload: TEditUserProfileRequest = {};

    if (innerUser.name !== user.name) {
      payload.name = innerUser.name;
    }

    if (innerUser.email !== user.email) {
      payload.email = innerUser.email;
    }

    if (password.trim().length > 0) {
      payload.password = password;
    }

    if (Object.keys(payload).length > 0) {
      void dispatch(editUserProfileThunk(payload));
    }
  };

  const handleCancel = (): void => {
    if (user) {
      setInnerUser(user);
      setPassword('');
    }
  };

  const handleLogout = (): void => {
    void dispatch(logoutThunk());
  };

  const hasChanges = useMemo(() => {
    return (
      innerUser?.name !== user?.name ||
      innerUser?.email !== user?.email ||
      password?.length
    );
  }, [innerUser, user, password]);

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
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <main className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (innerUser) {
                setInnerUser({ ...innerUser, name: e.target.value });
              }
            }}
            value={innerUser?.name ?? ''}
            name={'name'}
            placeholder="Имя"
            isIcon
          />
          <EmailInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (innerUser) {
                setInnerUser({ ...innerUser, email: e.target.value });
              }
            }}
            value={innerUser?.email ?? ''}
            name={'email'}
            placeholder="E-mail"
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
            onInvalid={() => {
              console.log('error');
              setIsSubmitDisabled(true);
            }}
          />
          {!!hasChanges && (
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
                disabled={isSubmitDisabled}
              >
                {isEditInProgress ? 'Сохраняем...' : 'Сохранить'}
              </Button>
            </div>
          )}
        </form>
      </main>
    </PageLayout>
  );
};
