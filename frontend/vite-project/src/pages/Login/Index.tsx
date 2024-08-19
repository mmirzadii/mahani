import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import myAxios from '../../setting/connectApi.ts';
import LoadingModal from '../../components/LoadingModal.tsx';
import { useState } from 'react';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('وارد کردن نام کاربری الزامی است.')
    .min(4, 'نام کاربری دستکم باید 4 حرف داشته باشد.')
    .matches(
      new RegExp('^[a-zA-Z_][a-zA-Z0-9_]*$'),
      'فقط از حروف و اعداد انگلیسی میتوانید استفاده کنید!',
    ),
  password: yup.string().min(6, 'گذرواژه باید دستکم دارای 6 حرف باشد.'),
});

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    setLoading(true);
    myAxios
      .post('/api-auth-token/', data)
      .then((data) => {
        console.log(data.data.token);
        if (!data?.data?.token) {
          return;
        }
        window.localStorage.setItem('token', data.data.token);
      })
      .catch((errors) => {
        console.log(errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          ورود به حساب کاربری
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="username"
            label="نام کاریری"
            variant="outlined"
            sx={{ width: '100%', m: 1 }}
            {...register('username')}
          />
          <p style={{ color: 'red' }}>{errors.username?.message}</p>
          <TextField
            id="password"
            label="گذرواژه"
            variant="outlined"
            sx={{ width: '100%', m: 1 }}
            {...register('password')}
          />
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              disabled={Object.keys(errors).length > 0}
              type="submit"
              variant="contained"
              size={'large'}
            >
              ورود
            </Button>
          </Box>
        </form>
      </div>
      <LoadingModal
        open={loading}
        onClose={() => {
          setLoading(false);
        }}
      />
    </div>
  );
};

export default LoginPage;
