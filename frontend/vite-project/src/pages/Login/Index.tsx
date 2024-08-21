import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import myAxios from '../../setting/connectApi.ts';
import LoadingModal from '../../components/LoadingModal.tsx';
import { useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const validationSchema = yup.object().shape({
  username: yup.string().required('وارد کردن نام کاربری الزامی است.'),
  password: yup.string().required('وارد کردن گذرواژه اجیاری است.'),
});

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    setLoading(true);
    myAxios
      .post('/api/token/', data)
      .then((data) => {
        console.log(data);
        if (!data) {
          return;
        }
        window.localStorage.setItem('token-access', data.data.access);
        window.localStorage.setItem('token-refresh', data.data.refresh);
      })
      .catch((errors) => {
        MySwal.fire({
          title: <strong>خطا</strong>,
          html: <p>نام کاربری یا رمز عبور نادرست است.</p>,
          icon: 'error',
        });
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
