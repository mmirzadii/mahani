import { Grid } from '@mui/material';
import GroupList from './GroupList.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { Event } from '../../../../constant/types/event.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingModal from '../../../../components/LoadingModal.tsx';
import { getCurrentEvent } from '../../../../redux/reducers/SessionSlice.tsx';
import AssignmentList from './AssignmentList.tsx';
import EventInfo from './EventInfo.tsx';

function EventPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLoading(true);
    if (!id) {
      setLoading(false);
      navigate('/dashboard');
      return;
    }

    try {
      const numericId: number = parseInt(id);

      dispatch(getCurrentEvent(numericId))
        .unwrap()
        .catch(() => {
          navigate('/dashboard');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {}
  }, [id, navigate]);

  const currentEvent = useSelector<RootState, Event | null>(
    (state) => state.session.currentEvent,
  );
  return loading ? (
    <LoadingModal open={loading} onClose={() => setLoading(false)} />
  ) : (
    <Grid container>
      <Grid item xs={12} md={3}>
        <GroupList />
      </Grid>
      <Grid item xs={12} md={5}>
        <EventInfo event={currentEvent} />
      </Grid>
      <Grid item xs={12} md={4}>
        <AssignmentList />
      </Grid>
    </Grid>
  );
}

export default EventPage;
