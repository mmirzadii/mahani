import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../setting/connectApi.ts';
import { Student } from '../../constant/types/user.ts';

export const getStudent = createAsyncThunk('student/get', async () => {
  const data = await axios.get('/student/');
  return (await JSON.parse(data.data)) as Student;
});

export const editStudent = createAsyncThunk(
  'student/edit',
  async (data: Partial<Student>) => {
    return await axios.patch('/student/', { data });
  },
);

interface StudentState {
  student: Student | null;
  loading: boolean;
  errorMessage: string;
}

const initialState = {
  student: null,
  loading: false,
  errorMessage: '',
};

const studentSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudent.fulfilled, (state: StudentState, action) => {
      state.student = action.payload;
      state.loading = false;
    });
    builder.addCase(getStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudent.rejected, (state) => {
      state.errorMessage = 'we have error';
      state.loading = false;
    });
  },
});

export default studentSlice.reducer;
