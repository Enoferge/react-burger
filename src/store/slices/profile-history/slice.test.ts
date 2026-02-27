import { WebsocketStatus } from '@/store/middleware/types';
import { webSocketOrdersInitialState } from '@/store/slices/create-websocket-orders-slice';
import { describe, it, expect } from 'vitest';

import profileHistoryReducer, {
  onConnecting,
  onOpen,
  onClose,
  onError,
  onMessage,
} from './slice';

describe('profileHistory slice', () => {
  it('should return the initial state', () => {
    expect(profileHistoryReducer(undefined, { type: '' })).toEqual(
      webSocketOrdersInitialState
    );
  });

  it('should handle onConnecting', () => {
    const next = profileHistoryReducer(undefined, onConnecting(undefined));
    expect(next.status).toBe(WebsocketStatus.CONNECTING);
  });

  it('should handle onOpen', () => {
    const next = profileHistoryReducer(undefined, onOpen(undefined));
    expect(next.status).toBe(WebsocketStatus.ONLINE);
  });

  it('should handle onClose', () => {
    let state = profileHistoryReducer(undefined, onOpen(undefined));
    state = profileHistoryReducer(state, onClose(undefined));
    expect(state.status).toBe(WebsocketStatus.OFFLINE);
  });

  it('should handle onError', () => {
    const next = profileHistoryReducer(undefined, onError('ws error'));
    expect(next.success).toBe(false);
    expect(next.error).toBe('ws error');
    expect(next.data).toEqual(webSocketOrdersInitialState.data);
  });

  it('should handle onMessage', () => {
    const payload = { orders: [], total: 3, totalToday: 1 };
    const next = profileHistoryReducer(undefined, onMessage(payload));
    expect(next.data).toEqual(payload);
  });
});
