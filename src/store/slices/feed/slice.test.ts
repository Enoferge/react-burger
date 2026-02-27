import { WebsocketStatus } from '@/store/middleware/types';
import { describe, it, expect } from 'vitest';

import feedReducer, { onConnecting, onOpen, onClose, onError, onMessage } from './slice';

const emptyData = { orders: [], total: 0, totalToday: 0 };

describe('feed slice', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, { type: '' })).toEqual({
      status: WebsocketStatus.OFFLINE,
      success: true,
      data: emptyData,
    });
  });

  it('should handle onConnecting', () => {
    const next = feedReducer(undefined, onConnecting(undefined));
    expect(next.status).toBe(WebsocketStatus.CONNECTING);
  });

  it('should handle onOpen', () => {
    const next = feedReducer(undefined, onOpen(undefined));
    expect(next.status).toBe(WebsocketStatus.ONLINE);
  });

  it('should handle onClose', () => {
    let state = feedReducer(undefined, onOpen(undefined));
    state = feedReducer(state, onClose(undefined));
    expect(state.status).toBe(WebsocketStatus.OFFLINE);
  });

  it('should handle onError', () => {
    const next = feedReducer(undefined, onError('error'));
    expect(next.success).toBe(false);
    expect(next.error).toBe('error');
    expect(next.data).toEqual(emptyData);
  });

  it('should handle onMessage', () => {
    const payload = { orders: [], total: 10, totalToday: 5 };
    const next = feedReducer(undefined, onMessage(payload));
    expect(next.data).toEqual(payload);
  });
});
