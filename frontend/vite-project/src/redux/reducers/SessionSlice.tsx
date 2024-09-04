import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../constant/types/user.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { Event } from '../../constant/types/event.ts';

export const login = createAsyncThunk<
  { access: string; refresh: string },
  { username: string; password: string },
  { rejectValue: string }
>('login/user', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await myAxios.post('/api/token/', { username, password });
    return response.data;
  } catch (error) {
    rejectWithValue('نام کاربری یا رمز عبور اشتباه است.');
  }
});

export const getProfile = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get('/current_user/');
      return await camelcaseKeys(response.data, { deep: true });
    } catch (error) {
      return rejectWithValue('دریافت کاربر ناموفق بود.');
    }
  },
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'logout/user',
  async (_, { rejectWithValue }) => {
    try {
      const refresh = window.localStorage.getItem('token-refresh');
      if (!refresh) {
        return;
      }
      await myAxios.post('/api/token/refresh/', { refresh });
    } catch (error) {
      rejectWithValue('خروج از حساب ناموفق بود.');
    }
  },
);

export const getCurrentEvent = createAsyncThunk<
  Event,
  number,
  { rejectValue: string }
>('event/get', async (id, { rejectWithValue }) => {
  try {
    const response = await myAxios.get(`/event/${id}/`);
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    console.log(error);
    return rejectWithValue('دریافت آن رویداد ممکن نیست.');
  }
});

interface SessionState {
  tokenAccess: string;
  tokenRefresh: string;
  currentUser: User | null;
  currentEvent: Event | null;
  message: string | undefined;
}

const initialState: SessionState = {
  tokenAccess: '',
  tokenRefresh: '',
  currentUser: null,
  currentEvent: null,
  message: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.tokenAccess = action.payload.access;
      state.tokenRefresh = action.payload.refresh;
      window.localStorage.setItem('token-access', state.tokenAccess);
      window.localStorage.setItem('token-refresh', state.tokenRefresh);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.tokenAccess = '';
      state.tokenRefresh = '';
      state.message = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.tokenAccess = '';
      state.tokenRefresh = '';
      window.localStorage.removeItem('token-access');
      window.localStorage.removeItem('token-refresh');
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.tokenAccess = '';
      state.tokenRefresh = '';
      state.message = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.currentUser = null;
      state.message = action.error.message;
    });
    builder.addCase(getCurrentEvent.fulfilled, (state, action) => {
      console.log(action.payload);
      state.currentEvent = action.payload;
    });
  },
});

export default sessionSlice.reducer;
