import { EventChannel, eventChannel, SagaIterator } from 'redux-saga';
import { receiveMessage } from '../../reducers/MessageSlice.tsx';
import { Message } from '../../../constant/types/event.ts';
import { take, call, fork, put } from 'redux-saga/effects';
import { BASE_URL } from '../../../setting/config.ts';

const WS_CONNECT_MESSAGE = 'WS_CONNECT_MESSAGE';
const WS_DISCONNECT_MESSAGE = 'WS_DISCONNECT_MESSAGE';
const WS_CREATE_MESSAGE = 'WS_CREATE_MESSAGE';

export const webSocketConnectMessage = (id: number) => ({
  type: WS_CONNECT_MESSAGE,
  payload: id,
});
export const webSocketDisconnectMessage = () => ({
  type: WS_DISCONNECT_MESSAGE,
});
export const webSocketCreateMessage = (message: Message) => ({
  type: WS_CREATE_MESSAGE,
  payload: message,
});

function createMessageSocketSaga(socket: WebSocket): EventChannel<any> {
  return eventChannel((emit) => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      emit(receiveMessage(message));
    };
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      emit(new Error('WebSocket error'));
    };
    socket.onclose = () => {
      emit(new Error('Socket closed'));
    };
    return () => {
      socket.close();
    };
  });
}

function* watchWebSocketConnection(): SagaIterator {
  while (true) {
    const { payload: id } = yield take(WS_CONNECT_MESSAGE);
    const socket = new WebSocket(BASE_URL + `/ws/assignment/${id}/messages/`);
    const socketChannel = yield call(createMessageSocketSaga, socket);

    yield fork(readFromSocket, socketChannel);
    yield fork(writeToSocket, socket);
  }
}

function* readFromSocket(socketChannel: EventChannel<any>) {
  while (true) {
    try {
      const message: Message = yield;
      take(socketChannel);
      yield put(receiveMessage(message));
    } catch (error) {
      console.error('Socket error:', error);
    }
  }
}

function* writeToSocket(socket: WebSocket): SagaIterator {
  while (true) {
    const { payload } = yield take('WS_SEND_MESSAGE');
    socket.send(JSON.stringify(payload));
    try {
    } catch (error) {
      console.error('Socket error:', error);
    }
  }
}

function* webSocketSaga() {
  yield fork(watchWebSocketConnection);
}

export default webSocketSaga;
