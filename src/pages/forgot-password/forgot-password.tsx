import { useForm } from '@/hooks/use-form';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { AuthForm } from '@/pages/auth-form/auth-form';
import { requestPasswordResetThunk } from '@/store/slices/password-reset/actions';
import { EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

export const ForgotPassword = (): React.JSX.Element => {
  const { values, handleChange } = useForm({ email: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, resetRequestSuccess, error } = useAppSelector(
    (state) => state.passwordReset
  );

  useEffect(() => {
    if (resetRequestSuccess) {
      void navigate(ROUTES.RESET_PASSWORD, { state: { allowReset: true } });
    }
  }, [resetRequestSuccess, navigate]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void dispatch(requestPasswordResetThunk({ email: values.email }));
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      buttonText={isLoading ? 'Отправка...' : 'Восстановить'}
      onSubmit={handleSubmit}
      links={[
        {
          text: 'Вспомнили пароль?',
          linkText: 'Войти',
          to: ROUTES.LOGIN,
        },
      ]}
    >
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        placeholder="Укажите e-mail"
        isIcon={true}
      />
      {error && (
        <p className="text text_type_main-default text_color_error mt-4">{error}</p>
      )}
    </AuthForm>
  );
};
