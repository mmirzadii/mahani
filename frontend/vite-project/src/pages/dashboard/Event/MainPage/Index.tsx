import { Grid, Stack } from '@mui/material';
import GroupList from './GroupList.tsx';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { User } from '../../../../constant/types/user.ts';
import { Event } from '../../../../constant/types/event.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingModal from '../../../../components/LoadingModal.tsx';
import { getCurrentEvent } from '../../../../redux/reducers/SessionSlice.tsx';

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

  const currentUser = useSelector<RootState, User | null>(
    (state) => state.session.currentUser,
  );
  const currentEvent = useSelector<RootState, Event | null>(
    (state) => state.session.currentEvent,
  );
  return loading ? (
    <LoadingModal open={loading} onClose={() => setLoading(false)} />
  ) : (
    <Grid container>
      <Grid item xs={12} md={3} sx={{ height: '100vh', maxHeight: '100vh' }}>
        <Stack display={'flex'} justifyContent={'center'}>
          {currentUser?.isSuperuser && (
            <Button
              variant={'contained'}
              color={'warning'}
              sx={{
                marginTop: 1.5,
                marginBottom: 1.5,
                width: '90%',
                marginLeft: 1.5,
              }}
              endIcon={<SettingsIcon />}
              onClick={() => {
                navigate(`/dashboard/event/manage/${currentEvent?.id}`);
              }}
            >
              مدیریت رویداد
            </Button>
          )}
          <GroupList />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        sx={{ height: '1000px', backgroundColor: 'blue' }}
      ></Grid>
    </Grid>
  );
}

export default EventPage;
