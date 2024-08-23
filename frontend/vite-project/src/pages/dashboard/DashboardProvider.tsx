import { useEffect } from 'react';
import myAxios from '../../setting/connectApi.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudent } from '../../redux/reducers/StudentSlice.tsx';
import { AppDispatch, RootState } from '../../redux/store.tsx';
import LoadingModal from '../../components/LoadingModal.tsx';

function DashboardProvider(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector<RootState, boolean>(
    (state) => state?.student.loading,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token-access')) {
      navigate('login');
    }
    myAxios.defaults.headers['Authorization'] =
      `Bearer ${localStorage.getItem('token-access')}`;
    dispatch(getStudent());
  }, []);

  return (
    <>
      {!loading && props.children}
      <LoadingModal open={loading} onClose={() => {}}></LoadingModal>
    </>
  );
}

export default DashboardProvider;
