import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Event } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';

export const getEvents = createAsyncThunk<
  Event[],
  void,
  { rejectValue: string }
>('event/get', async (_, { rejectWithValue }) => {
  try {
    const response = await myAxios.get('/event/');
    return await camelcaseKeys(response.data.results, { deep: true });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.message || 'Request failed');
    }
    return rejectWithValue('دریافت رویداد های پیش رو ناموفق بود.');
  }
});

export interface EventState {
  events: Event[];
  loading: boolean;
  message: string | undefined;
  status: 'success' | 'error' | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  message: '',
  status: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.events = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEvents.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
  },
});

export default eventSlice.reducer;
