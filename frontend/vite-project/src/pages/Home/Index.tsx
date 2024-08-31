import React from 'react';
import HeroSection from './HeroSection.tsx';
import FeatherSection from './FeatherSection.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.tsx';
import { useEffect } from 'react';
import { getUser } from '../../redux/reducers/UserSlice.tsx';

const HomePage: React.FC = () => {
  const student = useSelector((state: RootState) => state.student?.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUser());
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
