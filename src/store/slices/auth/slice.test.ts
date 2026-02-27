import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/utils/token-storage', () => ({
  tokenStorage: { getRefreshToken: (): string | null => null },
}));

import {
  registerThunk,
  loginThunk,
  refreshTokenThunk,
  getUserThunk,
  checkUserAuthThunk,
  logoutThunk,
  editUserProfileThunk,
} from './actions';
import authReducer, { initialState, resetAuthState, clearAuth } from './slice';

describe('auth slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle resetAuthState', () => {
    const stateWithError = {
      ...initialState,
      authSuccess: true,
      error: 'some error',
    };
    expect(authReducer(stateWithError, resetAuthState())).toEqual({
      ...stateWithError,
      authSuccess: false,
      error: null,
    });
  });

  it('should handle clearAuth', () => {
    const stateWithUser = {
      ...initialState,
      user: { email: 'a@a.ru', name: 'A' },
      accessToken: 'at',
      refreshToken: 'rt',
      authSuccess: true,
      error: 'err',
    };
    expect(authReducer(stateWithUser, clearAuth())).toEqual(initialState);
  });

  it('should handle setIsAuthChecked', () => {
    expect(
      authReducer(undefined, { type: 'auth/setIsAuthChecked', payload: true })
    ).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  describe('registerThunk', () => {
    it('pending', () => {
      const next = authReducer(
        undefined,
        registerThunk.pending('reqId', { email: 'a@a.ru', password: '1', name: 'A' })
      );
      expect(next.isLoading).toBe(true);
      expect(next.error).toBe(null);
      expect(next.authSuccess).toBe(false);
    });

    it('fulfilled', () => {
      const payload = {
        user: { email: 'a@a.ru', name: 'A' },
        accessToken: 'at',
        refreshToken: 'rt',
      };
      const next = authReducer(
        undefined,
        registerThunk.fulfilled(payload, 'reqId', {
          email: 'a@a.ru',
          password: '1',
          name: 'A',
        })
      );
      expect(next).toEqual({
        ...initialState,
        isLoading: false,
        authSuccess: true,
        user: payload.user,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      });
    });

    it('rejected', () => {
      const next = authReducer(
        undefined,
        registerThunk.rejected(new Error('Network error'), 'reqId', {
          email: 'a@a.ru',
          password: '1',
          name: 'A',
        })
      );
      expect(next.isLoading).toBe(false);
      expect(next.authSuccess).toBe(false);
      expect(next.error).toBe('Network error');
    });
  });

  describe('loginThunk', () => {
    it('pending', () => {
      const next = authReducer(
        undefined,
        loginThunk.pending('reqId', { email: 'a@a.ru', password: '1' })
      );
      expect(next.isLoading).toBe(true);
      expect(next.authSuccess).toBe(false);
    });

    it('fulfilled', () => {
      const payload = {
        user: { email: 'a@a.ru', name: 'A' },
        accessToken: 'at',
        refreshToken: 'rt',
        email: 'a@a.ru',
        name: 'A',
      };
      const next = authReducer(
        undefined,
        loginThunk.fulfilled(payload, 'reqId', { email: 'a@a.ru', password: '1' })
      );
      expect(next).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        authSuccess: true,
        user: payload.user,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      });
    });

    it('rejected', () => {
      const next = authReducer(
        undefined,
        loginThunk.rejected(new Error('Invalid credentials'), 'reqId', {
          email: 'a@a.ru',
          password: '1',
        })
      );
      expect(next.isLoading).toBe(false);
      expect(next.authSuccess).toBe(false);
      expect(next.error).toBe('Invalid credentials');
    });
  });

  describe('refreshTokenThunk', () => {
    it('fulfilled', () => {
      const state = { ...initialState, accessToken: 'old', refreshToken: 'oldR' };
      const payload = { accessToken: 'newAt', refreshToken: 'newRt' };
      const next = authReducer(
        state,
        refreshTokenThunk.fulfilled(payload, 'reqId', undefined)
      );
      expect(next.accessToken).toBe('newAt');
      expect(next.refreshToken).toBe('newRt');
    });
  });

  describe('getUserThunk', () => {
    it('fulfilled', () => {
      const user = { email: 'u@u.ru', name: 'User' };
      const next = authReducer(
        undefined,
        getUserThunk.fulfilled({ user }, 'reqId', undefined)
      );
      expect(next.user).toEqual(user);
    });
  });

  describe('checkUserAuthThunk', () => {
    it('pending', () => {
      const next = authReducer(
        undefined,
        checkUserAuthThunk.pending('reqId', undefined)
      );
      expect(next.isAuthChecked).toBe(false);
    });

    it('fulfilled', () => {
      const next = authReducer(
        undefined,
        checkUserAuthThunk.fulfilled(
          { user: { email: 'a@a.ru', name: 'A' } },
          'reqId',
          undefined
        )
      );
      expect(next.isAuthChecked).toBe(true);
    });

    it('rejected', () => {
      const next = authReducer(
        undefined,
        checkUserAuthThunk.rejected(new Error('Unauthorized'), 'reqId', undefined)
      );
      expect(next.isAuthChecked).toBe(true);
    });
  });

  describe('logoutThunk', () => {
    it('fulfilled clears auth', () => {
      const state = {
        ...initialState,
        user: { email: 'a@a.ru', name: 'A' },
        accessToken: 'at',
        refreshToken: 'rt',
      };
      const next = authReducer(
        state,
        logoutThunk.fulfilled(undefined, 'reqId', undefined)
      );
      expect(next).toEqual(initialState);
    });

    it('rejected clears auth', () => {
      const state = {
        ...initialState,
        user: { email: 'a@a.ru', name: 'A' },
        accessToken: 'at',
      };
      const next = authReducer(
        state,
        logoutThunk.rejected(new Error('err'), 'reqId', undefined)
      );
      expect(next).toEqual(initialState);
    });
  });

  describe('editUserProfileThunk', () => {
    it('pending', () => {
      const next = authReducer(
        undefined,
        editUserProfileThunk.pending('reqId', { name: 'New' })
      );
      expect(next.isEditInProgress).toBe(true);
      expect(next.editError).toBe(null);
    });

    it('fulfilled', () => {
      const user = { email: 'e@e.ru', name: 'New Name' };
      const next = authReducer(
        undefined,
        editUserProfileThunk.fulfilled({ user }, 'reqId', { name: 'New Name' })
      );
      expect(next.user).toEqual(user);
      expect(next.isEditInProgress).toBe(false);
      expect(next.editError).toBe(null);
    });

    it('rejected', () => {
      const next = authReducer(
        undefined,
        editUserProfileThunk.rejected(new Error('Edit failed'), 'reqId', { name: 'New' })
      );
      expect(next.isEditInProgress).toBe(false);
      expect(next.editError).toBe('Edit failed');
    });
  });
});
