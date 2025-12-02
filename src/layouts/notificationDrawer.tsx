// components/NotificationDrawer.tsx
import React from 'react';
import { Drawer, Box, Stack, Typography } from '@mui/material';
import { CloseIcon } from '../assets/icons/closeIcon';
import CustomIcon from '../components/core/reusable/CustomIcon';
import { notificationConstants } from '../constants/dashboard-constants';
import EventIcon from '../assets/icons/event';
import Chip from '../components/core/reusable/chip/chip';
import CustomButton from '../components/core/reusable/custom-button/custom-button';
import { StatusEnum } from '../models/chip';
import { VideoCam } from '../assets/icons/videoCamIcon';
import { PersonIcon } from '../assets/icons/personIcon';
import { Laptop } from '../assets/icons/laptopIcon';
import { Transaction } from '../assets/icons/tranactionIcon';
import { KeyboardArrowRight } from '../assets/icons/keyboardArrow';

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const NOTIFICATION_MOCK_DATA: {
  name: string;
  chip: StatusEnum;
  code: string;
  code_desc: string;
  paid: string;
  date: string;
  time: string;
  daysb4: string;
  from: string;
  gmeet: string;
  dollar: number;
} = {
  name: 'Andrew Peterson',
  chip: 'NEW_PATIENT',
  code: '99441',
  code_desc: 'Initial Phone Consultation - $60',
  paid: 'Paid',
  date: 'Fri, Mar 20 2025 10:00 AM',
  time: '40 Mins',
  daysb4: '1 day',
  from: 'Booking Widget',
  gmeet: 'https://meet.google.com/abc-defg-hij',
  dollar: 120,
};

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
            width:'40%',
          borderTopLeftRadius: '13px',
          borderBottomLeftRadius: '13px',
          backgroundColor: 'Neutral.20',
        },
      }}
    >
      <Box sx={{ height: '100%',  padding: 2 }} role="presentation" onClick={onClose}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" paddingY={2}>
          <Typography variant="bodyMedium3" color="Primary.main">
            {notificationConstants.NOTIFICATION}
          </Typography>
          <CustomIcon onClick={onClose} icon={<CloseIcon />} iconColor="Base.black" />
        </Stack>

        <Stack spacing={2}>
        <Box paddingBottom={2}>
          <Typography variant="bodyMedium3">{notificationConstants.TODAY}</Typography>
          </Box>
          <Box
            sx={{
              borderRadius: '13px',
              backgroundColor: 'Base.white',
              display: 'flex',
              padding: 2,
              gap: 2,
            }}
          >
            <Stack>
              <CustomIcon
                icon={<EventIcon />}
                iconColor="Base.black"
                sx={{
                  backgroundColor: 'Neutral.10',
                  paddingX: 0.75,
                  paddingY: 0.75,
                  borderRadius: 0.75,
                  width: 'fit-content',
                }}
              />
            </Stack>

            <Stack gap={1.5}>
              <Typography variant="bodyRegular3" color="Neutral.70">
                {notificationConstants.APPOINTMENT_REQUEST}(1)
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="bodyRegular3">{NOTIFICATION_MOCK_DATA.name}</Typography>
                <Chip type={NOTIFICATION_MOCK_DATA.chip} />
              </Stack>

              <Typography variant="bodyRegular3" color="Neutral.70">
                {NOTIFICATION_MOCK_DATA.code} - {NOTIFICATION_MOCK_DATA.code_desc} –{' '}
                <Typography component="span" sx={{ color: 'Success.30' }}>
                  {notificationConstants.PAID}
                </Typography>
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="bodyRegular3">{NOTIFICATION_MOCK_DATA.date}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ({NOTIFICATION_MOCK_DATA.time})
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                  {NOTIFICATION_MOCK_DATA.daysb4} ago from{' '}
                  <Typography component="span" sx={{ color: 'Base.black' }}>
                    {NOTIFICATION_MOCK_DATA.from}
                  </Typography>
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <CustomIcon
                  icon={<VideoCam />}
                  iconColor="Primary.main"
                  sx={{
                    backgroundColor: 'Neutral.10',
                    paddingX: 0.75,
                    paddingY: 0.75,
                    borderRadius: '.75',
                    width: 'fit-content',
                  }}
                />
                <Typography variant="body2">{notificationConstants.TELEHEALTH}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} mt={1} justifyContent="space-between">
                <CustomButton variant="filled" label={notificationConstants.RESHEDULE} />
                <Box gap={2}>
                  <CustomButton variant="outlined" label={notificationConstants.DECLINE} />
                  <CustomButton variant="filled" label={notificationConstants.ACCEPT} />
                </Box>
              </Stack>
            </Stack>

            <CustomIcon icon={<KeyboardArrowRight />} iconColor="Primary.main" />
          </Box>
        </Stack>

        <Stack paddingY={2}>
        <Box paddingBottom={2}>
          <Typography variant="bodyMedium3">{notificationConstants.YESTERDAY}</Typography>
          </Box>

          {/* Lab Report */}
          <Box
            sx={{
              borderRadius: '13px',
              backgroundColor: 'Base.white',
              display: 'flex',
              padding: 2,
              gap: 2,
            }}
          >
            <Stack>
              <CustomIcon
                icon={<PersonIcon  />}
                iconColor="Base.black"
                sx={{
                  backgroundColor: 'Neutral.10',
                  paddingX: 0.75,
                  paddingY: 0.75,
                  borderRadius: 0.75,
                  width: 'fit-content',
                }}
              />
            </Stack>

            <Stack>
              <Typography variant="bodyRegular3" color="Neutral.70">
                {notificationConstants.LAB_REPORT_UPDATED}
              </Typography>
              <Typography variant="bodyRegular3" color="Base.link">
                {notificationConstants.VIEW_YOUR_LAB_REPORT_PDF_HERE}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="bodyRegular3">{NOTIFICATION_MOCK_DATA.date}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ({NOTIFICATION_MOCK_DATA.time})
                </Typography>
              </Stack>
            </Stack>

            <Box sx={{ ml: 'auto', justifyContent: 'center' }}>
              <CustomIcon icon={<KeyboardArrowRight />} iconColor="Primary.main" />
            </Box>
          </Box>

          {/* GMeet Invitation */}
          <Box
            sx={{
              borderRadius: '13px',
              backgroundColor: 'Base.white',
              display: 'flex',
              padding: 2,
              gap: 2,
            }}
          >
            <Stack>
              <CustomIcon
                icon={<Laptop />}
                iconColor="Base.black"
                sx={{
                  backgroundColor: 'Neutral.10',
                  paddingX: 0.75,
                  paddingY: 0.75,
                  borderRadius: 0.75,
                  width: 'fit-content',
                }}
              />
            </Stack>

            <Stack>
              <Typography variant="bodyRegular3" color="Neutral.70">
                {notificationConstants.NADYA_POPLOVETSC_ACCEPTED_YOUR_INVITATION}
              </Typography>
              <Typography variant="bodyRegular3" color="Base.link">
                {NOTIFICATION_MOCK_DATA.gmeet}
              </Typography>
            </Stack>

            <Box sx={{ ml: 'auto' }}>
              <CustomIcon icon={<KeyboardArrowRight />} iconColor="Primary.main" />
            </Box>
          </Box>

          {/* Payment Collection */}
          <Box
            sx={{
              borderRadius: '13px',
              backgroundColor: 'Base.white',
              display: 'flex',
              padding: 2,
              gap: 2,
            }}
          >
            <Stack>
              <CustomIcon
                icon={<Transaction />}
                iconColor="Base.black"
                sx={{
                  backgroundColor: 'Neutral.10',
                  paddingX: 0.75,
                  paddingY: 0.75,
                  borderRadius: 0.75,
                  width: 'fit-content',
                }}
              />
            </Stack>

            <Stack flex={1}>
              <Typography variant="bodyRegular3" color="Neutral.70">
                {notificationConstants.PAYMENT_COLLECTION}{' '}
                <Typography component="span" sx={{ color: 'Success.30' }}>
                  ${NOTIFICATION_MOCK_DATA.dollar} Due
                </Typography>
              </Typography>
              <Typography variant="bodyRegular3" color="Base.black">
                {notificationConstants.CLICK_HERE_TO_COMPLETE_YOUR_TRANSACTION}
              </Typography>
            </Stack>

            {/* Right aligned arrow & amount */}
            <Stack
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              sx={{ minWidth: 100 }}
            >
              <Typography sx={{ color: 'Success.30' }}>
                ${NOTIFICATION_MOCK_DATA.dollar}.00
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                <CustomIcon icon={<KeyboardArrowRight />} iconColor="Primary.main" />
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Stack paddingY={2}>
          
          <Box paddingBottom={2}>
          <Typography variant="bodyMedium3">{notificationConstants.YESTERDAY}</Typography>
          </Box>
          {/* GMeet Invitation */}
          <Box
            sx={{
              borderRadius: '13px',
              backgroundColor: 'Base.white',
              display: 'flex',
              padding: 2,
              gap: 2,
            }}
          >
            <Stack>
              <CustomIcon
                icon={<Laptop />}
                iconColor="Base.black"
                sx={{
                  backgroundColor: 'Neutral.10',
                  paddingX: 0.75,
                  paddingY: 0.75,
                  borderRadius: 0.75,
                  width: 'fit-content',
                }}
              />
            </Stack>

            <Stack>
              <Typography variant="bodyRegular3" color="Neutral.70">
                {notificationConstants.NADYA_POPLOVETSC_ACCEPTED_YOUR_INVITATION}
              </Typography>
              <Typography variant="bodyRegular3" color="Base.link">
                {NOTIFICATION_MOCK_DATA.gmeet}
              </Typography>
            </Stack>

            <Box sx={{ ml: 'auto' }}>
              <CustomIcon icon={<KeyboardArrowRight />} iconColor="Primary.main" />
            </Box>
          </Box>

          {/* Payment Collection */}
          <Box
            sx={{
              borderRadius: '13px',
              backgroundColor: 'Base.white',
              display: 'flex',
              padding: 2,
              gap: 2,
            }}
          >
            <Stack>
              <CustomIcon
                icon={<Transaction />}
                iconColor="Base.black"
                sx={{
                  backgroundColor: 'Neutral.10',
                  paddingX: 0.75,
                  paddingY: 0.75,
                  borderRadius: 0.75,
                  width: 'fit-content',
                }}
              />
            </Stack>

            <Stack flex={1}>
              <Typography variant="bodyRegular3" color="Neutral.70">
                {notificationConstants.PAYMENT_COLLECTION}{' '}
                <Typography component="span" sx={{ color: 'Success.30' }}>
                  ${NOTIFICATION_MOCK_DATA.dollar} Due
                </Typography>
              </Typography>
              <Typography variant="bodyRegular3" color="Base.black">
                {notificationConstants.CLICK_HERE_TO_COMPLETE_YOUR_TRANSACTION}
              </Typography>
            </Stack>

            {/* Right aligned arrow & amount */}
            <Stack
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              sx={{ minWidth: 100 }}
            >
              <Typography sx={{ color: 'Success.30' }}>
                ${NOTIFICATION_MOCK_DATA.dollar}.00
              </Typography>
              <Box sx={{ ml: 'auto' }}>
                <CustomIcon icon={<KeyboardArrowRight />} iconColor="Primary.main" />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
