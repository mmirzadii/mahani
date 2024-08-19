import { configureStore } from '@reduxjs/toolkit';
import StudentReducer from './reducers/StudentSlice.tsx';

const store = configureStore({
  reducer: {
    student: StudentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;

export default store;
