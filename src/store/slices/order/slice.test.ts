import { describe, it, expect, vi } from 'vitest';

vi.mock('./actions', () => {
  const withType = <T extends (...args: never[]) => object>(fn: T, type: string): T => {
    (fn as { type?: string }).type = type;
    return fn;
  };
  return {
    createOrderThunk: {
      pending: withType(
        (requestId: string, arg: string[]) => ({
          type: 'order/createOrder/pending',
          payload: undefined,
          meta: { requestId, arg },
        }),
        'order/createOrder/pending'
      ),
      fulfilled: withType(
        (
          payload: { name: string; order: { number: number } },
          requestId: string,
          arg: string[]
        ) => ({
          type: 'order/createOrder/fulfilled',
          payload,
          meta: { requestId, arg },
        }),
        'order/createOrder/fulfilled'
      ),
      rejected: withType(
        (_err: unknown, requestId: string, arg: string[]) => ({
          type: 'order/createOrder/rejected',
          error: { message: 'err', name: 'Error' },
          meta: { requestId, arg, rejectedWithValue: false },
        }),
        'order/createOrder/rejected'
      ),
    },
    getOrderByNumberThunk: {
      pending: withType(
        (requestId: string, arg: string) => ({
          type: 'order/getOrderByNumber/pending',
          payload: undefined,
          meta: { requestId, arg },
        }),
        'order/getOrderByNumber/pending'
      ),
      fulfilled: withType(
        (
          payload: { orders: Record<string, unknown>[] },
          requestId: string,
          arg: string
        ) => ({
          type: 'order/getOrderByNumber/fulfilled',
          payload,
          meta: { requestId, arg },
        }),
        'order/getOrderByNumber/fulfilled'
      ),
      rejected: withType(
        (_err: unknown, requestId: string, arg: string) => ({
          type: 'order/getOrderByNumber/rejected',
          error: { message: 'err', name: 'Error' },
          meta: { requestId, arg, rejectedWithValue: false },
        }),
        'order/getOrderByNumber/rejected'
      ),
    },
  };
});

import { createOrderThunk, getOrderByNumberThunk } from './actions';
import orderReducer, {
  initialState,
  setOrder,
  setIsCreating,
  clearOrder,
} from './slice';

describe('order slice', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setOrder', () => {
    const order = { number: 12345 };
    const next = orderReducer(undefined, setOrder(order));
    expect(next.order).toEqual(order);
  });

  it('should handle setIsCreating', () => {
    const next = orderReducer(undefined, setIsCreating(true));
    expect(next.isCreating).toBe(true);
  });

  it('should handle clearOrder', () => {
    const state = {
      ...initialState,
      order: { number: 1 },
      isCreating: true,
    };
    const next = orderReducer(state, clearOrder());
    expect(next.order).toBe(null);
    expect(next.isCreating).toBe(false);
  });

  describe('createOrderThunk', () => {
    it('pending', () => {
      const next = orderReducer(undefined, createOrderThunk.pending('reqId', []));
      expect(next.isCreating).toBe(true);
    });

    it('fulfilled', () => {
      const payload = { name: 'Order name', order: { number: 999 } };
      const next = orderReducer(
        undefined,
        createOrderThunk.fulfilled(payload, 'reqId', [])
      );
      expect(next.isCreating).toBe(false);
      expect(next.order).toEqual({ number: 999 });
      expect(next.name).toBe('Order name');
    });

    it('rejected', () => {
      const state = { ...initialState, isCreating: true, order: { number: 1 } };
      const next = orderReducer(
        state,
        createOrderThunk.rejected(new Error('err'), 'reqId', [])
      );
      expect(next.isCreating).toBe(false);
      expect(next.order).toBe(null);
    });
  });

  describe('getOrderByNumberThunk', () => {
    it('pending', () => {
      const next = orderReducer(undefined, getOrderByNumberThunk.pending('reqId', '1'));
      expect(next.isOrderDetailsLoading).toBe(true);
    });

    it('fulfilled', () => {
      const orderDetails = {
        _id: 'id',
        ingredients: [],
        status: 'done' as const,
        number: 1,
        name: 'Order',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        owner: 'user',
      };
      const next = orderReducer(
        undefined,
        getOrderByNumberThunk.fulfilled({ orders: [orderDetails] }, 'reqId', '1')
      );
      expect(next.isOrderDetailsLoading).toBe(false);
      expect(next.orderDetails).toEqual(orderDetails);
    });

    it('fulfilled with empty orders', () => {
      const next = orderReducer(
        undefined,
        getOrderByNumberThunk.fulfilled({ orders: [] }, 'reqId', '1')
      );
      expect(next.orderDetails).toBe(null);
    });

    it('rejected', () => {
      const state = { ...initialState, orderDetails: {} as never };
      const next = orderReducer(
        state,
        getOrderByNumberThunk.rejected(new Error('err'), 'reqId', '1')
      );
      expect(next.isOrderDetailsLoading).toBe(false);
      expect(next.orderDetails).toBe(null);
    });
  });
});
