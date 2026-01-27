import { PageLayout } from '@/components/page-layout/page-layout';

import styles from './profile-orders.module.css';

export const ProfileOrders = (): React.JSX.Element => {
  return (
    <PageLayout className={styles.wrapper}>
      <div className={styles.content}>
        <p className="text text_type_main-default text_color_inactive">
          История заказов пока пуста
        </p>
      </div>
    </PageLayout>
  );
};
