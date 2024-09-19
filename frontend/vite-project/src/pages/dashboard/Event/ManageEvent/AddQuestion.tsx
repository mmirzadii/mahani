import Container from '@mui/material/Container';
import { Box, Button, CssBaseline, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { NoteAdd } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store.tsx';
import { createQuestion } from '../../../../redux/reducers/QuestionSlice.tsx';
import showMessage from '../../../../functional/ShowMessage.tsx';
import { AssignmentContext } from '../AssignmentPage/Index.tsx';

const validationSchema = yup.object().shape({
  name: yup.string().required('اجباری است').min(4, 'حداقل طول نام سوال 4 است.'),
  text: yup.string().max(1000, 'حداکثر طول 1000 است.'),
  maxScore: yup.number().min(0, 'حداقل نمره صفر است.'),
  content: yup
    .mixed<File>()
    .nullable()
    .notRequired()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true; // If no file is uploaded, skip validation
      if (!(value instanceof File)) {
        return true;
      }
      return value.size <= 5 * 1024 * 1024; // 5MB limit
    }),
});

interface FormState {
  name: string;
  text: string;
  maxScore: number;
  content: File | null;
}

function AddQuestion() {
  const assignment = useContext(AssignmentContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>({
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file); // Update state with the selected file
    setValue('content', file); // Manually set the file value
  };
  const submitHandler = (data: FormState) => {
    console.log(assignment?.id);
    if (!assignment?.id) {
      return;
    }
    dispatch(createQuestion({ ...data, assignment: assignment.id }))
      .unwrap()
      .then(() => {
        showMessage('success', 'با موفقیت ثبت شد.');
      })
      .catch((error) => {
        showMessage('error', error.message);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <NoteAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          اضافه کردن سوال به تمرین
        </Typography>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit(submitHandler)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="نام سوال"
                autoComplete="نام"
                autoFocus
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="assignment"
                label="متن سوال"
                autoComplete="متن سوال"
                autoFocus
                {...register('text')}
                error={!!errors.text}
                helperText={errors.text?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="assignment"
                label="حداکثر نمره"
                autoComplete="حداکثر نمره"
                autoFocus
                {...register('maxScore')}
                error={!!errors.maxScore}
                helperText={errors.maxScore?.message}
              />

              {/* Custom File Upload Area */}
              <Box
                sx={{
                  border: '1px dashed #ccc',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  mt: 2,
                  position: 'relative',
                  bgcolor: selectedFile ? 'success.light' : 'background.paper',
                }}
              >
                <input
                  type="file"
                  id="file-input"
                  hidden
                  {...register('content')}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-input">
                  <Button variant="contained" component="span" sx={{ mb: 1 }}>
                    Choose File
                  </Button>
                </label>
                {selectedFile ? (
                  <Typography variant="body2" color="textSecondary">
                    {selectedFile.name}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No file chosen
                  </Typography>
                )}
                {errors.content && (
                  <Typography color="error" variant="body2">
                    {errors.content.message}
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default AddQuestion;
