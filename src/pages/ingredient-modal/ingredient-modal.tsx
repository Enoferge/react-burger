import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import { Modal } from '@/components/modal/modal';
import { useAppSelector } from '@/hooks/use-redux-hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const IngredientModal = (): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const ingredient = useAppSelector((state) =>
    state.ingredients.ingredients.find((item) => item._id === id)
  );

  const onClose = (): void => {
    void navigate(-1);
  };

  return (
    <Modal title="Детали ингредиента" onClose={onClose}>
      {ingredient && <IngredientDetails ingredient={ingredient} />}
    </Modal>
  );
};
