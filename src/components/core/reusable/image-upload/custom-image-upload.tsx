import { Box, Typography, IconButton, Grid } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { errorStyle } from '../custom-input/widgets/customInputStyles';
import CloseIcon from '@mui/icons-material/Close';
import uploadIcon from '../../../../assets/images/file_upload.svg';
import { setSnackbarOn } from 'src/redux/actions/snackbar-actions';
import { useAppDispatch } from 'src/redux/hooks';
import { AlertSeverity } from '../snackbar-alert/snackbar-alert';
import { APIFeedbackMessages } from 'src/constants/formConst';

interface UploadFileProps {
  text?: string;
  customStyle: React.CSSProperties;
  imageUrl?: string | null;
  handleSetImage?: (image: string | ArrayBuffer | null) => void;
  onRemoveImage?: () => void;
}

const MAX_IMAGE_FILE_SIZE = 1 * 1024 * 1024;

const CustomImageUpload = (props: UploadFileProps) => {
  const { imageUrl, customStyle, text, handleSetImage } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (imageUrl) {
      setFileBase64(imageUrl);
    }
  }, [imageUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (
        !(
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png' ||
          file.type === 'image/heic'
        )
      ) {
        setFileBase64(null);
        dispatch(
          setSnackbarOn({
            severity: AlertSeverity.ERROR,
            message: APIFeedbackMessages.UNSUPPORTED_FORMAT,
          })
        );
        return;
      }

      if (file.size > MAX_IMAGE_FILE_SIZE) {
        setFileBase64(null);
        dispatch(
          setSnackbarOn({
            severity: AlertSeverity.ERROR,
            message: APIFeedbackMessages.IMAGE_SIZE_ERROR,
          })
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFileBase64(base64String);
        setErrorMessage('');
        handleSetImage && handleSetImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFileBase64(null);
    handleSetImage && handleSetImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          border: '2px dashed',
          borderColor: 'Neutral.40',
          borderRadius: 1,
          backgroundColor: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#f5f5f5' },
          position: 'relative',
          width: customStyle?.width || '250px',
          height: customStyle?.height || '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {fileBase64 ? (
          <>
            <img
              src={fileBase64}
              alt="Uploaded"
              style={{
                width: '90%',
                height: '90%',
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />

            <IconButton
              onClick={e => {
                e.stopPropagation();
                removeFile();
              }}
              size="small"
              sx={{
                color: '#ff1744',
                position: 'absolute',
                top: '5px',
                right: '5px',
                backgroundColor: 'Base.white',
                '&:hover': { backgroundColor: '#f5f5f5' },
                zIndex: 1,
                padding: 0.5,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <>
            <img src={uploadIcon} alt="Upload" style={{ width: 32, height: 32 }} />

            {text ? (
              <Grid container justifyContent={'center'} alignItems={'center'} mt={2}>
                <Typography 
                variant="bodyMedium4" 
                textAlign={'center'} 
                color={'Primary.main'}
                >
                  {text}
                </Typography>
              </Grid>
            ) : (
              <></>
            )}
          </>
        )}

        <input
          style={{ display: 'none' }}
          type="file"
          id="file-input"
          className="file-input"
          onChange={handleFileChange}
          ref={fileInputRef}
          accept="image/*"
        />

        {errorMessage && (
          <Typography sx={errorStyle} variant="caption">
            {errorMessage}
          </Typography>
        )}
      </Box>

      <Grid>
        <Typography variant="titleMedium4" color={'Neutral.50'} pt={2}>
          Supported formats: png, jpeg, jpg
        </Typography>
      </Grid>
    </>
  );
};

export default CustomImageUpload;
