import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import MessageBox from './MessageBox.tsx';
import { useParams } from 'react-router-dom';

const AssignmentPage = () => {
  const { assignmentId } = useParams();
  return (
    <Box>
      <Grid container>
        <Grid item sm={4}>
          <MessageBox assignmentId={assignmentId} />
        </Grid>
        <Grid item sm={5}></Grid>
        <Grid item sm={3}></Grid>
      </Grid>
    </Box>
  );
};

export default AssignmentPage;
