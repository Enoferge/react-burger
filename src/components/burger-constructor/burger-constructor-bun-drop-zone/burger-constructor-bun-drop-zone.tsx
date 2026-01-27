import { useAppDispatch } from '@/hooks/use-redux-hooks';
import { setBun } from '@/store/slices/burger-constructor/slice';
import { useDrop } from 'react-dnd';

import { BurgerConstructorEmptyElement } from '../burger-constructor-empty-element/burger-constructor-empty-element';
import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';

import type { TIngredient } from '@/utils/types';
import type { Ref } from 'react';

type TBurgerConstructorBunDropZoneProps = {
  type: 'top' | 'bottom';
  bun: TIngredient | null;
};

export const BurgerConstructorBunDropZone = ({
  type,
  bun,
}: TBurgerConstructorBunDropZoneProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, dropBunTarget] = useDrop({
    accept: 'bun',
    drop: (item: { ingredient: TIngredient }) => {
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
