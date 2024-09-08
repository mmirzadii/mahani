import List from '@mui/material/List';
import {
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { Event, Group } from '../../../../constant/types/event.ts';
import { useEffect, useState } from 'react';
import { getGroups } from '../../../../redux/reducers/GroupSlice.tsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@mui/material/Box';
import GroupItem from './GroupItem.tsx';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { User } from '../../../../constant/types/user.ts';
import AddGroup from '../ManageEvent/AddGroup.tsx';

const GList = styled(List)(({ theme }) => ({
  backgroundColor: 'black',
  color: theme.palette.secondary.dark,
  maxHeight: '100vh',
}));

export default function GroupList() {
  const groups = useSelector<RootState, Group[]>(
    (state) => state?.group.groups,
  );
  const currentEvent = useSelector<RootState, Event | null>(
    (state) => state?.session.currentEvent,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const nextPage = useSelector<RootState, string | null>(
    (state) => state?.group.nextPage,
  );
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.session.currentUser,
  );

  useEffect(() => {
    if (!currentEvent) {
      return;
    }
    dispatch(getGroups({ event: currentEvent.id, page: page }));
  }, [page, dispatch]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to fetch more data
  };

  return (
    <>
      <Box
        sx={{ borderRightColor: 'gray', borderRightWidth: 1 }}
        mt={-1}
        height={'100%'}
      >
        <Box
          mt={3}
          mb={1}
          pr={2}
          pl={2}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography
            fontWeight={'bold'}
            variant={'h6'}
            sx={{ opacity: '0.6' }}
          >
            گروه ها
          </Typography>
          {currentUser?.isStaff && (
            <Chip
              onClick={() => {
                setDialogOpen(true);
              }}
              label={'افزودن گروه'}
              icon={<AddCircleIcon />}
              color={'warning'}
            />
          )}
        </Box>
        <Stack>
          <GList sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <InfiniteScroll
              dataLength={groups.length} // Length of the current group list
              next={fetchMoreData} // Function to call when more data is needed
              hasMore={!!nextPage} // Whether there are more pages to load
              loader={
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                </Box>
              }
              endMessage={
                groups.length > 20 ? ( // Check if groups length is greater than 20
                  <p style={{ textAlign: 'center' }}>No more groups to load</p>
                ) : null
              }
            >
              {groups.map((group, index) => (
                <GroupItem key={index} group={group} />
              ))}
            </InfiniteScroll>
          </GList>
        </Stack>
      </Box>
      {currentUser?.isStaff && (
        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
        >
          <DialogContent>
            <AddGroup />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
