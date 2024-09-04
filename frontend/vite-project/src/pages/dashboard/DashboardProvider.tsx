import { useEffect, useState } from 'react';
import myAxios from '../../setting/connectApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingModal from '../../components/LoadingModal';
import { AppDispatch } from '../../redux/store.tsx';
import { getProfile } from '../../redux/reducers/SessionSlice.tsx';

function DashboardProvider(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token-access');

    if (!token) {
      navigate('/login'); // Ensure the path matches your route
      return;
    }

    myAxios.defaults.headers['Authorization'] = `Bearer ${token}`;

    dispatch(getProfile())
      .unwrap()
      .catch(() => {
        navigate('/login'); // Redirect if the token is invalid
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, navigate]); // Add dispatch and navigate to the dependency array

  return (
    <>
      {!loading && props.children}
      <LoadingModal
        open={loading}
        onClose={() => {
          setLoading(false);
        }}
      />
    </>
  );
}

export default DashboardProvider;
