import { createWebSocketOrdersSlice } from '@/store/slices/create-websocket-orders-slice';

const feedSlice = createWebSocketOrdersSlice('feedSlice');

export const { onConnecting, onOpen, onClose, onError, onMessage } = feedSlice.actions;
export default feedSlice.reducer;
