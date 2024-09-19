import React, { useContext, useEffect, useRef, useState } from 'react';
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
import {
  createMessage,
  getMessages,
} from '../../../../redux/reducers/MessageSlice.tsx';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../constant/types/user.ts';
import { AssignmentContext } from './Index.tsx';

const ChatRoom = () => {
  const assignment = useContext(AssignmentContext);
  const navigate = useNavigate();
  const messages = useSelector<RootState, Message[]>(
    (state) => state?.message.messages,
  );
  const nextPage = useSelector<RootState, string | null>(
    (state) => state?.message.nextPage,
  );
  const currentUser = useSelector<RootState, User | null>(
    (state) => state?.session.currentUser,
  );
  const [newMessage, setNewMessage] = useState('');
  const [page, setPage] = useState<number>(0);
  const messageBox = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!assignment || !assignment.id) {
      return;
    }
    try {
      const numericAssignmentId = assignment.id;
      dispatch(getMessages({ assignment: numericAssignmentId, page }));
    } catch (e) {
      navigate(-1);
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!assignment?.id || !currentUser || !currentUser?.id) {
      return;
    }

    dispatch(
      createMessage({
        assignment: assignment.id,
        content: newMessage,
        sender: currentUser.id,
      }),
    );
    setNewMessage('');
  };

  const fetchMoreData = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 2,
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
          overflow: 'auto',
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
            overflow: 'auto',
            padding: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            marginBottom: 2,
          }}
          ref={messageBox}
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
                messages
                  .filter((message) => message.assignment == assignment?.id)
                  .map((message, index) => (
                    <React.Fragment key={index}>
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
