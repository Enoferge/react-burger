import { TextInput } from '@/components/text-input/text-input';
import { AuthForm } from '@/pages/auth-form/auth-form';
import { PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { ROUTES } from '../constants';

export const ResetPassword = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({
      password,
      code,
    });
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      buttonText="Сохранить"
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
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'email'}
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
    </AuthForm>
  );
};
