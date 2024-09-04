import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';

export const getMessages = createAsyncThunk<
  Message[],
  void,
  { rejectValue: string }
>('message/get', async (message_id, { rejectWithValue }) => {
  try {
    const response = await myAxios.get('/message/', {
      params: { message_id },
    });
    return await camelcaseKeys(response.data.results, { deep: true });
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
  loading: boolean;
  message: string | undefined;
  status: 'success' | 'error' | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  message: '',
  status: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
  },
});

export default messageSlice.reducer;
