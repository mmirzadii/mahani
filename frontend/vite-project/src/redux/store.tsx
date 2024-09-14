import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './reducers/EventSlice.tsx';
import sessionReducer from './reducers/SessionSlice.tsx';
import userReducer from './reducers/UserSlice.tsx';
import groupReducer from './reducers/GroupSlice.tsx';
import assignmentReducer from './reducers/AssignmentSlice.tsx';
import messageReducer from './reducers/MessageSlice.tsx';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    event: eventReducer,
    group: groupReducer,
    message: messageReducer,
    assignment: assignmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;

export default store;
