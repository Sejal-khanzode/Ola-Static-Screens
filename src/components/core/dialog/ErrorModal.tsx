/* 
Example of error modal
Need to modfy as per the design
*/

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string | Error;
  retryAction?: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onClose,
  title = 'Error',
  message,
  retryAction,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">
        <Box display="flex" alignItems="center" gap={1}>
          <ErrorOutlineIcon color="error" />
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          {typeof message === 'string' ? message : message.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {retryAction && (
          <Button onClick={retryAction} color="primary" variant="contained">
            Retry
          </Button>
        )}
        <Button onClick={onClose} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal; 