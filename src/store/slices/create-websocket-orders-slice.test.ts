import { WebsocketStatus } from '@/store/middleware/types';
import { describe, it, expect } from 'vitest';

import { createWebSocketOrdersSlice } from './create-websocket-orders-slice';

import type { TOrdersData } from '@/store/types/feed-order';

const emptyOrdersData: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0,
};

describe('createWebSocketOrdersSlice', () => {
  it('should return initial state', () => {
    const slice = createWebSocketOrdersSlice('test');
    const state = slice.reducer(undefined, { type: '' });
    expect(state).toEqual({
      status: WebsocketStatus.OFFLINE,
      success: true,
      data: emptyOrdersData,
    });
  });

  it('should handle onConnecting', () => {
    const slice = createWebSocketOrdersSlice('test');
    const state = slice.reducer(undefined, slice.actions.onConnecting(undefined));
    expect(state.status).toBe(WebsocketStatus.CONNECTING);
  });

  it('should handle onOpen', () => {
    const slice = createWebSocketOrdersSlice('test');
    const state = slice.reducer(undefined, slice.actions.onOpen(undefined));
    expect(state.status).toBe(WebsocketStatus.ONLINE);
  });

  it('should handle onClose', () => {
    const slice = createWebSocketOrdersSlice('test');
    let state = slice.reducer(undefined, slice.actions.onOpen(undefined));
    state = slice.reducer(state, slice.actions.onClose(undefined));
    expect(state.status).toBe(WebsocketStatus.OFFLINE);
  });

  it('should handle onError', () => {
    const slice = createWebSocketOrdersSlice('test');
    const state = slice.reducer(undefined, slice.actions.onError('Connection failed'));
    expect(state.success).toBe(false);
    expect(state.error).toBe('Connection failed');
    expect(state.data).toEqual(emptyOrdersData);
  });

  it('should handle onMessage and sort orders by createdAt desc', () => {
    const slice = createWebSocketOrdersSlice('test');
    const payload: TOrdersData = {
      orders: [
        {
          _id: '1',
          ingredients: [],
          status: 'done',
          number: 1,
          name: 'First',
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-01-01T10:00:00Z',
        },
        {
          _id: '2',
          ingredients: [],
          status: 'done',
          number: 2,
          name: 'Second',
          createdAt: '2024-01-01T12:00:00Z',
          updatedAt: '2024-01-01T12:00:00Z',
        },
      ],
      total: 2,
      totalToday: 1,
    };
    const state = slice.reducer(undefined, slice.actions.onMessage(payload));
    expect(state.data.orders).toHaveLength(2);
    expect(state.data.orders[0]._id).toBe('2');
    expect(state.data.orders[1]._id).toBe('1');
    expect(state.data.total).toBe(2);
    expect(state.data.totalToday).toBe(1);
  });

  it('should handle onMessage with empty payload', () => {
    const slice = createWebSocketOrdersSlice('test');
    const state = slice.reducer(undefined, slice.actions.onMessage({} as TOrdersData));
    expect(state.data.orders).toEqual([]);
    expect(state.data.total).toBeUndefined();
    expect(state.data.totalToday).toBeUndefined();
  });
});
