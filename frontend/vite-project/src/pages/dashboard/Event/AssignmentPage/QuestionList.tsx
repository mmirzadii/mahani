import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import List from '@mui/material/List';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { User } from '../../../../constant/types/user.ts';
import { useContext, useEffect, useState } from 'react';
import AddQuestion from '../ManageEvent/AddQuestion.tsx';
import { Question } from '../../../../constant/types/event.ts';
import QuestionItem from './QuestionItem.tsx';
import { getQuestions } from '../../../../redux/reducers/QuestionSlice.tsx';
import { AssignmentContext } from './Index.tsx';

function QuestionList() {
  const assignment = useContext(AssignmentContext);
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.session.currentUser,
  );
  const questions = useSelector<RootState, Question[]>((state) =>
    state.question.questions.filter(
      (question) => question.assignment == assignment?.id,
    ),
  );
  const nextPage = useSelector<RootState, string | null>(
    (state) => state.question.nextPage,
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!assignment?.id) {
      return;
    }
    dispatch(getQuestions({ assignment: assignment.id, page }));
  }, [dispatch, page]);

  const fetchMoreData = () => {
    setPage((prevState) => prevState + 1);
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
            color={'#730000'}
            variant={'h6'}
            sx={{ opacity: 0.7 }}
            fontWeight={'bold'}
          >
            <QuestionMarkIcon />
            سوال ها
          </Typography>
          {currentUser?.isStaff && (
            <Chip
              onClick={() => {
                setDialogOpen(true);
              }}
              label={'افزودن سوال'}
              icon={<AddCircleIcon />}
              color={'primary'}
            />
          )}
        </Box>
        <Divider sx={{ backgroundColor: 'blue' }} />
        <List>
          <InfiniteScroll
            dataLength={questions.length} // Length of the current group list
            next={fetchMoreData} // Function to call when more data is needed
            hasMore={!!nextPage} // Whether there are more pages to load
            loader={
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            }
            endMessage={
              questions.length > 20 ? ( // Check if groups length is greater than 20
                <p style={{ textAlign: 'center' }}>No more groups to load</p>
              ) : null
            }
          >
            {questions.length > 0 ? (
              questions.map((question, index) => {
                return (
                  <div key={index}>
                    {index > 0 && (
                      <Divider variant={'inset'} component={'li'} />
                    )}
                    <QuestionItem key={index} question={question} />
                  </div>
                );
              })
            ) : (
              <Typography sx={{ opacity: 0.5, textAlign: 'center' }}>
                هیچ تمرینی موجود نیست.
              </Typography>
            )}
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
            <AddQuestion />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default QuestionList;
