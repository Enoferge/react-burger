import { AuthForm } from '@/pages/auth-form/auth-form';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { ROUTES } from '../constants';

export const Register = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
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
        onChange={(e) => setName(e.target.value)}
        value={name}
        name={'name'}
        placeholder="Имя"
      />
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={'email'}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mt-6"
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
