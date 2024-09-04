import React from 'react';
import HeroSection from './HeroSection.tsx';
import FeatherSection from './FeatherSection.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.tsx';
import { useEffect } from 'react';
import { getProfile } from '../../redux/reducers/SessionSlice.tsx';

const HomePage: React.FC = () => {
  const currentUser = useSelector(
    (state: RootState) => state.session.currentUser,
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProfile());
    console.log(currentUser);
  }, []);
  return (
    <div>
      <HeroSection />
      <FeatherSection />
    </div>
  );
};

export default HomePage;
