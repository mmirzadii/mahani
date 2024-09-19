import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';
import camelToSnake from '../../functional/ConvertCase.tsx';

export const getMessages = createAsyncThunk<
  { messages: Message[]; nextPage: string | null },
  { assignment: number; page: number },
  { rejectValue: string }
>('message/get', async ({ assignment, page }, { rejectWithValue }) => {
  try {
    const response = await myAxios.get('/message/', {
      params: { assignment, offset: page, limit: 80 },
    });
    return await camelcaseKeys(
      { messages: response.data.results, nextPage: response.data.next },
      { deep: true },
    );
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.message || 'Request failed');
    }
    return rejectWithValue('دریافت پیام ها ناموفق بود.');
  }
});

export const createMessage = createAsyncThunk<
  Message,
  { sender: number; assignment: number; content: string },
  { rejectValue: string }
>('post/message', async (message, { rejectWithValue }) => {
  try {
    const sentData = camelToSnake(message);
    const response = await myAxios.post('/message/', sentData, {
      params: { assigment: message.assignment },
    });
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.message || 'Request failed');
    }
    return rejectWithValue('ارسال پیام ناموفق بود');
  }
});

export interface MessageState {
  messages: Message[];
  nextPage: string | null;
}

const initialState: MessageState = {
  messages: [],
  nextPage: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      const newMessages = action.payload.messages.filter(
        (newMessage) =>
          !state.messages.some(
            (existingMessage) => existingMessage.id === newMessage.id,
          ),
      );
      state.messages.push(...newMessages);
      state.nextPage = action.payload.nextPage;
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.messages.push(action.payload);
    });
  },
});

export default messageSlice.reducer;
export const { receiveMessage } = messageSlice.actions;
