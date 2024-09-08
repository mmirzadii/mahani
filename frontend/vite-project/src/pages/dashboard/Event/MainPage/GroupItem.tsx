import { Group } from '../../../../constant/types/event.ts';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import ListItemText from '@mui/material/ListItemText';
import { Chip, styled } from '@mui/material';
import ListItem from '@mui/material/ListItem';

const GListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: 'darkblue',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const GroupItem = ({ group }: { group: Group }) => {
  return (
    <GListItem key={group.id}>
      <ListItemAvatar>
        <Avatar>
          <GroupsIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={group.name}
        secondary={
          Array.isArray(group.members) && group.members.length > 0
            ? group.members.reduce((acc, member, index) => {
                return (
                  acc +
                  (index > 0 ? ' و ' : '') + // Add 'و' between members if it's not the first one
                  member.firstName +
                  ' ' +
                  member.lastName
                );
              }, '')
            : 'هیچ عضوی یافت نشد.'
        }
      />
      <Chip label={group.score} color={'primary'} />
    </GListItem>
  );
};

export default GroupItem;
