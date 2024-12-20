import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LoadingModal from '../../components/LoadingModal.tsx';
import iranCities from '../../constant/IranCities.tsx';
import { useEffect, useState } from 'react';
import 'jalaali-react-date-picker/lib/styles/index.css';
import { InputDatePicker } from 'jalaali-react-date-picker';
import validationSchema from './yupSchema.ts';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.tsx';
import { createUser } from '../../redux/reducers/UserSlice.tsx';
import showMessage from '../../functional/ShowMessage.tsx';

interface SignupForm {
  firstName: string;
  lastName: string;
  province: string;
  city: string;
  birthDate: string;
  school: string;
  phoneNumber: string;
  username: string;
  password: string;
  passwordConfirm?: string;
}

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });
  const selectedProvince = watch('province');
  const [birthDate, setBirthDate] = useState('');
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  //handle setting cities according to the province
  useEffect(() => {
    if (selectedProvince) {
      setCityOptions(iranCities[selectedProvince] || []);
      setValue('city', ''); // Clear city selection when province changes
    }
  }, [selectedProvince, setValue]);

  const onSubmit: SubmitHandler<SignupForm> = async (data: SignupForm) => {
    setLoading(true);
    data.birthDate = JSON.stringify(data.birthDate).split('T')[0].slice(1);
    dispatch(createUser(data))
      .unwrap()
      .then(() => {
        showMessage('success', 'عملیات موفق بود.', () => {
          navigate('/login/');
        });
      })
      .catch((error) => {
        showMessage('error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-max w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          ساخت حساب کاربری
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            <div>
              <TextField
                id="first_name"
                label="نام"
                variant="outlined"
                sx={{ width: '100%', m: 1 }}
                {...register('firstName')}
                error={!!errors.firstName?.message}
                helperText={errors.firstName?.message}
              />
            </div>
            <div>
              <TextField
                id="last_name"
                label="نام خانوادگی"
                variant="outlined"
                sx={{ width: '100%', m: 1 }}
                {...register('lastName')}
                error={!!errors.lastName?.message}
                helperText={errors.lastName?.message}
              />
            </div>

            <div>
              <Autocomplete
                disablePortal
                id="province"
                options={Object.keys(iranCities)}
                sx={{ width: '100%', m: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: '100%' }}
                    label="استان"
                    {...register('province')}
                  />
                )}
                onChange={(_, value) => {
                  setValue('province', value || ''); // Update province value in form state
                }}
              />
            </div>
            <div>
              <Autocomplete
                disablePortal
                id="city"
                options={cityOptions}
                sx={{ width: '100%', m: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: '100%' }}
                    label="شهر"
                    {...register('city')}
                    error={!!errors.city?.message}
                    helperText={errors.city?.message}
                  />
                )}
                onChange={(_, value) => {
                  setValue('city', value || ''); // Update city value in form state
                }}
              />
            </div>
          </Box>
          <div>
            <TextField
              label="تاریخ تولد"
              variant="outlined"
              sx={{ width: '100%', m: 1 }}
              value={birthDate}
              onClick={() => {
                document.getElementById('jalali-datepicker')?.click();
              }}
              error={!!errors.birthDate?.message}
              helperText={errors.birthDate?.message}
            />

            <InputDatePicker
              id="jalali-datepicker"
              // Hide the default input
              {...register('birthDate')}
              onChange={(data, dateString) => {
                // @ts-ignore
                setValue('birthDate', data._i.replace('---', ''));
                setBirthDate(dateString);
              }}
            />

            <TextField
              id="phone_number"
              label="شماره همراه"
              variant="outlined"
              sx={{ width: '100%', m: 1 }}
              {...register('phoneNumber')}
              error={!!errors.phoneNumber?.message}
              helperText={errors.phoneNumber?.message}
            />
          </div>
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            <div>
              <TextField
                id="school"
                label="مدرسه"
                variant="outlined"
                sx={{ width: '100%', m: 1 }}
                {...register('school')}
                error={!!errors.school?.message}
                helperText={errors.school?.message}
              />
            </div>
            <div>
              <TextField
                id="username"
                label="نام کاربری"
                variant="outlined"
                sx={{ width: '100%', m: 1 }}
                {...register('username')}
                error={!!errors.username?.message}
                helperText={errors.username?.message}
              />
            </div>
            <div>
              <TextField
                type={'password'}
                id="password"
                label="گذرواژه"
                variant="outlined"
                sx={{ width: '100%', m: 1 }}
                {...register('password')}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            </div>
            <div>
              <TextField
                type={'password'}
                id="passwordConfirm"
                label="تکرار گذرواژه"
                variant="outlined"
                sx={{ width: '100%', m: 1 }}
                {...register('passwordConfirm')}
                error={!!errors.passwordConfirm?.message}
                helperText={errors.passwordConfirm?.message}
              />
            </div>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" size={'large'}>
              ثبت نام
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link
              to={'/login'}
              style={{ textDecoration: 'underline', color: 'blue' }}
            >
              اگر قبلا ثبت نام کردید وارد صفحه ورود شوید.
            </Link>
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

export default SignupPage;
