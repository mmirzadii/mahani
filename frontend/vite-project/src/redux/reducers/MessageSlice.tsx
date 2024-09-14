import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages.push(...action.payload.messages);
      state.nextPage = action.payload.nextPage;
    });
  },
});

export default messageSlice.reducer;
