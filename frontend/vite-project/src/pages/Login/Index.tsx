import TextInput from '../../components/TextInput.tsx';

const loginInputs = [
  { label: 'نام کاربری', name: 'username', id: 'username' },
  { label: 'گذرواژه', name: 'password', id: 'password' },
];

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          ورود به حساب کاربری
        </h2>

        <form>
          {loginInputs.map((props) => (
            <TextInput {...props} />
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
