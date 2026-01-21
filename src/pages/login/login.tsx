import { PageLayout } from '@/components/page-layout/page-layout';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../constants';

import styles from './login.module.css';

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
    <PageLayout>
      <main className={styles.wrapper}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <form onSubmit={handleSubmit} className={`${styles.form} mt-6`}>
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
          <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
            Войти
          </Button>
        </form>
        <div className={`${styles.links} text text_type_main-default mt-20`}>
          <div className="">
            Вы — новый пользователь?
            <Link to={ROUTES.REGISTER} className={`${styles.link} ml-2`}>
              Зарегистрироваться
            </Link>
          </div>
          <div>
            Забыли пароль?
            <Link to={ROUTES.FORGOT_PASS} className={`${styles.link} ml-2`}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};
