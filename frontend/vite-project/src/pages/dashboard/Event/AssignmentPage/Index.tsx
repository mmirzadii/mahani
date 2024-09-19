import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import MessageBox from './MessageBox.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import AssignmentInfo from './AssignmentInfo.tsx';
import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store.tsx';
import { Assignment } from '../../../../constant/types/event.ts';
import QuestionList from './QuestionList.tsx';

export const AssignmentContext = createContext<Assignment | null>(null);

const AssignmentPage = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const assignments = useSelector<RootState, Assignment[]>(
    (state) => state.assignment.assignments,
  );
  useEffect(() => {
    if (assignmentId && assignments) {
      const assignment = assignments.filter(
        (assignment) => '' + assignment.id == assignmentId,
      );
      if (assignment.length < 1) {
        navigate('/dashboard');
      }
      setAssignment(assignment[0]);
    }
  }, [assignments, assignmentId]);
  return (
    <AssignmentContext.Provider value={assignment}>
      <Box>
        <Grid container>
          <Grid item sm={4}>
            <MessageBox />
          </Grid>
          <Grid item sm={5}>
            <AssignmentInfo />
          </Grid>
          <Grid item sm={3}>
            <QuestionList />
          </Grid>
        </Grid>
      </Box>
    </AssignmentContext.Provider>
  );
};

export default AssignmentPage;
