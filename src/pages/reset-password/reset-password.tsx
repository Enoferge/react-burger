import { TextInput } from '@/components/text-input/text-input';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { AuthForm } from '@/pages/auth-form/auth-form';
import { confirmPasswordResetThunk } from '@/store/slices/password-reset/actions';
import { PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

export const ResetPassword = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, resetConfirmSuccess, error } = useAppSelector(
    (state) => state.passwordReset
  );

  useEffect(() => {
    if (resetConfirmSuccess) {
      void navigate(ROUTES.LOGIN);
    }
  }, [resetConfirmSuccess, navigate]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password && code) {
      void dispatch(
        confirmPasswordResetThunk({
          password,
          token: code,
        })
      );
    }
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      links={[
        {
          text: 'Вспомнили пароль?',
          linkText: 'Войти',
          to: ROUTES.LOGIN,
        },
      ]}
    >
      <PasswordInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        value={password}
        name={'password'}
        placeholder="Введите новый пароль"
      />
      <TextInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCode(e.target.value);
        }}
        value={code}
        name={'code'}
        placeholder="Введите код из письма"
        isIcon
        extraClass="mt-6"
      />
      {error && (
        <p className="text text_type_main-default text_color_error mt-4">{error}</p>
      )}
    </AuthForm>
  );
};
