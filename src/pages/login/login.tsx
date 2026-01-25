import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { AuthForm } from '@/pages/auth-form/auth-form';
import { loginThunk } from '@/store/slices/auth/actions';
import { EmailInput, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

import type { LocationState } from '@/types';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authSuccess, isLoading, error } = useAppSelector((state) => state.auth);

  const from = (location.state as LocationState | null)?.from ?? {
    pathname: ROUTES.HOME,
  };

  useEffect(() => {
    if (authSuccess) {
      void navigate(from);
    }
  }, [authSuccess, navigate, from]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email && password) {
      void dispatch(loginThunk({ email, password }));
    }
  };

  return (
    <AuthForm
      title="Вход"
      buttonText={isLoading ? 'Вход...' : 'Войти'}
      onSubmit={handleSubmit}
      error={error}
      links={[
        {
          text: 'Вы — новый пользователь?',
          linkText: 'Зарегистрироваться',
          to: ROUTES.REGISTER,
        },
        {
          text: 'Забыли пароль?',
          linkText: 'Восстановить пароль',
          to: ROUTES.FORGOT_PASSWORD,
        },
      ]}
    >
      <EmailInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        value={email}
        name={'email'}
        placeholder="E-mail"
        isIcon={true}
      />
      <PasswordInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        value={password}
        name={'password'}
        extraClass="mt-6"
      />
    </AuthForm>
  );
};
