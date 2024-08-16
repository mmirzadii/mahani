// src/pages/HomePage.tsx

import React from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Custom primary color
    },
    secondary: {
      main: '#dc004e', // Custom secondary color
    },
  },
});

const HomePage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to My Home Page
        </Typography>
        <Typography variant="h5" paragraph>
          This is a simple home page example using Material-UI components.
        </Typography>
        <Button variant="contained" color="primary" href="#learn-more">
          Learn More
        </Button>
        <Card sx={{ maxWidth: 345, mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Sample Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is an example of a Material-UI card component.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
