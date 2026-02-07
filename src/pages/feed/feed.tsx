import { OrdersList } from '@/components/orders-list/orders-list';
import { OrdersStatus } from '@/components/orders-status/orders-status';

import sharedStyles from '../shared.module.css';
import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  return (
    <>
      <h1 className={`text_type_main-large mt-10 mb-5 pl-5 ${sharedStyles.pageTitle}`}>
        Лента заказов
      </h1>
      <main
        className={`${sharedStyles.pageMain} ${sharedStyles.pageMainWithGap} pl-5 pr-5`}
      >
        <OrdersList className={styles.section} />
        <OrdersStatus className={styles.section} />
      </main>
    </>
  );
};
