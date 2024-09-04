import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store.tsx';
import { getEvents } from '../../../redux/reducers/EventSlice.tsx';
import { Event } from '../../../constant/types/event.ts';
import { getCurrentEvent } from '../../../redux/reducers/SessionSlice.tsx';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#e1f5fe' : '#e1f5fe',
  ...theme.typography.h5,
  paddingLeft: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  paddingTop: theme.spacing(4),
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
}));

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector<RootState, Event[]>(
    (state: RootState) => state?.event.events,
  );
  const loadingEvent = useSelector<RootState, boolean>(
    (state: RootState) => state?.event.loading,
  );
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const openEvent = (id: number) => {
    console.log('jjj');
    dispatch(getCurrentEvent(id));
  };
  return (
    <React.Fragment>
      <Container maxWidth={'xl'}>
        <Paper elevation={5} square>
          <Box mt={2} mb={2} pt={6} pr={2} pl={2} pb={6} maxWidth={'2000px'}>
            <Typography
              variant={'h4'}
              sx={{
                textAlign: 'center',
                letterSpacing: 10,
              }}
            >
              لیست رویداد ها
            </Typography>
            <Typography
              mt={4}
              padding={5}
              variant={'h5'}
              textAlign={'justify'}
              sx={{ textAlign: 'justify', textJustify: 'inter-word' }}
            >
              انجمن ماهانی هر ساله در جهت رشد و گسترش تفکر ریاضیاتی بین دانش
              آموزان بکسری رویداد های ریاضی برگزار میکند برای ثبت نام به
              پشتیبانی پیام دهید.
            </Typography>

            <Box mt={2}>
              <Stack spacing={2}>
                {loadingEvent ? (
                  <CircularProgress />
                ) : (
                  events.map((value, index) => (
                    <Item key={index}>
                      <Typography variant={'h5'} fontWeight={'bold'}>
                        {value.name}
                      </Typography>

                      <Typography mt={2}>{value.description}</Typography>
                      <Box mr={2} mt={2} sx={{ marginLeft: 'auto' }}>
                        <Button
                          variant={'contained'}
                          color={'error'}
                          sx={{
                            paddingRight: '20px',
                            paddingLeft: '20px',
                            paddingBottom: '10px',
                            paddingTop: '10px',
                            minWidth: '8rem',
                          }}
                          onClick={() => {
                            openEvent(value.id);
                          }}
                        >
                          <Typography>ورود</Typography>
                        </Button>
                      </Box>
                    </Item>
                  ))
                )}
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Home;
