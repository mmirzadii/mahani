import * as yup from 'yup';
import iranCities from '../../constant/IranCities.tsx';

//yup validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required('وارد کردن نام اجباری است.'),
  lastName: yup.string().required('وارد کردن نام خانوادگی اجباری است.'),
  province: yup
    .string()
    .required('وارد کردن استان اجباری است!')
    .oneOf(Object.keys(iranCities), 'نام استان را درست انتخاب کنید!'),
  city: yup
    .string()
    .required('وارد کردن شهر اجباری است!')
    .test('is-valid-city', 'نام شهر اشتباه است.', function (value) {
      const { province } = this.parent;
      return province ? iranCities[province]?.includes(value) : false;
    }),
  birthDate: yup
    .date()
    .required('وارد کردن تاریخ تولد اجباری است.')
    .min(new Date('1900-1-1'), 'شما از محدوده ی سنی خارج هستید.')
    .max(new Date(), 'شما از محدوده ی زمانی خارج هستید.'),
  school: yup.string().required('وارد کردن مدرسه اجباری است!'),
  phoneNumber: yup
    .string()
    .matches(
      /^(\+?\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      'فرمت شماره همراه نامعتبر است.',
    ),
  username: yup
    .string()
    .required('وارد کردن نام کاریری الزامی است.')
    .min(4, 'باید دستکم 4 حرف داشته باشد.')
    .matches(
      new RegExp('^[a-zA-Z_][a-zA-Z0-9_]*$'),
      'فقط از حروف و اعداد انگلیسی میتوانید استفاده کنید!',
    ),
  password: yup.string().required('وارد کردن پسورد واجب است.'),
  passwordConfirm: yup
    .string()
    .test('matching', 'گذرواژه باید با تکرارش بکسان باشد.', function (value) {
      return value == this.parent.password;
    }),
});

export default validationSchema;
