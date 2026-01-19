import styles from './page-layout.module.css';

type TPageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout = ({ children }: TPageLayoutProps): React.JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};
