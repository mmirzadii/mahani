import HeroSection from './HeroSection.tsx';
import FeatherSection from './FeatherSection.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.tsx';
import { useEffect } from 'react';
import { getStudent } from '../../redux/reducers/StudentSlice.tsx';

const HomePage: React.FC = () => {
  const student = useSelector((state: RootState) => state.student?.student);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getStudent());
    console.log(student);
  }, []);
  return (
    <div>
      <HeroSection />
      <FeatherSection />
    </div>
  );
};

export default HomePage;
