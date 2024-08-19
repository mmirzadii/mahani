import React from 'react';
import {
  Dialog,
  CircularProgress,
  Typography,
  Box,
  Backdrop,
} from '@mui/material';

interface LoadingModalProps {
  open: boolean;
  onClose: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="loading-dialog-title"
      aria-describedby="loading-dialog-description"
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <Backdrop open={open} style={{ color: '#fff', zIndex: 1300 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            لطفا منتظر بمانید...
          </Typography>
        </Box>
      </Backdrop>
    </Dialog>
  );
};

export default LoadingModal;
