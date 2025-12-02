import { Button, Grid, Typography } from '@mui/material';
import CustomDialog from '../custom-dialog/custom-dialog';
import { ViewMode } from 'src/constants/formConst';

type ConfirmationPopUpProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  button?: boolean | false;
  details?: any;
};

const ConfirmationPopUp = (props: ConfirmationPopUpProps) => {
  const { open, onClose, onConfirm, message, title, button = true, details } = props;
  return (
    <CustomDialog
      width={'400px'}
      title={title || 'Confirm'}
      buttonName={[]}
      open={open}
      onClose={() => onClose()}
    >
      <Grid container flexDirection={'column'} rowGap={2}>
        <Typography variant="titleBold4">
          {message || 'Do you really want to go ahead with this operation?'}
        </Typography>
        {button && (
          <Grid container width={'100%'} justifyContent={'flex-end'} columnGap={1}>
            <Button variant="contained" onClick={() => onConfirm()}>
              <Typography variant="titleMedium4">{ViewMode.CONFIRM}</Typography>
            </Button>
            <Button variant="outlined" onClick={() => onClose()}>
              <Typography variant="titleMedium4">{ViewMode.CANCEL}</Typography>
            </Button>
          </Grid>
        )}

        {details && (
          <Grid container justifyContent={'end'} gap={1}>
            <Typography variant="bodyMedium4" color="Neutral.60">
              {details.createdInfo}
            </Typography>
            <Typography variant="bodyMedium4" color="Neutral.60">
              {details.createdDate}
            </Typography>
            <Typography variant="bodyMedium4" color="Neutral.60">
              {details.createdTime}
            </Typography>
          </Grid>
        )}
      </Grid>
    </CustomDialog>
  );
};

export default ConfirmationPopUp;
