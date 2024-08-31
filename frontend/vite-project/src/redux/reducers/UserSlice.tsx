import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../setting/connectApi.ts';
import myAxios from '../../setting/connectApi.ts';
import { User } from '../../constant/types/user.ts';
import camelcaseKeys from 'camelcase-keys';

export const getUser = createAsyncThunk<User, void, { rejectValue: string }>(
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

export const editUser = createAsyncThunk<
  User,
  { user: Partial<User> },
  { rejectValue: string }
>('user/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch('/current_user/', data);
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    return rejectWithValue('ویرایش کاریر ناموفق یود.');
  }
});

export const deleteUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/delete',
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete('/current_user/');
    } catch (error) {
      return rejectWithValue('حذف کاربر ناموفق بود.');
    }
  },
);
export interface UserState {
  user: User | null;
  loading: boolean;
  message: string | undefined;
  status: 'success' | 'error' | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  message: '',
  status: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.message = '';
      state.status = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state: UserState, action) => {
      state.user = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.message = action.error.message;
      state.status = 'error';
      state.loading = false;
    });

    builder.addCase(editUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.message = action.error.message;
      state.status = 'error';
      state.loading = false;
    });

    builder.addCase(deleteUser.fulfilled, (state) => {
      state.user = null;
      state.status = 'success';
      state.message = 'با موفقیت حذف شد.';
      state.loading = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.message = 'مشکلی پیش آمده است.';
      state.status = 'error';
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { resetStatus } = userSlice.actions;
