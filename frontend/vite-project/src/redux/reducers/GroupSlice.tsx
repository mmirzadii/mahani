import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Group } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';
import camelToSnake from '../../functional/ConvertCase.tsx';
import { MakeRequired } from '../../functional/TypeConvert.tsx';

export const getGroups = createAsyncThunk<
  { groups: Group[]; nextPage: string | null },
  { event: number; page: number },
  { rejectValue: string }
>('group/get', async ({ event, page }, { rejectWithValue }) => {
  try {
    const response = await myAxios.get(`/group/`, {
      params: { event, offset: page, limit: 20 },
    });
    return await camelcaseKeys(
      { groups: response.data.results, nextPage: response.data.next },
      { deep: true },
    );
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

export const deleteGroup = createAsyncThunk<
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
  nextPage: string | null;
}

const initialState: GroupState = {
  groups: [],
  nextPage: '',
};

const groupSlice = createSlice({
  name: 'event',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groups = action.payload.groups;
      state.nextPage = action.payload.nextPage;
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.groups.push(action.payload);
    });
    builder.addCase(editGroup.fulfilled, (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.id == action.payload.id,
      );
      state.groups.push(action.payload);
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      state.groups = state.groups.filter((group) => group.id != action.payload);
    });
  },
});

export default groupSlice.reducer;
