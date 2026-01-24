import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { AuthForm } from '@/pages/auth-form/auth-form';
import { registerThunk } from '@/store/slices/auth/actions';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

export const Register = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, authSuccess, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authSuccess) {
      void navigate(ROUTES.HOME);
    }
  }, [authSuccess, navigate]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (name && email && password) {
      void dispatch(registerThunk({ name, email, password }));
    }
  };

  return (
    <AuthForm
      title="Регистрация"
      buttonText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      onSubmit={handleSubmit}
      error={error}
      links={[
        {
          text: 'Уже зарегистрированы?',
          linkText: 'Войти',
          to: ROUTES.LOGIN,
        },
      ]}
    >
      <Input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
        value={name}
        name={'name'}
        placeholder="Имя"
      />
      <EmailInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        value={email}
        name={'email'}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mt-6"
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
