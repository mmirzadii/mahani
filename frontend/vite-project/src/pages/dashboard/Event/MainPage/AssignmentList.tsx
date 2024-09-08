import Box from '@mui/material/Box';
import AssignmentItem from './AssignmentItem.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { Assignment, Event } from '../../../../constant/types/event.ts';
import {
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAssignments } from '../../../../redux/reducers/AssignmentSlice.tsx';
import Paper from '@mui/material/Paper';
import AssignmentIcon from '@mui/icons-material/Assignment';
import List from '@mui/material/List';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { User } from '../../../../constant/types/user.ts';
import AddAssignment from '../ManageEvent/AddAssignment.tsx';

export default function AssignmentList() {
  const [page, setPage] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const nextPage = useSelector<RootState, string | null>(
    (state) => state.assignment.nextPage,
  );
  const currentEvent = useSelector<RootState, Event | null>(
    (state) => state?.session.currentEvent,
  );
  const currentUser = useSelector<RootState, User | null>(
    (state) => state?.session.currentUser,
  );
  const assignments = useSelector<RootState, Assignment[]>(
    (state) => state?.assignment.assignments,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!currentEvent) {
      return;
    }
    dispatch(getAssignments({ event: currentEvent.id, page }));
  }, [page, dispatch]);
  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <Paper sx={{ margin: 2, borderRadius: '10px' }} elevation={3}>
        <Box
          pt={1}
          pl={2}
          pr={2}
          pb={1}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Typography
            color={'#090ab0'}
            variant={'h6'}
            sx={{ opacity: 0.7 }}
            fontWeight={'bold'}
          >
            <AssignmentIcon /> تمرین ها
          </Typography>
          {currentUser?.isStaff && (
            <Chip
              onClick={() => {
                setDialogOpen(true);
              }}
              label={'افزودن تمرین'}
              icon={<AddCircleIcon />}
              color={'primary'}
            />
          )}
        </Box>
        <Divider sx={{ backgroundColor: 'blue' }} />
        <List>
          <InfiniteScroll
            dataLength={assignments.length} // Length of the current group list
            next={fetchMoreData} // Function to call when more data is needed
            hasMore={!!nextPage} // Whether there are more pages to load
            loader={
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            }
            endMessage={
              assignments.length > 20 ? ( // Check if groups length is greater than 20
                <p style={{ textAlign: 'center' }}>No more groups to load</p>
              ) : null
            }
          >
            {assignments.map((assignment, index) => {
              return (
                <div key={index}>
                  {index > 0 && <Divider variant={'inset'} component={'li'} />}
                  <AssignmentItem key={index} assignment={assignment} />
                </div>
              );
            })}
          </InfiniteScroll>
        </List>
      </Paper>
      {currentUser?.isStaff && (
        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
        >
          <DialogContent>
            <AddAssignment />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
