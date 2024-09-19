import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Question } from '../../constant/types/event.ts';
import myAxios from '../../setting/connectApi.ts';
import camelcaseKeys from 'camelcase-keys';
import { AxiosError } from 'axios';
import camelToSnake from '../../functional/ConvertCase.tsx';

export const getQuestions = createAsyncThunk<
  { questions: Question[]; nextPage: string | null },
  { assignment: number; page: number },
  { rejectValue: string }
>('questions/get', async ({ assignment, page }, { rejectWithValue }) => {
  try {
    const response = await myAxios.get('/question/', {
      params: { assignment, offset: page, limit: 80 },
    });
    return await camelcaseKeys(response.data.results, { deep: true });
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.question || 'Request failed');
    }
    return rejectWithValue('دریافت سوالات ناموفق بود.');
  }
});

export const createQuestion = createAsyncThunk<
  Question,
  Question,
  { rejectValue: string }
>('question/post', async (question, { rejectWithValue }) => {
  try {
    const sentData = camelToSnake(question);
    const response = await myAxios.post('/question/', sentData, {
      params: { assigment: question.assignment },
    });
    return await camelcaseKeys(response.data, { deep: true });
  } catch (error) {
    console.warn(error);
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data.question || 'Request failed');
    }
    return rejectWithValue('ایجاد سوال ناموفق بود');
  }
});

export interface QuestionState {
  questions: Question[];
  nextPage: string | null;
}

const initialState: QuestionState = {
  questions: [],
  nextPage: '',
};

const questionSlice = createSlice({
  name: 'question',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      const newQuestion = action.payload.questions.filter(
        (newQuestion) =>
          !state.questions.some(
            (existingQuestion) => existingQuestion.id === newQuestion.id,
          ),
      );
      state.questions.push(...newQuestion);
      state.nextPage = action.payload.nextPage;
    });
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.questions.push(action.payload);
    });
  },
});

export default questionSlice.reducer;
