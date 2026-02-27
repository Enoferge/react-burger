export const WebsocketStatus = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
} as const;

export type TWebsocketStatus = (typeof WebsocketStatus)[keyof typeof WebsocketStatus];
