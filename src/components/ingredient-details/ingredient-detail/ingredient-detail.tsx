import styles from './ingredient-detail.module.css';

type TIngredientDetailProps = {
  label: string;
  value: number;
};

export const IngredientDetail = ({
  label,
  value,
}: TIngredientDetailProps): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <span className="text text_type_main-default text_color_inactive">{label}</span>
      <span className="text text_type_digits-default text_color_inactive">{value}</span>
    </div>
  );
};
