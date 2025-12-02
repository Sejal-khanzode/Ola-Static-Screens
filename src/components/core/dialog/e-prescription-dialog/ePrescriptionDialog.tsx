import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Box,
  Divider,
  Stack,
  Avatar,
} from '@mui/material';
import { Redirect } from '../../../../assets/icons/redirectIcon';
import { Calender } from '../../../../assets/icons/calenderIcon';
import CustomButton from '../../reusable/custom-button/custom-button';
import { dialogConstant } from '../../../../constants/dashboard-constants';
import { eprescriptionDialogData } from '../../reusable/mock-data/all-mock-data';

interface ePrescriptionDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  dialogData?: any;
}

const information = [
  { label: 'Patient Name', value: '' },
  { label: 'Drug', value: '' },
  { label: 'Failure Message', value: eprescriptionDialogData.failureMessage },
  { label: 'Prescribed Drug', value: eprescriptionDialogData.prescribedDrug },
  { label: 'Date', value: eprescriptionDialogData.date },
  { label: 'From', value: eprescriptionDialogData.from },
  { label: 'To', value: eprescriptionDialogData.to },
  { label: 'Written On', value: '' },
  { label: 'Written By', value: '' },
];

const medication = [
  { label: 'Prescribed Drug', value: eprescriptionDialogData.prescribedDrug },
  { label: 'Pt. Instructions', value: eprescriptionDialogData.instructions },
  { label: 'Quantity', value: eprescriptionDialogData.quantity },
  { label: 'Dispense From', value: eprescriptionDialogData.dispenseFrom },
  { label: 'Refill', value: eprescriptionDialogData.refill },
  { label: 'Allow Substitution', value: eprescriptionDialogData.allowSubstitution },
  { label: 'Written On', value: eprescriptionDialogData.writtenOn },
  { label: 'Pharmacy Note', value: eprescriptionDialogData.pharmacyNote },
];

const EPrescriptionDialog: React.FC<ePrescriptionDialogProps> = ({
  open,
  onClose,
  title,
  // dialogData,
}) => {

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title || 'ePrescription'}</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            border: '1px solid',
            borderColor: 'Neutral.30',
            borderRadius: 1,
            p: 2,
            mb: 4,
            backgroundColor: 'Neutral.10',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 2 }}>
                  <Avatar src="https://via.placeholder.com/40" />
                </Grid>

                <Grid size={{ xs: 10 }}>
                  <Grid container justifyContent="space-between" alignItems="center" gap={1.5}>
                    {/* Name + MRN */}
                    <Grid display="flex" justifyContent="space-between" gap={15}>
                      <Typography variant="titleSemiBold3" color="Neutral.80">
                        {eprescriptionDialogData.name}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Calender fontSize="small" color="Primary.main" />
                        <Typography variant="titleSemiBold3" color="Neutral.70">
                          {eprescriptionDialogData.dob}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* DOB */}
                    <Grid display="flex" alignItems="center" gap={1}>
                      <Typography variant="titleSemiBold3" color="Neutral.80">
                        {dialogConstant.MRN} :
                      </Typography>
                      <Typography variant="titleMedium3" color="Neutral.70">
                        {eprescriptionDialogData.mrn}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="end">
              <CustomButton
                variant="outlined"
                startIcon={<Redirect />}
                label="Go to Patient Chart"
                // onClick={handleCalender}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="titleMedium3" sx={{ color: 'Primary.main' }}>
            {dialogConstant.PHARMACY_INFORMATION}
          </Typography>
          <Grid container spacing={2}>
            {information.map((info, index) =>
              info.value ? (
                <Stack key={index} direction="row" sx={{ width: '100%' }} alignItems="flex-start">
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Typography variant="titleSemiBold4" color="Neutral.80">
                      {info.label}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 9 }} color="Neutral.70">
                    <Typography variant="body2">{info.value}</Typography>
                  </Grid>
                </Stack>
              ) : null
            )}
          </Grid>
        </Stack>

        <Stack sx={{ paddingY: 4 }}>
          <Divider color="#D8D8D8" />
        </Stack>

        {/* Medication Info */}
        <Stack spacing={2}>
          <Typography variant="titleMedium3" sx={{ color: 'Primary.main' }}>
            {dialogConstant.MEDICATION_INFORMATION}
          </Typography>

          <Grid container spacing={2}>
            <Typography variant="titleMedium3" color="Neutral.80" sx={{ minWidth: '150px' }}>
              {dialogConstant.ORDERED_MEDICATION}
            </Typography>
            {medication.map((item, idx) => (
              <Grid size={{ xs: 12, sm: item.value.length > 15 ? 12 : 6 }} key={idx}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Typography variant="titleMedium4" color="Neutral.80" sx={{ minWidth: '150px' }}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="bodyRegular4"
                    color="Neutral.70"
                    sx={{ fontWeight: item.label === 'Prescribed Drug' ? 600 : 'normal' }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <CustomButton variant="filled" label="Response" />
          <CustomButton variant="filled" label="Submit" />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EPrescriptionDialog;
