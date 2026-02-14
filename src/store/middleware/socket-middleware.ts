import type { TRootState } from '..';
import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  AsyncThunk,
  Middleware,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';

type TRefreshTokenPayload = { accessToken: string; refreshToken: string };

export type TWSActions<R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_TIMEOUT = 5000;

export const socketMiddleware = <R>(
  wsActions: TWSActions<R>,
  refreshTokenThunk?: AsyncThunk<TRefreshTokenPayload, void, object>
): Middleware<Record<string, never>, TRootState> => {
  const withToken = Boolean(refreshTokenThunk);

  return (store) => {
    let socket: WebSocket | null = null;
    const { connect, disconnect, onConnecting, onOpen, onClose, onMessage, onError } =
      wsActions;

    const dispatch = store.dispatch as ThunkDispatch<TRootState, unknown, UnknownAction>;
    let isConnected = false;
    let wasOpened = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action) => {
      if (connect.match(action)) {
        if (socket) {
          clearTimeout(reconnectTimer);
          socket.close();
          socket = null;
        }

        url = action.payload;

        const wssUrl = new URL(url);

        if (withToken) {
          const token = store.getState().auth.accessToken ?? '';
          wssUrl.searchParams.set('token', token?.replace('Bearer ', ''));
        }

        socket = new WebSocket(wssUrl.toString());
        onConnecting?.();
        isConnected = true;

        socket.onopen = (): void => {
          wasOpened = true;
          onOpen && dispatch(onOpen());
        };

        socket.onclose = (): void => {
          dispatch(onClose());

          if (isConnected && wasOpened) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_TIMEOUT);
          }
        };

        socket.onmessage = (event): void => {
          try {
            const data = JSON.parse(String(event.data)) as unknown;

            if (
              withToken &&
              refreshTokenThunk &&
              typeof data === 'object' &&
              data !== null &&
              !('orders' in data)
            ) {
              dispatch(disconnect());

              void dispatch(refreshTokenThunk())
                .unwrap()
                .then((refreshData: TRefreshTokenPayload) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    'token',
                    refreshData.accessToken.replace('Bearer ', '')
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch(() => {
                  onError && dispatch(onError('Failed to refresh token'));
                });

              return;
            }

            dispatch(onMessage?.(data as R));
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            dispatch(onError?.(message));
          }
        };

        socket.onerror = (): void => {
          onError && dispatch(onError('WebSocket error'));
        };
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        socket.close();
      }

      next(action);
    };
  };
};
