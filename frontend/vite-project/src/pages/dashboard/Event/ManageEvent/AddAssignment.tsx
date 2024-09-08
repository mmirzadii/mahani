import { Button, CssBaseline, TextField, Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { NoteAdd } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { createAssignment } from '../../../../redux/reducers/AssignmentSlice.tsx';
import { Event } from '../../../../constant/types/event.ts';

interface FormState {
  name: string;
  description: string;
  content?: File | null;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('اجباری')
    .min(5, 'باید حداقل 4 حرف داشته یاشد.')
    .max(30),
  description: yup.string().max(200),
  content: yup
    .mixed<File>()
    .nullable()
    .notRequired()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true; // If no file is uploaded, skip validation
      return value instanceof File && value.size <= 5 * 1024 * 1024; // 5MB limit
    }),
});

export const AddAssignment = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // to manually set the file input value
  } = useForm<FormState>({
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const currentEvent = useSelector<RootState, Event | null>(
    (state) => state.session.currentEvent,
  );

  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = (data: FormState) => {
    if (!currentEvent) {
      return;
    }
    console.log(data);
    dispatch(createAssignment({ ...data, event: currentEvent.id }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file); // Update state with the selected file
    setValue('content', file); // Manually set the file value
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
          اضافه کردن تمرین
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
                label="نام تمرین"
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
                label="توضیحات"
                autoComplete="توضیحات"
                autoFocus
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
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
};

export default AddAssignment;
