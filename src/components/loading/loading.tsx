import styles from './loading.module.css';

type LoadingProps = {
  message?: string;
  className?: string;
};

export const Loading = ({
  message = 'Загрузка...',
  className,
}: LoadingProps): React.JSX.Element => {
  return (
    <div className={`${styles.wrapper}  p-8 ${className ?? ''}`}>
      <p className="text text_type_main-default text_color_inactive">{message}</p>
    </div>
  );
};
