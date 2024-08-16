import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';

function HomePage() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            سلام
          </Typography>
          <Button color="inherit">התחברות</Button>
        </Toolbar>
      </AppBar>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          ברוכים הבאים לאתר שלנו!
        </Typography>
        <Typography variant="body1" paragraph>
          זהו דף הבית שלנו. כאן תוכלו למצוא מידע נוסף על השירותים שאנו מציעים.
        </Typography>
        <Button variant="contained" color="primary">
          קרא עוד
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
