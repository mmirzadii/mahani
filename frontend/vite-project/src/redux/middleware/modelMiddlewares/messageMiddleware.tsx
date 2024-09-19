import createWebSocketMiddleware from '../createWebSocketMiddleware.tsx';
import { BASE_URL } from '../../../setting/config.ts';

export const messageMiddleware = createWebSocketMiddleware(
  'message',
  `${BASE_URL}/ws/messages/assignment/`,
  {},
);
