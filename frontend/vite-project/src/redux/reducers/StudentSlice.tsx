import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../setting/connectApi.ts';
import { Student } from '../../constant/types/user.ts';
import myAxios from '../../setting/connectApi.ts';
import { useNavigate } from 'react-router-dom';

export const getStudent = createAsyncThunk('student/get', async () => {
  let out;
  await myAxios
    .get('/current_user/')
    .then((response) => {
      out = response.data;
    })
    .catch((error) => {
      out = error.data;
    });
  return out; // No need to use JSON.parse here
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
      if (action.payload) {
        // @ts-ignore
        const { user, ...rest } = action.payload;
        state.student = { user, ...rest }; // or handle as needed
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
  },
});

export default studentSlice.reducer;
