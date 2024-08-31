import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice.tsx';
import eventReducer from './reducers/EventSlice.tsx';

const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;

export default store;
