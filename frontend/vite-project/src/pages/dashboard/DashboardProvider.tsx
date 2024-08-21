import { useEffect } from 'react';
import myAxios from '../../setting/connectApi.ts';
import { useNavigate } from 'react-router-dom';

function DashboardProvider(props: any) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token-access')) {
      navigate('login');
    }
    myAxios.defaults.headers['Authorization'] =
      `Bearer ${localStorage.getItem('token-access')}`;
  }, []);

  return <div>{props.children}</div>;
}

export default DashboardProvider;
