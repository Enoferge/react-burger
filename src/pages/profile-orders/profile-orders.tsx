import { PageLayout } from '@/components/page-layout/page-layout';
import { useAppDispatch } from '@/hooks/use-redux-hooks';
import {
  profileWsConnect,
  profileWsDisconnect,
} from '@/store/slices/profile-history/actions';
import { PROFILE_HISTORY_SERVER_URL } from '@/store/slices/profile-history/constants';
import { useEffect } from 'react';

import styles from './profile-orders.module.css';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect((): (() => void) => {
    dispatch(profileWsConnect(PROFILE_HISTORY_SERVER_URL));

    return (): void => {
      dispatch(profileWsDisconnect());
    };
  }, [dispatch]);

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
