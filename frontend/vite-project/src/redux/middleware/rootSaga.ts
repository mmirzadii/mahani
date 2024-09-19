import { all, fork } from 'redux-saga/effects';
import messageSaga from './socketSagas/messageSocketSaga.ts';

export default function* () {
  yield all([fork(messageSaga)]);
}
