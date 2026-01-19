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

  const positionClass =
    type === 'top'
      ? styles['empty-element_pos_top']
      : type === 'bottom'
        ? styles['empty-element_pos_bottom']
        : '';

  return (
    <div
      className={`${styles['empty-element']} ${isAccented ? styles['empty-state-accented'] : ''} ${positionClass}`}
    >
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};
