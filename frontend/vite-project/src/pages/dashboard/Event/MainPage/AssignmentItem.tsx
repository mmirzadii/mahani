import Typography from '@mui/material/Typography';
import type { Assignment } from '../../../../constant/types/event.ts';
import { styled } from '@mui/material/styles';
import { ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Assignment({ assignment }: { assignment: Assignment }) {
  const Item = styled(ListItem)(({ theme }) => ({
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
    cursor: 'pointer',
  }));

  const navigate = useNavigate();

  return (
    <>
      <Item
        onClick={() => {
          navigate(`/dashboard/event/assignment/${assignment.id}`);
        }}
        sx={{ mx: 'auto' }}
      >
        <Typography fontWeight={'bold'} variant={'subtitle1'}>
          {assignment.name}
        </Typography>
        <Typography variant={'subtitle2'}>{assignment.description}</Typography>
      </Item>
    </>
  );
}
