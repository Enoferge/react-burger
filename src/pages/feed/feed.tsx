import { CardOrdersList } from '@/components/card-orders-list/card-orders-list';
import { OrdersStatus } from '@/components/orders-status/orders-status';
import { useAppDispatch } from '@/hooks/use-redux-hooks';
import { feedWsConnect, feedWsDisconnect } from '@/store/slices/feed/actions';
import { FEED_SERVER_URL } from '@/store/slices/feed/constants';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

import type { TEnrichedOrder } from '@/store/selectors/orders';

import sharedStyles from '../shared.module.css';
import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect((): (() => void) => {
    dispatch(feedWsConnect(FEED_SERVER_URL));

    return (): void => {
      dispatch(feedWsDisconnect());
    };
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCardOrderClick = (order: TEnrichedOrder): void => {
    void navigate(`${ROUTES.FEED}/${order.number}`, {
      state: {
        background: {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
        },
      },
    });
  };

  return (
    <>
      <h1 className={`text_type_main-large mt-10 mb-5 pl-5 ${sharedStyles.pageTitle}`}>
        Лента заказов
      </h1>
      <main
        className={`${sharedStyles.pageMain} ${sharedStyles.pageMainWithGap} pl-5 pr-5`}
      >
        <CardOrdersList
          className={styles.section}
          onCardOrderClick={handleCardOrderClick}
        />
        <OrdersStatus className={styles.section} />
      </main>
    </>
  );
};
