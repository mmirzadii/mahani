import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Assignment } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';
import camelToSnake from '../../functional/ConvertCase.tsx';
import { MakeRequired } from '../../functional/TypeConvert.tsx';

export const getAssignments = createAsyncThunk<
  { assignments: Assignment[]; nextPage: string | null },
  { event: number; page: number },
  { rejectValue: string }
>('assignments/get', async ({ event, page }, { rejectWithValue }) => {
  try {
    const response = await myAxios.get(`/assignment/`, {
      params: { event, offset: page, limit: 10 },
    });
    return await camelcaseKeys(
      { assignments: response.data.results, nextPage: response.data.next },
      { deep: true },
    );
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.message || 'Request failed');
    }
    return rejectWithValue('دریافت تکالیف ناموفق بود.');
  }
});

export const createAssignment = createAsyncThunk<
  Assignment,
  Assignment,
  { rejectValue: string }
>('assignment/create', async (assignment: Assignment, { rejectWithValue }) => {
  try {
    const response = await myAxios.post('/assignment/', assignment, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    return rejectWithValue('not ');
  }
});

export const editAssignment = createAsyncThunk<
  Assignment,
  MakeRequired<Partial<Assignment>, 'id'>,
  { rejectValue: string }
>('assignment/edit', async (assignment, { rejectWithValue }) => {
  try {
    const sentData = camelToSnake(assignment);
    const assignment_id = assignment.id;
    const response = await myAxios.patch(
      `/assignment/${assignment_id}`,
      sentData,
    );
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    rejectWithValue('ویرایش ممکن نبود');
  }
});

export const deleteAssignment = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('assignment/delete', async (id, { rejectWithValue }) => {
  try {
    await myAxios.patch(`/assignment/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue('پاک کردن ممکن نبود');
  }
});

export interface AssignmentState {
  assignments: Assignment[];
  nextPage: string | null;
}

const initialState: AssignmentState = {
  assignments: [],
  nextPage: '',
};

const assignmentSlice = createSlice({
  name: 'event',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAssignments.fulfilled, (state, action) => {
      state.assignments = action.payload.assignments;
      state.nextPage = action.payload.nextPage;
    });
    builder.addCase(createAssignment.fulfilled, (state, action) => {
      state.assignments.push(action.payload);
    });
    builder.addCase(editAssignment.fulfilled, (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment.id == action.payload.id,
      );
      state.assignments.push(action.payload);
    });
    builder.addCase(deleteAssignment.fulfilled, (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment.id != action.payload,
      );
    });
  },
});

export default assignmentSlice.reducer;
