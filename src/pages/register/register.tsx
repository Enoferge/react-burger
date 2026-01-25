import { useForm } from '@/hooks/use-form';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { AuthForm } from '@/pages/auth-form/auth-form';
import { registerThunk } from '@/store/slices/auth/actions';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

export const Register = (): React.JSX.Element => {
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
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
    if (values.name && values.email && values.password) {
      void dispatch(
        registerThunk({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
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
        onChange={handleChange}
        value={values.name}
        name={'name'}
        placeholder="Имя"
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={'password'}
        extraClass="mt-6"
      />
    </AuthForm>
  );
};
