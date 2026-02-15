import { CardOrdersList } from '@/components/card-orders-list/card-orders-list';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { selectProfileOrdersWithDetails } from '@/store/selectors/orders';
import {
  profileWsConnect,
  profileWsDisconnect,
} from '@/store/slices/profile-history/actions';
import { PROFILE_HISTORY_SERVER_URL } from '@/store/slices/profile-history/constants';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

import type { TEnrichedOrder } from '@/store/selectors/orders';

import sharedStyles from '../shared.module.css';
import styles from './profile-orders.module.css';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const orders = useAppSelector(selectProfileOrdersWithDetails);

  useEffect((): (() => void) => {
    dispatch(profileWsConnect(PROFILE_HISTORY_SERVER_URL));

    return (): void => {
      dispatch(profileWsDisconnect());
    };
  }, [dispatch]);

  const handleCardOrderClick = (order: TEnrichedOrder): void => {
    void navigate(`${ROUTES.PROFILE}/orders/${order.number}`, {
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
    <div className={`${styles.content} ${sharedStyles.pageMain}`}>
      {orders.length === 0 ? (
        <p className="text text_type_main-default text_color_inactive">
          История заказов пока пуста
        </p>
      ) : (
        <CardOrdersList
          orders={orders}
          onCardOrderClick={handleCardOrderClick}
          isStatusShown
        />
      )}
    </div>
  );
};
