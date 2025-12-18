import styles from './burger-constructor-empty-element.module.css';

type TConstructorElementProps = {
  type?: 'top' | 'bottom';
};

type TBurgerConstructorEmptyElementProps = {
  ingredientType: 'bun' | 'ingredient';
  isAccented?: boolean;
} & TConstructorElementProps;

export const BurgerConstructorEmptyElement = ({
  type,
  ingredientType,
  isAccented,
}: TBurgerConstructorEmptyElementProps): React.JSX.Element => {
  const text = ingredientType === 'bun' ? 'Выберите булки' : 'Выберите ингредиенты';

  return (
    <div
      className={`${styles['empty-element']} ${isAccented ? `${styles['empty-state-accented']}` : ''} ${type ? styles[`empty-element_pos_${type}`] : ''}`}
    >
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};
