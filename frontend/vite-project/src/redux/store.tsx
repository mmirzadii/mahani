import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './reducers/EventSlice.tsx';
import sessionSlice from './reducers/SessionSlice.tsx';
import userSlice from './reducers/UserSlice.tsx';

const store = configureStore({
  reducer: {
    session: sessionSlice,
    user: userSlice,
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;

export default store;
