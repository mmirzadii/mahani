import { Box, Grid, Container } from '@mui/material';
import GroupList from './GroupLIst.tsx';
import AssignmentList from './AssignmentList.tsx';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store.tsx';
import { User } from '../../../../constant/types/user.ts';

function EventPage() {
  const currentUser = useSelector<RootState, User | null>((state) => {
    console.log(state.session.currentUser);
    return state.session.currentUser;
  });
  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={12} md={3} sx={{ height: '100vh', maxHeight: '100vh' }}>
          <Box display={'flex'} justifyContent={'center'}>
            {currentUser?.isSuperuser && (
              <Button
                variant={'contained'}
                color={'warning'}
                sx={{ marginTop: 1.5, marginBottom: 1.5, width: '90%' }}
                endIcon={<SettingsIcon />}
              >
                مدیریت رویداد
              </Button>
            )}
            <GroupList />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{ height: '1000px', backgroundColor: 'blue' }}
        >
          <AssignmentList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default EventPage;
