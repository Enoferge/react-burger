import styles from './burger-constructor-empty-element.module.css';

type TConstructorElementProps = {
  type?: 'top' | 'bottom';
};

type TBurgerConstructorEmptyElementProps = {
  ingredientType: 'bun' | 'ingredient';
} & TConstructorElementProps;

export const BurgerConstructorEmptyElement = ({
  type,
  ingredientType,
}: TBurgerConstructorEmptyElementProps): React.JSX.Element => {
  const text = ingredientType === 'bun' ? 'Выберите булки' : 'Выберите ингредиенты';

  return (
    <div
      className={`${styles['empty-element']} ${type ? styles[`empty-element_pos_${type}`] : 'mr-4 ml-4'}`}
    >
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};
