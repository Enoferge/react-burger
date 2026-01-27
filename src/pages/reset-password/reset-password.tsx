import { TextInput } from '@/components/text-input/text-input';
import { useForm } from '@/hooks/use-form';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { AuthForm } from '@/pages/auth-form/auth-form';
import { confirmPasswordResetThunk } from '@/store/slices/password-reset/actions';
import { PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

type TResetPasswordLocationState = {
  allowReset?: boolean;
};

export const ResetPassword = (): React.JSX.Element => {
  const { values, handleChange } = useForm({ password: '', code: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
    if (values.password && values.code) {
      void dispatch(
        confirmPasswordResetThunk({
          password: values.password,
          token: values.code,
        })
      );
    }
  };

  const locationState = location.state as TResetPasswordLocationState | null;

  if (!locationState?.allowReset) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }

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
        onChange={handleChange}
        value={values.password}
        name={'password'}
        placeholder="Введите новый пароль"
      />
      <TextInput
        onChange={handleChange}
        value={values.code}
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
