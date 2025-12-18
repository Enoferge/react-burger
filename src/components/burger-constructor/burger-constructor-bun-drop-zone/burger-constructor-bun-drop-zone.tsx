import { setBun } from '@/store/slices/burger-constructor/slice';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { BurgerConstructorEmptyElement } from '../burger-constructor-empty-element/burger-constructor-empty-element';
import { BurgerConstructorItem } from '../burger-constuctor-item/burger-constructor-item';

import type { AppDispatch } from '@/store';
import type { TConstructorIngredient } from '@/store/slices/burger-constructor/slice';
import type { Ref } from 'react';

type TBurgerConstructorBunDropZoneProps = {
  type: 'top' | 'bottom';
  bun: TConstructorIngredient | null;
};

export const BurgerConstructorBunDropZone = ({
  type,
  bun,
}: TBurgerConstructorBunDropZoneProps): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [{ isDragging }, dropBunTarget] = useDrop({
    accept: 'bun',
    drop: (item: { ingredient: TConstructorIngredient }) => {
      dispatch(setBun(item.ingredient));
    },
    collect: (monitor) => ({
      isDragging: monitor.canDrop(),
    }),
  });

  return (
    <div ref={dropBunTarget as unknown as Ref<HTMLDivElement>}>
      {bun ? (
        <BurgerConstructorItem
          ingredient={bun}
          elementProps={{
            type,
            isLocked: true,
          }}
        />
      ) : (
        <BurgerConstructorEmptyElement
          ingredientType="bun"
          type={type}
          isAccented={isDragging}
        />
      )}
    </div>
  );
};
