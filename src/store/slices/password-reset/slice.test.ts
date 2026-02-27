import { describe, it, expect } from 'vitest';

import { requestPasswordResetThunk, confirmPasswordResetThunk } from './actions';
import passwordResetReducer, { resetState } from './slice';

const initialState = {
  isLoading: false,
  error: null,
  resetRequestSuccess: false,
  resetConfirmSuccess: false,
  message: null,
};

const testEmail = 'enofergetest@yandex.ru';

describe('passwordReset slice', () => {
  it('should return the initial state', () => {
    expect(passwordResetReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle resetState', () => {
    const state = {
      ...initialState,
      resetRequestSuccess: true,
      resetConfirmSuccess: true,
      error: 'err',
      message: 'msg',
    };
    const next = passwordResetReducer(state, resetState());
    expect(next).toEqual(initialState);
  });

  describe('requestPasswordResetThunk', () => {
    it('pending', () => {
      const next = passwordResetReducer(
        undefined,
        requestPasswordResetThunk.pending('reqId', { email: testEmail })
      );
      expect(next.isLoading).toBe(true);
      expect(next.error).toBe(null);
      expect(next.resetRequestSuccess).toBe(false);
    });

    it('fulfilled', () => {
      const next = passwordResetReducer(
        undefined,
        requestPasswordResetThunk.fulfilled({ message: 'Email sent' }, 'reqId', {
          email: testEmail,
        })
      );
      expect(next.isLoading).toBe(false);
      expect(next.resetRequestSuccess).toBe(true);
      expect(next.message).toBe('Email sent');
    });

    it('rejected', () => {
      const next = passwordResetReducer(
        undefined,
        requestPasswordResetThunk.rejected(new Error('Request failed'), 'reqId', {
          email: testEmail,
        })
      );
      expect(next.isLoading).toBe(false);
      expect(next.error).toBe('Request failed');
      expect(next.resetRequestSuccess).toBe(false);
    });
  });

  describe('confirmPasswordResetThunk', () => {
    it('pending', () => {
      const next = passwordResetReducer(
        undefined,
        confirmPasswordResetThunk.pending('reqId', { password: 'new', token: 't' })
      );
      expect(next.isLoading).toBe(true);
      expect(next.error).toBe(null);
      expect(next.resetConfirmSuccess).toBe(false);
    });

    it('fulfilled', () => {
      const next = passwordResetReducer(
        undefined,
        confirmPasswordResetThunk.fulfilled({ message: 'Password reset' }, 'reqId', {
          password: 'new',
          token: 't',
        })
      );
      expect(next.isLoading).toBe(false);
      expect(next.resetConfirmSuccess).toBe(true);
      expect(next.message).toBe('Password reset');
    });

    it('rejected', () => {
      const next = passwordResetReducer(
        undefined,
        confirmPasswordResetThunk.rejected(new Error('Confirm failed'), 'reqId', {
          password: 'new',
          token: 't',
        })
      );
      expect(next.isLoading).toBe(false);
      expect(next.error).toBe('Confirm failed');
      expect(next.resetConfirmSuccess).toBe(false);
    });
  });
});
