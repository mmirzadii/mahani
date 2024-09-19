import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
} from '@mui/material';

const FileDisplay = (file: { name: string | undefined; link: string }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        {/* Assuming it's an image, for other file types, display differently */}
        <CardMedia
          component="img"
          image={'/components/filepic.webp'} // File URL from API
          alt={file.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ textWrap: 'wrap' }}
          >
            {file.name}
          </Typography>
        </CardContent>
        <CardActions>
          {/* Download link */}
          <Button size="small" color="primary" href={file.link} download>
            Download
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FileDisplay;
