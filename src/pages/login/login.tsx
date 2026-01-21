import { AuthForm } from '@/pages/auth-form/auth-form';
import { EmailInput, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { ROUTES } from '../constants';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
  };

  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
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
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={'email'}
        placeholder="E-mail"
        isIcon={true}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mt-6"
      />
    </AuthForm>
  );
};
