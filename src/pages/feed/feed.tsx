import { OrdersList } from '@/components/orders-list/orders-list';
import { OrdersStatus } from '@/components/orders-status/orders-status';
import { useAppDispatch } from '@/hooks/use-redux-hooks';
import { feedWsConnect, feedWsDisconnect } from '@/store/slices/feed/actions';
import { FEED_SERVER_URL } from '@/store/slices/feed/constants';
import { useEffect } from 'react';

import sharedStyles from '../shared.module.css';
import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const connect = (): void => {
    dispatch(feedWsConnect(FEED_SERVER_URL));
  };
  const disconnect = (): void => {
    dispatch(feedWsDisconnect());
  };

  useEffect((): (() => void) => {
    void connect();

    return (): void => {
      disconnect();
    };
  }, [connect, disconnect]);

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
