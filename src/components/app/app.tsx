import { OrderProvider } from '@/contexts/order-context';
import { useCreateOrder } from '@/hooks/use-create-order';
import { useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ingredients } from '@utils/ingredients';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import styles from './app.module.css';

const AppContent = (): React.JSX.Element => {
  const [isOrderDetailsModalOpened, setIsOrderDetailsModalOpened] = useState(false);
  const { orderId, handleCreateOrder, isOrderCreating } = useCreateOrder({
    onCreationSuccess: () => setIsOrderDetailsModalOpened(true),
  });

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor
          ingredients={ingredients}
          onCreateOrder={handleCreateOrder}
          isOrderCreating={isOrderCreating}
        />
        <Modal
          isOpened={isOrderDetailsModalOpened}
          onClose={(): void => setIsOrderDetailsModalOpened(false)}
        >
          <OrderDetails id={orderId} />
        </Modal>
      </main>
    </div>
  );
};

export const App = (): React.JSX.Element => {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  );
};

export default App;
