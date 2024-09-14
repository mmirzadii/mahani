import { MiddlewareAPI } from 'redux';
import { wsManager } from './WebSocketManager.tsx';

const createWebSocketMiddleware = (
  key: string,
  url: string,
  actionTypes: any,
) => {
  return (store: MiddlewareAPI) => {
    let reconnectInterval: NodeJS.Timeout | null = null;
    const connect = () => {
      wsManager.connect(
        key,
        url,
        (data) => store.dispatch(actionTypes.RECEIVE_MESSAGE(data)),
        () => reconnect(),
        () => reconnect(),
      );
    };

    const reconnect = () => {
      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
      reconnectInterval = setTimeout(() => {
        connect();
      }, 10000);
    };

    return (next: any) => (action: any) => {
      switch (action.type) {
        case actionTypes.CONNECT:
          connect();
          break;
        case actionTypes.DISCONNECT:
          if (reconnectInterval) clearInterval(reconnectInterval);
          wsManager.disconnect(key);
          break;
        case actionTypes.SEND_MESSAGE:
          wsManager.send(key, action.payload);
          break;
        default:
          return next(action);
      }
    };
  };
};

export default createWebSocketMiddleware;
