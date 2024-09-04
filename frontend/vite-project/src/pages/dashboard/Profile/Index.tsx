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
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteUser, editUser } from '../../../redux/reducers/UserSlice.tsx';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../constant/types/user.ts';
import showMessage from '../../../functional/ShowMessage.tsx';
import { getProfile } from '../../../redux/reducers/SessionSlice.tsx';

interface ProfileForm {
  firstName: string;
  lastName: string;
  username: string;
}

const schemaValidation = yup.object().shape({
  firstName: yup
    .string()
    .required('نام اجباری است!')
    .min(2, 'نام حداقل طول 2 دارد!'),
  lastName: yup
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schemaValidation),
    mode: 'onChange',
  });
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.session.currentUser,
  );
  const onSubmit = async (data: ProfileForm) => {
    if (!currentUser || !currentUser.id) {
      return;
    }
    dispatch(editUser({ ...data, id: currentUser.id })).then(() => {
      dispatch(getProfile());
    });
  };

  const deleteAccount = async () => {
    if (!currentUser?.id) {
      return;
    }
    await dispatch(deleteUser(currentUser.id)).then(() => {
      showMessage('success', 'یا موفقیت حذف شد.', () => {
        navigate('/');
      });
    });

    navigate('/');
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
                  {currentUser?.firstName + ' ' + currentUser?.lastName}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {currentUser?.province + ', ' + currentUser?.city}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="نام"
                      variant="outlined"
                      defaultValue={currentUser?.firstName}
                      margin="normal"
                      fullWidth
                      {...register('firstName')}
                      error={!!errors.firstName?.message}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="نام خانوادگی"
                      variant="outlined"
                      defaultValue={currentUser?.lastName}
                      margin="normal"
                      fullWidth
                      {...register('lastName')}
                      error={!!errors.lastName?.message}
                      helperText={errors.lastName?.message}
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
                        defaultValue={currentUser?.username}
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
                <Button
                  variant="contained"
                  color={'error'}
                  sx={{ mt: 2 }}
                  onClick={deleteAccount}
                >
                  حذف حساب کاربری
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
