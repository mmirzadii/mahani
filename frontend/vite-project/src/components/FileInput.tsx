import React, { useState } from 'react';
import { Button, Input, Typography } from '@mui/material';

export default function FileInput() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: 'image/jpeg, image/png' }} // Restrict to specific file types
        style={{ display: 'none' }} // Hide the default file input
        id="file-input"
      />

      {/* Button to trigger the file input */}
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">
          Upload File
        </Button>
      </label>

      {/* Display the selected file name */}
      {file && (
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Selected file: {file.name}
        </Typography>
      )}
    </div>
  );
}
