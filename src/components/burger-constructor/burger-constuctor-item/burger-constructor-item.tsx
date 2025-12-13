import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor-item.module.css';

type TBurgerConstructorElementProps = {
  type?: 'top' | 'bottom';
  isLocked?: boolean;
  handleClose: () => void;
};

type TBurgerConstructorItemProps = {
  ingredient: TIngredient;
  elementProps: TBurgerConstructorElementProps;
};

export const BurgerConstructorItem = ({
  ingredient,
  elementProps,
}: TBurgerConstructorItemProps): React.JSX.Element => {
  let text = ingredient.name;

  if (elementProps.type === 'top') {
    text = `${ingredient.name} (верх)`;
  } else if (elementProps.type === 'bottom') {
    text = `${ingredient.name} (низ)`;
  }

  return (
    <div className={styles.wrapper}>
      <DragIcon
        type="primary"
        className={`${styles.drag_icon} ${elementProps.isLocked ? styles.drag_icon_hidden : ''}`}
      />
      <ConstructorElement
        extraClass={styles.constructor_element}
        text={text}
        price={ingredient.price}
        thumbnail={ingredient.image}
        {...elementProps}
      />
    </div>
  );
};
