
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';
import { newAppointment } from '../../../../constants/scheduling-constants';
import CustomLabel from '../../reusable/custom-label/custom-label';
import CustomInput from '../../reusable/custom-input/custom-input';
import CustomSelect from '../../reusable/custom-select/custom-select';
import CustomButton from '../../reusable/custom-button/custom-button';
import { AddIcon } from '../../../../assets/icons/addIcon';
import { SearchIcon } from '../../../../assets/icons/searchIcon';
import CustomDatePicker from '../../reusable/custom-date-picker/custom-date-picker';
import { labRequestConstants } from '../../../../constants/dashboard-constants';


const DUMMY_PATIENTS = [
  {
    value: 'patient1',
    label: 'Henna West (14 July 1965, 73 yrs, F)',
    profileIcon: 'https://i.pravatar.cc/150?img=1',
    patientId: '8746',
    phone: '(480)-555-0103',
    email: 'hennawest@gmail.com',
  },
  {
    value: 'patient2',
    label: 'Cody Fisher (14 July 1965, 73 yrs, F)',
    profileIcon: 'https://i.pravatar.cc/150?img=2',
    patientId: '8746',
    phone: '(907)-555-0101',
    email: 'codeyfisher@gmail.com',
  },
  {
    value: 'patient3',
    label: 'Ralph Edwards (14 July 1965, 73 yrs, F)',
    profileIcon: 'https://i.pravatar.cc/150?img=3',
    patientId: '8746',
    phone: '(208)-555-0112',
    email: 'ralphaedwards@gmail.com',
  },
  {
    value: 'patient4',
    label: 'Courtney Henry (14 July 1965, 73 yrs, F)',
    profileIcon: 'https://i.pravatar.cc/150?img=4',
    patientId: '8746',
    phone: '(406)-555-0120',
    email: 'courtneyhenry@gmail.com',
  },
];

const DUMMY_LOCATION = [
  { value: 'patent1', label: 'Location 1' },
  {
    value: 'patient2',
    label: 'Location 2',
  },
];

const timeFilters = ['12h', '24h', '3d', '7d', '2w'];

interface newAppointmentProps {
  open: boolean;
  onClose: () => void;
}

const CreateOrder = ({ open, onClose }: newAppointmentProps) => {

  const handleSaveAsOrderSet = () => {
    console.log('Save as order set');
  };

  const handleAddIcon = () => {
    console.log('Add icon');
  };

  const handleSave = () => {
    console.log('Handle save as order set');
  };
  const handlePrint = () => {
    console.log('Handle Print and close');
  };
  const handleOrder = () => {
    console.log('handle order');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{labRequestConstants.LAB_REQUISTION_FORM}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1, flexDirection: 'row' }}>
          <Grid size={{ xs: 6 }}>
            <CustomLabel label={labRequestConstants.LOCATION} />
            <CustomSelect
              placeholder={labRequestConstants.SEARCH_AND_SELECT_LOCATION}
              value=""
              items={DUMMY_LOCATION}
            />
          </Grid>

          <Grid size={{ xs: 12 }} display="flex">
            <Grid size={{ xs: 6 }}>
              <CustomLabel label={labRequestConstants.LAB} />

              <CustomSelect
                placeholder={labRequestConstants.SEARCH_AND_SELECT}
                value=""
                items={DUMMY_PATIENTS}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <CustomLabel label={labRequestConstants.BILL_TYPE} />

              <CustomSelect
                placeholder={newAppointment.SEARCH_PATIENT}
                value=""
                items={DUMMY_PATIENTS}
              />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomLabel label={labRequestConstants.TEST} />
            <CustomInput
              showIcon={<SearchIcon />}
              bgWhite
              placeholder={labRequestConstants.SEARCH_AND_SELECT_TEST}
            />
            <CustomButton
              variant="whiteOutline"
              label={labRequestConstants.SAVE_AS_ORDER_SET}
              onClick={handleSaveAsOrderSet}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={labRequestConstants.ICD_CODE} />
            <CustomInput
              showIcon={<SearchIcon />}
              bgWhite
              placeholder={labRequestConstants.SEARCH_AND_SELECT_TEST}
            />
            <CustomButton
              variant="whiteOutline"
              label={labRequestConstants.SAVE_AS_ORDER_SET}
              onClick={handleSaveAsOrderSet}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomLabel label={labRequestConstants.PATIENT_INSTRUCTIONS} />
            <CustomSelect placeholder="" value="" items={DUMMY_LOCATION} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={labRequestConstants.LAB_INSTRUCTIONS_TO_TEST_CENTER} />
            <CustomInput
              placeholder={labRequestConstants.LAB_INSTRUCTIONS_TO_TEST_CENTER}
              value=""
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomLabel label={labRequestConstants.COLLECTION_DATE_AND_TIME} />
            <Stack display="flex" flexDirection="row" gap={1.5}>
              <Grid size={{ xs: 4 }}>
                <CustomDatePicker placeholder={labRequestConstants.DATE} value="" />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <CustomDatePicker placeholder={labRequestConstants.TIME} value="" />
              </Grid>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomLabel label={labRequestConstants.NOTE} />
            <Stack direction="row" spacing={2.5}>
              {timeFilters.map((label, index) => (
                <IconButton
                  key={index}
                  sx={{
                    width: 48,
                    height: 48,
                    border: '1px solid',
                    borderRadius: '50%',
                  }}
                >
                  <Typography variant="titleMedium5" color="Neutral.70">
                    {label}
                  </Typography>
                </IconButton>
              ))}

              <IconButton
                size="small"
                onClick={handleAddIcon}
                sx={{
                  width: 48,
                  height: 48,
                  border: '1px solid',
                  borderRadius: '50%',
                }}
              >
                <AddIcon color="Neutral.80" />
              </IconButton>
            </Stack>
            <Typography variant="bodyRegular5">{labRequestConstants.NOTE_DESC}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomLabel label={labRequestConstants.CHART_NOTE} />
            <CustomSelect
              placeholder={labRequestConstants.SELECT_A_CHART_NOTE}
              value=""
              items={DUMMY_PATIENTS}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <CustomButton
          variant="whiteOutline"
          label={labRequestConstants.SAVE_AS_ORDER_SET}
          onClick={handleSave}
        />
        <CustomButton
          variant="outlined"
          label={labRequestConstants.PRINT_AND_CLOSE}
          onClick={handlePrint}
        />
        <CustomButton variant="filled" label={labRequestConstants.ORDER} onClick={handleOrder} />
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrder;
