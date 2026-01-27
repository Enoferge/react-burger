import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop, type DragSourceMonitor } from 'react-dnd';

import type { TConstructorIngredient } from '@/store/slices/burger-constructor/slice';
import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor-item.module.css';

type TBurgerConstructorElementProps = {
  type?: 'top' | 'bottom';
  isLocked?: boolean;
  handleClose?: () => void;
};

type TBurgerConstructorItemProps = {
  index?: number;
  ingredient: TConstructorIngredient | TIngredient;
  elementProps: TBurgerConstructorElementProps;
  moveIngredient?: (dragIndex: number, hoverIndex: number) => void;
};

type TDragItem = {
  id: string;
  index: number;
};

export const BurgerConstructorItem = ({
  index,
  ingredient,
  elementProps,
  moveIngredient,
}: TBurgerConstructorItemProps): React.JSX.Element => {
  let text = ingredient.name;

  if (elementProps.type === 'top') {
    text = `${ingredient.name} (верх)`;
  } else if (elementProps.type === 'bottom') {
    text = `${ingredient.name} (низ)`;
  }

  const ref = useRef<HTMLDivElement>(null);

  const isDraggable = moveIngredient !== undefined && index !== undefined;

  const [{ handlerId }, drop] = useDrop<
    TDragItem,
    void,
    { handlerId: string | symbol | null }
  >({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TDragItem, monitor) {
      if (!ref.current || !moveIngredient || index === undefined) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    canDrop: () => isDraggable,
  });

  const [{ isDragging }, drag] = useDrag<TDragItem, void, { isDragging: boolean }>({
    type: 'item',
    item: () => {
      const uniqueId = 'uniqueId' in ingredient ? ingredient.uniqueId : ingredient._id;
      return { id: uniqueId, index: index ?? 0 };
    },
    collect: (monitor: DragSourceMonitor<TDragItem, void>) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isDraggable,
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      className={styles.wrapper}
      ref={ref}
      style={{ opacity }}
      data-handler-id={isDraggable ? handlerId : undefined}
    >
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
