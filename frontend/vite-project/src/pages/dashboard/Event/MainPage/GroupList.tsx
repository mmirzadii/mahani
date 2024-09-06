import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { CircularProgress, Stack, styled } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { Event, Group } from '../../../../constant/types/event.ts';
import { useEffect, useState } from 'react';
import { getGroups } from '../../../../redux/reducers/GroupSlice.tsx';

const GList = styled(List)(({ theme }) => ({
  backgroundColor: 'black',
  color: theme.palette.secondary.dark,
  maxHeight: '100vh',
  overflow: 'auto',
}));

const GListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: 'darkblue',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function GroupList() {
  const groups = useSelector<RootState, Group[]>(
    (state) => state?.group.groups,
  );
  const currentEvent = useSelector<RootState, Event | null>(
    (state) => state?.session.currentEvent,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (!currentEvent) {
      setLoading(false);
      return;
    }
    dispatch(getGroups(currentEvent.id)).finally(() => {
      setLoading(false);
    });
  }, [currentEvent]);

  return !loading ? (
    <Stack>
      <GList sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {groups.map((group) => (
          <GListItem key={group.id}>
            <ListItemAvatar>
              <Avatar>
                <GroupsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={group.name}
              secondary={group.members.reduce((acc, member, index) => {
                return (
                  acc +
                  (index > 0 ? 'و ' : '') +
                  member.firstName +
                  ' ' +
                  member.lastName
                );
              }, '')}
            />
          </GListItem>
        ))}
      </GList>
    </Stack>
  ) : (
    <CircularProgress />
  );
}
