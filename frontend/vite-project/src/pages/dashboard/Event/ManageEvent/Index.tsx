import { Container, Grid } from '@mui/material';
import AddGroup from './AddGroup.tsx';
import AddAssignment from './AddAssignment.tsx';
import { useEffect, useState } from 'react';
import { getCurrentEvent } from '../../../../redux/reducers/SessionSlice.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingModal from '../../../../components/LoadingModal.tsx';

function ManageEventPage() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setLoading(true);
    if (!eventId) {
      setLoading(false);
      navigate('/dashboard');
      return;
    }

    try {
      const numericId: number = parseInt(eventId);
      dispatch(getCurrentEvent(numericId))
        .unwrap()
        .catch(() => {
          navigate('/dashboard');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {}
  }, [eventId, navigate]);

  return !loading ? (
    <Container maxWidth={'lg'}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <AddGroup />
        </Grid>
        <Grid item xs={12} md={6}>
          <AddAssignment />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <LoadingModal
      open={loading}
      onClose={() => {
        setLoading(false);
      }}
    />
  );
}

export default ManageEventPage;
