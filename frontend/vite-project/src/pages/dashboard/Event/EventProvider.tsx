import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingModal from '../../../components/LoadingModal';
import { RootState } from '../../../redux/store.tsx';
import { Event } from '../../../constant/types/event.ts';

function EventProvider(props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const event = useSelector<RootState, Event | null>(
    (state) => state.session.currentEvent,
  );

  useEffect(() => {
    setLoading(true);
    if (!event) {
      navigate('/dashboard/');
      return;
    }
    setLoading(false);
  }, []);

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

export default EventProvider;
