import { MiddlewareAPI } from 'redux';
import { wsManager } from './WebSocketManager.tsx';

const createWebSocketMiddleware = (
  key: string,
  url: string,
  actionTypes: any,
) => {
  return (store: MiddlewareAPI) => {
    let reconnectInterval: NodeJS.Timeout | null = null;
    const connect = (id: number) => {
      wsManager.connect(
        key,
        url + id,
        (data) => store.dispatch(actionTypes.RECEIVE_MESSAGE(data)),
        () => reconnect(id),
        () => reconnect(id),
      );
    };

    const reconnect = (id: number) => {
      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
      reconnectInterval = setTimeout(() => {
        connect(id);
      }, 10000);
    };

    return (next: any) => (action: any) => {
      switch (action.type) {
        case actionTypes.CONNECT:
          const { id } = action.payload;
          connect(id);
          break;
        case actionTypes.DISCONNECT:
          if (reconnectInterval) clearInterval(reconnectInterval);
          wsManager.disconnect(key);
          break;
        case actionTypes.SEND_MESSAGE.name:
          wsManager.send(key, action.payload);
          break;
        default:
          return next(action);
      }
    };
  };
};

export default createWebSocketMiddleware;
