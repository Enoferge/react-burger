import { createAction } from '@reduxjs/toolkit';

export const profileWsConnect = createAction<string, 'PROFILE_HISTORY_CONNECT'>(
  'PROFILE_HISTORY_CONNECT'
);
export const profileWsDisconnect = createAction<void, 'PROFILE_HISTORY_DISCONNECT'>(
  'PROFILE_HISTORY_DISCONNECT'
);
