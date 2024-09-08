import {
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
  CssBaseline,
  Box,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import * as yup from 'yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { Event } from '../../../../constant/types/event.ts';
import { createGroup } from '../../../../redux/reducers/GroupSlice.tsx';
import showMessage from '../../../../functional/ShowMessage.tsx';

interface FormState {
  name: string;
  manager: string;
  members: string[];
}

const validationSchema = yup.object().shape({
  name: yup.string().min(4, 'حداقل طول نام 4 است.').max(40),
  manager: yup
    .string()
    .matches(
      /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      'فرمت شماره همراه نامعتبر است.',
    ),
  members: yup
    .array()
    .of(
      yup
        .string()
        .required('اجباری است')
        .matches(
          /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
          'فرمت شماره همراه نامعتبر است.',
        ),
    )
    .min(2, 'حداقل تعداد اعضا دو است.')
    .max(4, 'حداکثر تعداد اعضا سه است.'),
});

const AddGroup = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      name: '',
      manager: '',
      members: [''],
    },
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    //@ts-ignore
    name: 'members',
  });

  const dispatch = useDispatch<AppDispatch>();
  const currentEvent = useSelector<RootState, Event | null>(
    (state) => state?.session.currentEvent,
  );

  const submitHandler = (data: FormState) => {
    if (!currentEvent) {
      return;
    }
    console.log(data);
    dispatch(createGroup({ ...data, event: currentEvent.id }))
      .unwrap()
      .then(() => {
        showMessage('success', 'باموفقیت انجام شد.');
      })
      .catch((error) => {
        showMessage('error', error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          margin: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <GroupAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          اضافه کردن گروه
        </Typography>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit(submitHandler)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="نام گروه"
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
                id="manager"
                label="شماره همراه سرپرست"
                autoComplete="شماره همراه سرپرست"
                {...register('manager')}
                error={!!errors.manager}
                helperText={errors.manager?.message}
              />
              {fields.map((field, index) => (
                <Box key={field.id} display="flex" alignItems="center" mb={2}>
                  <Controller
                    name={`members.${index}`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={`عضو #${index + 1}`}
                        variant="outlined"
                        error={!!errors.members?.[index]}
                        helperText={errors.members?.[index]?.message}
                        fullWidth
                      />
                    )}
                  />
                  <IconButton
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                type="button"
                onClick={() => append('')}
                variant="contained"
                color="primary"
              >
                Add Member
              </Button>

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

export default AddGroup;
