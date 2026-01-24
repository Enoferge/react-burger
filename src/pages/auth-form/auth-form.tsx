import { PageLayout } from '@/components/page-layout/page-layout';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { ReactNode } from 'react';

import styles from './auth-form.module.css';

type AuthLink = {
  text: string;
  linkText: string;
  to: string;
};

type AuthFormProps = {
  title: string;
  buttonText: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  links?: AuthLink[];
  error?: string | null;
};

export const AuthForm = ({
  title,
  buttonText,
  onSubmit,
  children,
  links,
  error,
}: AuthFormProps): React.JSX.Element => {
  return (
    <PageLayout>
      <main className={styles.wrapper}>
        <h1 className="text text_type_main-medium">{title}</h1>
        <form onSubmit={onSubmit} className={`${styles.form} mt-6`}>
          {children}
          {error && (
            <p className="text text_type_main-default text_color_error mt-4">{error}</p>
          )}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`${styles.button} mt-6`}
          >
            {buttonText}
          </Button>
        </form>
        {links && links.length > 0 && (
          <div className={`${styles.links} text text_type_main-default mt-20`}>
            {links.map((link, index) => (
              <div key={index}>
                {link.text}
                <Link to={link.to} className={`${styles.link} ml-2`}>
                  {link.linkText}
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </PageLayout>
  );
};
