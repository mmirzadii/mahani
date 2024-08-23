import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../setting/connectApi.ts';
import myAxios from '../../setting/connectApi.ts';
import { Student } from '../../constant/types/user.ts';
import { useNavigate } from 'react-router-dom';

export const getStudent = createAsyncThunk('student/get', async () => {
  return await myAxios.get('/current_user/'); // No need to use JSON.parse here
});

export const editStudent = createAsyncThunk(
  'student/edit',
  async (data: { user: Partial<Student> }) => {
    return await axios.patch('/current_user/', data);
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
      if (action.payload) {
        // @ts-ignore
        const { user, ...rest } = action.payload.data;
        state.student = { ...user, ...rest }; // or handle as needed
        console.log(state.student);
      }
      state.loading = false;
    });
    builder.addCase(getStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudent.rejected, (state) => {
      useNavigate()('/login');
      state.loading = false;
    });

    builder.addCase(editStudent.fulfilled, (state, action) => {
      if (action.payload) {
        // @ts-ignore
        const { user, ...rest } = action.payload.data;
        state.student = { ...user, ...rest }; // or handle as needed
        console.log(state.student);
      }
      state.loading = false;
      console.log(action);
    });
    builder.addCase(editStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editStudent.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
    });
  },
});

export default studentSlice.reducer;
