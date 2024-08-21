import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Drawer,
  Typography,
} from '@mui/material';

import { Menu, Home, Lock } from '@mui/icons-material';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const listItems = [
  {
    listIcon: <Home />,
    listText: 'خانه',
  },
  {
    listIcon: <AccountCircleIcon />,
    listText: 'پروفایل',
  },
  {
    listIcon: <Lock />,
    listText: 'خروج از حساب کاربری',
  },
];

export default function App() {
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const sideList = () => (
    <Box
      style={{
        width: 250,

        height: '100%',
      }}
      component="div"
    >
      <Box style={{ background: '#b21010', padding: '0.5rem 0' }}>
        <Avatar
          style={{
            margin: '0rem auto',
            padding: '0',
            width: '13rem',
            height: '13rem',
          }}
          src="./public/dashboard/Avatar.jpg"
          alt="provile"
        />
      </Box>
      <Divider />

      <List>
        {listItems.map((listItem, index) => (
          <ListItem
            style={{
              color: '#6c5b42',
              fontWeight: 'bold',
            }}
            button
            key={index}
          >
            <ListItemIcon
              style={{
                color: '#6c5b42',
              }}
            >
              {listItem.listIcon}
            </ListItemIcon>
            <ListItemText primary={listItem.listText} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />

      <Box component="nav">
        <AppBar position="static" style={{ height: '80px' }}>
          <Toolbar style={{ minHeight: '80px' }}>
            {' '}
            {/* Ensures Toolbar matches the AppBar height */}
            <IconButton onClick={toggleSlider} size="large">
              <Menu />
            </IconButton>
            <Typography style={{ marginRight: '2rem', fontSize: '1.5rem' }}>
              انجمن ریاضی ماهانی
            </Typography>
            <Drawer open={open} anchor="right" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
