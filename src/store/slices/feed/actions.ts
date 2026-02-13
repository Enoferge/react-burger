import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');
export const wsDisconnect = createAction<void, 'FEED_DISCONNECT'>('FEED_DISCONNECT');
