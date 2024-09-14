import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store.tsx';
import { Message } from '../../../../constant/types/event.ts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMessages } from '../../../../redux/reducers/MessageSlice.tsx';
import { useNavigate } from 'react-router-dom';

const ChatRoom = ({ assignmentId }: { assignmentId: string | undefined }) => {
  const navigate = useNavigate();
  const messages = useSelector<RootState, Message[]>(
    (state) => state?.message.messages,
  );
  const nextPage = useSelector<RootState, string | null>(
    (state) => state?.message.nextPage,
  );
  const [newMessage, setNewMessage] = useState('');
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!assignmentId) {
      return;
    }
    try {
      const numericAssignmentId = parseInt(assignmentId);
      dispatch(getMessages({ assignment: numericAssignmentId, page }));
    } catch (e) {
      navigate(-1);
    }
  }, [page, dispatch]);

  const handleSendMessage = () => {};

  const fetchMoreData = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 8,
        marginBottom: 8,
        padding: 0,
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          Chat Room
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            marginBottom: 2,
          }}
        >
          <List>
            <InfiniteScroll
              dataLength={messages.length} // Length of the current group list
              next={fetchMoreData} // Function to call when more data is needed
              hasMore={!!nextPage} // Whether there are more pages to load
              loader={
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                </Box>
              }
              endMessage={
                messages.length > 20 ? ( // Check if groups length is greater than 20
                  <p style={{ textAlign: 'center' }}></p>
                ) : null
              }
            >
              {messages &&
                messages.map((message) => (
                  <React.Fragment key={message.id}>
                    <ListItem alignItems="flex-start">
                      <Avatar sx={{ marginRight: 2 }}>
                        {message.sender.firstName +
                          ' ' +
                          message.sender.lastName}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography fontWeight="bold">
                            {message.sender.firstName +
                              ' ' +
                              message.sender.lastName}
                          </Typography>
                        }
                        secondary={message.content}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
            </InfiniteScroll>
          </List>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{
              borderRadius: '50%',
              minWidth: 50,
              height: 50,
            }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatRoom;
