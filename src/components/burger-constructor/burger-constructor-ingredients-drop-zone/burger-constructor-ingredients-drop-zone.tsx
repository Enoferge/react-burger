import { addIngredient, moveIngredient } from '@/store/slices/burger-constructor/slice';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { BurgerConstructorEmptyElement } from '../burger-constructor-empty-element/burger-constructor-empty-element';
import { BurgerConstructorItem } from '../burger-constuctor-item/burger-constructor-item';

import type { AppDispatch } from '@/store';
import type { TConstructorIngredient } from '@/store/slices/burger-constructor/slice';
import type { Ref } from 'react';

import styles from './burger-constructor-ingredients-drop-zone.module.css';

type TBurgerConstructorIngredientsDropZoneProps = {
  ingredients: TConstructorIngredient[];
  onRemoveIngredient: (ingredient: TConstructorIngredient) => void;
};

export const BurgerConstructorIngredientsDropZone = ({
  ingredients,
  onRemoveIngredient,
}: TBurgerConstructorIngredientsDropZoneProps): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [{ isDragging }, dropIngredientsTarget] = useDrop({
    accept: 'ingredient',
    drop: (item: { ingredient: TConstructorIngredient }) => {
      dispatch(addIngredient(item.ingredient));
    },
    collect: (monitor) => ({
      isDragging: monitor.canDrop(),
    }),
  });

  const moveIngredientHandler = (dragIndex: number, hoverIndex: number): void => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  return (
    <div
      ref={dropIngredientsTarget as unknown as Ref<HTMLDivElement>}
      className={styles.ingredients_drop_zone}
    >
      {ingredients.length ? (
        <ul className={`${styles.scrollable_area}`}>
          {ingredients.map((ingredient, index) => (
            <li key={ingredient.uniqueId}>
              <BurgerConstructorItem
                index={index}
                ingredient={ingredient}
                elementProps={{
                  isLocked: false,
                  handleClose: () => onRemoveIngredient(ingredient),
                }}
                moveIngredient={moveIngredientHandler}
              />
            </li>
          ))}
        </ul>
      ) : (
        <BurgerConstructorEmptyElement
          ingredientType="ingredient"
          isAccented={isDragging}
        />
      )}
    </div>
  );
};
