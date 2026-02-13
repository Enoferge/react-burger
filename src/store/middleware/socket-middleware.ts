import type { TRootState } from '..';
import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

type TWSActions<R> = {
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
  withToken = false
): Middleware<Record<string, never>, TRootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { connect, disconnect, onConnecting, onOpen, onClose, onMessage, onError } =
      wsActions;

    const { dispatch } = store;
    let isConnected = false;
    let wasOpened = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action) => {
      if (connect.match(action)) {
        // const token = store.getState().auth.accessToken || '';

        url = action.payload;
        wasOpened = false;

        const wssUrl = new URL(url);
        // wssUrl.searchParams.set('token', token?.replace('Bearer ', ''));
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
              typeof data === 'object' &&
              data !== null &&
              'message' in data &&
              (data as { message: string }).message === 'Invalid or missing token'
            ) {
              // refreshToken().then((refreshData) => {
              //   const wssUrl = new URL(url);
              //   wssUrl.searchParams.set(
              //     'token',
              //     refreshData.accessToken.replace('Bearer ', '')
              //   );
              //   dispatch(connect(wssUrl.toString()));
              // });
              // dispatch(disconnect());
              // return;
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
