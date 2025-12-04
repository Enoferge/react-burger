import { OrderProvider, type TOrder } from '@/contexts/order-context';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ingredients } from '@utils/ingredients';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const order: TOrder = {
    '60666c42cc7b410027a1a9b1': 2,
  };

  return (
    <OrderProvider order={order}>
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      </div>
    </OrderProvider>
  );
};

export default App;
