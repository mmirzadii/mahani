import { Container, Grid } from '@mui/material';
import AddGroup from './AddGroup.tsx';
import AddAssignment from './AddAssignment.tsx';

function ManageEventPage() {
  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{}}>
          <AddGroup />
        </Grid>
        <Grid item xs={12} md={6}>
          <AddAssignment />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ManageEventPage;
