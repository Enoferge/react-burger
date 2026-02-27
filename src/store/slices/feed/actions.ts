import { createAction } from '@reduxjs/toolkit';

export const feedWsConnect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');
export const feedWsDisconnect = createAction<void, 'FEED_DISCONNECT'>('FEED_DISCONNECT');
