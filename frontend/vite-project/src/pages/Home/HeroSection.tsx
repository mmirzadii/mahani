import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('src/pages/Home/background.jpg')" }}
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">به ماهانی خوش آمدید!</h1>
          <p className="text-xl mb-8">
            انجمن مسابقات ماهانی راهی نوین برای دانشمندان جدید ریاضی
          </p>
          <div className={'flex justify-center gap-3'}>
            <Link
              to={'/signup'}
              className="basis.1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
              ثبت نام
            </Link>
            <Link
              to={'/login'}
              className="basis.1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
              ورود
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
