import styles from './page-layout.module.css';

type TPageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const PageLayout = ({
  children,
  className,
}: TPageLayoutProps): React.JSX.Element => {
  return (
    <div className={`${styles.container} ${className ?? ''}`.trim()}>{children}</div>
  );
};
