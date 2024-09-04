import { Box, Grid, Container } from '@mui/material';
import GroupList from './GroupLIst.tsx';
import AssignmentList from './AssignmentList.tsx';

function EventPage() {
  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={12} md={3} sx={{ height: '100vh', maxHeight: '100vh' }}>
          <Box padding={0}>
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
