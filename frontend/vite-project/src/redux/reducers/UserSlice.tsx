import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import myAxios from '../../setting/connectApi.ts';
import { User } from '../../constant/types/user.ts';
import camelcaseKeys from 'camelcase-keys';
import { MakeRequired } from '../../functional/TypeConvert.tsx';
import camelToSnake from '../../functional/ConvertCase.tsx';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get('/user/');
      return await camelcaseKeys(response.data, { deep: true });
    } catch (error) {
      return rejectWithValue('دریافت کاربر ناموفق بود.');
    }
  },
);

export const createUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'user/create',
  async (user, { rejectWithValue }) => {
    try {
      const snakeUser = camelToSnake(user);
      const response = await myAxios.post('/user/', snakeUser);
      return await camelcaseKeys(response.data, { deep: true });
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ErrorResponse;
      if (errorData && 'username' in errorData) {
        return rejectWithValue('نام کاربری از قبل وجود دارد.');
      }
      return rejectWithValue('ساخت حساب ممکن نیست.');
    }
  },
);

export const editUser = createAsyncThunk<
  User,
  MakeRequired<Partial<User>, 'id'>,
  { rejectValue: string }
>('user/edit', async (user, { rejectWithValue }) => {
  try {
    const snakeUser = camelToSnake(user);
    const response = await myAxios.patch(`/user/${user.id}/`, snakeUser);
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    return rejectWithValue('ویرایش کاریر ناموفق یود.');
  }
});

export const deleteUser = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('user/delete', async (id, { rejectWithValue }) => {
  try {
    await myAxios.delete(`/user/${id}/`);
    return id;
  } catch (error) {
    return rejectWithValue('حذف کاربر ناموفق بود.');
  }
});
export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state: UserState, action) => {
      state.users = action.payload;
    });

    builder.addCase(createUser.fulfilled, (state: UserState, action) => {
      state.users.push(action.payload);
    });

    builder.addCase(editUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id != action.payload.id);
      state.users.push(action.payload);
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id != action.payload);
    });
  },
});

export default userSlice.reducer;
