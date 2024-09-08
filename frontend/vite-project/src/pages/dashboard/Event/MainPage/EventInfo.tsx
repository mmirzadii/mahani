import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import { Chip, Divider, Stack, Typography } from '@mui/material';
import { Event, Group } from '../../../../constant/types/event.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store.tsx';

const EventInfo = ({ event }: { event: Event | null }) => {
  const groups = useSelector<RootState, Group[]>(
    (state) => state?.group.groups,
  );

  return (
    <Paper sx={{ margin: 2, borderRadius: '10px' }} elevation={3}>
      <Box pt={1} pl={2} pb={1}>
        <Typography
          color={'#a11717'}
          variant={'h6'}
          sx={{ opacity: 0.7 }}
          fontWeight={'bold'}
        >
          <InfoIcon /> اطلاعات رویداد
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'red' }} />
      <Box pt={1} pl={2} pb={2}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mb={2}
        >
          <Typography fontWeight={'bold'} sx={{}} variant={'h6'} gutterBottom>
            {event?.name}
          </Typography>
          <Typography fontWeight={''} sx={{}} variant={'subtitle1'}>
            {event?.description}
          </Typography>
        </Box>
        <Divider textAlign={'center'}>مدیران</Divider>
        <Box pt={3} pb={3} pr={1} pl={1}>
          <Stack
            direction={'row'}
            spacing={1}
            sx={{ flexWrap: 'wrap', gap: 2 }}
          >
            {groups.map((group, index) => (
              <Chip
                key={index}
                label={group.manager.firstName + ' ' + group.manager.lastName}
                sx={{ fontSize: 16, padding: '10px' }}
              />
            ))}

            <Chip label="fdsafa" sx={{ fontSize: 20, padding: '10px' }} />
            <Chip label="fdsafa" sx={{ fontSize: 20, padding: '10px' }} />
            <Chip label="fdsafa" sx={{ fontSize: 20, padding: '10px' }} />
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default EventInfo;
