import { Divider, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import FileDisplay from '../../../../components/FileDisplay.tsx';
import { useContext } from 'react';
import { AssignmentContext } from './Index.tsx';

const AssignmentInfo = () => {
  const assignment = useContext(AssignmentContext);
  return (
    <Paper sx={{ margin: 2, borderRadius: '10px' }} elevation={3}>
      <Box pt={1} pl={2} pb={1}>
        <Typography
          color={'#041272'}
          variant={'h6'}
          sx={{ opacity: 0.7 }}
          fontWeight={'bold'}
        >
          <InfoIcon /> اطلاعات تمرین
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'blue' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 2,
          paddingBottom: 2,
        }}
        mb={2}
      >
        <Typography fontWeight={'bold'} sx={{}} variant={'h6'} gutterBottom>
          {assignment?.name}
        </Typography>
        <Typography fontWeight={''} sx={{}} variant={'subtitle1'}>
          {assignment?.description}
        </Typography>
      </Box>
      {assignment?.content && (
        <>
          <Divider textAlign={'center'}>فایل های آموزشی</Divider>
          <Box display={'flex'} justifyContent={'center'}>
            <FileDisplay
              name={
                assignment?.content instanceof File
                  ? ''
                  : assignment?.content?.split('/').pop()
              }
              link={
                assignment?.content instanceof File
                  ? assignment.content.name
                  : assignment?.content
              }
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default AssignmentInfo;
