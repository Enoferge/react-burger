import { createWebSocketOrdersSlice } from '@/store/slices/create-websocket-orders-slice';

const profileHistorySlice = createWebSocketOrdersSlice('profileHistorySlice');

export const { onConnecting, onOpen, onClose, onError, onMessage } =
  profileHistorySlice.actions;
export default profileHistorySlice.reducer;
