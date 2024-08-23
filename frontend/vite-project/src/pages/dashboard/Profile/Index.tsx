import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store.tsx';
import { Student } from '../../../constant/types/user.ts';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editStudent } from '../../../redux/reducers/StudentSlice.tsx';

interface ProfileForm {
  first_name: string;
  last_name: string;
  username: string;
}

const schemaValidation = yup.object().shape({
  first_name: yup
    .string()
    .required('نام اجباری است!')
    .min(2, 'نام حداقل طول 2 دارد!'),
  last_name: yup
    .string()
    .required('نام خانوادگی اجباری است!')
    .min(2, 'حداقل طول نام خانوادگی 2 است!'),
  username: yup
    .string()
    .required('نام کاربری اجباری است!')
    .min(4, 'حداقل طول نام کاریری 4 است!')
    .matches(
      new RegExp('^[a-zA-Z_][a-zA-Z0-9_]*$'),
      'فقط از حروف و اعداد انگلیسی میتوانید استفاده کنید!',
    ),
});

function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schemaValidation),
    mode: 'onChange',
  });
  const dispatch = useDispatch<AppDispatch>();
  const student = useSelector<RootState, Student | null>(
    (state) => state?.student.student,
  );
  const onSubmit = async (data: ProfileForm) => {
    console.log(data);
    await dispatch(editStudent({ user: data }));
  };
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Avatar
                  alt={'avatar'}
                  src={'/dashboard/profile.jpg'}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: deepPurple[500],
                    margin: 'auto',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h5">
                  {student?.first_name + ' ' + student?.last_name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {student?.province + ', ' + student?.city}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="نام"
                      variant="outlined"
                      defaultValue={student?.first_name}
                      margin="normal"
                      fullWidth
                      {...register('first_name')}
                      error={!!errors.first_name?.message}
                      helperText={errors.first_name?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="نام خانوادگی"
                      variant="outlined"
                      defaultValue={student?.last_name}
                      margin="normal"
                      fullWidth
                      {...register('last_name')}
                      error={!!errors.last_name?.message}
                      helperText={errors.last_name?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        htmlFor="username"
                        error={!!errors.username?.message}
                      >
                        حساب کاربری
                      </InputLabel>
                      <OutlinedInput
                        error={!!errors.username?.message}
                        defaultValue={student?.username}
                        id="username"
                        startAdornment={
                          <InputAdornment position="start">@</InputAdornment>
                        }
                        label="حساب کاربری"
                        {...register('username')}
                      />
                      <FormHelperText sx={{ color: 'red' }}>
                        {errors.username?.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                spacing={2}
                sx={{ justifyContent: 'space-between', display: 'flex' }}
              >
                <Button
                  type={'submit'}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={!isDirty}
                >
                  ذخیره تغییرات
                </Button>
                <Button variant="contained" color="warning" sx={{ mt: 2 }}>
                  تغییر رمز عبور
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfilePage;
