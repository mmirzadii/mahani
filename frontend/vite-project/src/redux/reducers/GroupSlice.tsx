import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Group } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';
import camelToSnake from '../../functional/ConvertCase.tsx';
import { MakeRequired } from '../../functional/TypeConvert.tsx';

export const getGroups = createAsyncThunk<
  Group[],
  number,
  { rejectValue: string }
>('group/get', async (group_id, { rejectWithValue }) => {
  try {
    const response = await myAxios.get(`/group/`, {
      params: { event: group_id },
    });
    return await camelcaseKeys(response.data.results, { deep: true });
  } catch (error) {
    console.log(error);
    console.log(error);
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.message || 'Request failed');
    }
    return rejectWithValue('دریافت تکالیف ناموفق بود.');
  }
});

export const createGroup = createAsyncThunk<
  Group,
  { name: string; manager: string; members: string[]; event: number },
  { rejectValue: string }
>('group/create', async (group, { rejectWithValue }) => {
  try {
    const sentData = camelToSnake(group);
    const response = await myAxios.post('/group/', sentData);
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    return rejectWithValue('not ');
  }
});

export const editGroup = createAsyncThunk<
  Group,
  MakeRequired<Partial<Group>, 'id'>,
  { rejectValue: string }
>('group/edit', async (group, { rejectWithValue }) => {
  try {
    const sentData = camelToSnake(group);
    const group_id = group.id;
    const response = await myAxios.patch(`/group/${group_id}`, sentData);
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    rejectWithValue('ویرایش ممکن نبود');
  }
});

export const deletegroup = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('group/delete', async (id, { rejectWithValue }) => {
  try {
    await myAxios.patch(`/group/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue('پاک کردن ممکن نبود');
  }
});

export interface GroupState {
  groups: Group[];
  loading: boolean;
  message: string | undefined;
  status: 'success' | 'error' | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  message: '',
  status: null,
};

const groupSlice = createSlice({
  name: 'event',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getGroups.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGroups.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.groups.push(action.payload);
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(createGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createGroup.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
    builder.addCase(editGroup.fulfilled, (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.id == action.payload.id,
      );
      state.groups.push(action.payload);
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(editGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editGroup.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
    builder.addCase(deletegroup.fulfilled, (state, action) => {
      state.groups = state.groups.filter((group) => group.id != action.payload);
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(deletegroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletegroup.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
  },
});

export default groupSlice.reducer;
