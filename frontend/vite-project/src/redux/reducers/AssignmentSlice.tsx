import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Assignment } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';
import camelToSnake from '../../functional/ConvertCase.tsx';
import { MakeRequired } from '../../functional/TypeConvert.tsx';

export const getAssignments = createAsyncThunk<
  Assignment[],
  void,
  { rejectValue: string }
>('assignment/get', async (event_id, { rejectWithValue }) => {
  try {
    const response = await myAxios.get(`/assignment/`, {
      params: { event: event_id },
    });
    return await camelcaseKeys(response.data.results, { deep: true });
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.message || 'Request failed');
    }
    return rejectWithValue('دریافت تکالیف ناموفق بود.');
  }
});

export const createAssignments = createAsyncThunk<
  Assignment,
  Assignment,
  { rejectValue: string }
>('assignment/create', async (assignment: Assignment, { rejectWithValue }) => {
  try {
    const sentData = camelToSnake(assignment);
    const response = await myAxios.post('/assignment/', sentData);
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
  loading: boolean;
  message: string | undefined;
  status: 'success' | 'error' | null;
}

const initialState: AssignmentState = {
  assignments: [],
  loading: false,
  message: '',
  status: null,
};

const assignmentSlice = createSlice({
  name: 'event',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAssignments.fulfilled, (state, action) => {
      state.assignments = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getAssignments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAssignments.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
    builder.addCase(createAssignments.fulfilled, (state, action) => {
      state.assignments.push(action.payload);
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(createAssignments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAssignments.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
    builder.addCase(editAssignment.fulfilled, (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment.id == action.payload.id,
      );
      state.assignments.push(action.payload);
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(editAssignment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editAssignment.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteAssignment.fulfilled, (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment.id != action.payload,
      );
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(deleteAssignment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAssignment.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload;
      state.loading = false;
    });
  },
});

export default assignmentSlice.reducer;
