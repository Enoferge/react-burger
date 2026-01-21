import { AuthForm } from '@/pages/auth-form/auth-form';
import { EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { ROUTES } from '../constants';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({
      email,
    });
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      buttonText="Восстановить"
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
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={'email'}
        placeholder="Укажите e-mail"
        isIcon={true}
      />
    </AuthForm>
  );
};
