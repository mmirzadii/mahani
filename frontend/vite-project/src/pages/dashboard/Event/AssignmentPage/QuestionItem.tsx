import Typography from '@mui/material/Typography';
import type { Question } from '../../../../constant/types/event.ts';
import { styled } from '@mui/material/styles';
import { ListItem } from '@mui/material';

export default function QuestionItem({ question }: { question: Question }) {
  const Item = styled(ListItem)(({ theme }) => ({
    backgroundColor: '#f8c1c1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
    cursor: 'pointer',
  }));

  return (
    <>
      <Item onClick={() => {}} sx={{ mx: 'auto' }}>
        <Typography fontWeight={'bold'} variant={'subtitle1'}>
          {question.name}
        </Typography>
        <Typography variant={'subtitle2'}>{question.text}</Typography>
      </Item>
    </>
  );
}
