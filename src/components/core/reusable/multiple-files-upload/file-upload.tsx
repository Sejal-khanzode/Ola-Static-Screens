import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Grid, IconButton, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../../../../assets/images/file_upload.svg';
import { errorStyle } from '../custom-time-picker/style';
import ImageIcon from '@mui/icons-material/Image';
import { useAppDispatch } from 'src/redux/hooks';
import { setSnackbarOn } from 'src/redux/actions/snackbar-actions';
import { AlertSeverity } from '../snackbar-alert/snackbar-alert';
import { APIFeedbackMessages } from 'src/constants/formConst';

export type FileMetaData = {
  name: string;
  type: string;
  preview: string;
  file: File;
  id?: string;
  url?: string;
};

type SingleFileUploadProps = {
  name: string;
  onUpload: (fileMetaData: FileMetaData | null) => void;
  onDelete: () => void; 
  hasError?: boolean;
  errorMessage?: string;
  fileType?: string;
  text?: string;
  height?: string;
  placeholder?: string;
  existingFile?: FileMetaData | null;
  maxSize?: number;
  minSize?: number;
};

const FileUpload = (props: SingleFileUploadProps) => {
  const {
    name,
    onUpload,
    onDelete,
    hasError,
    errorMessage,
    text,
    height,
    placeholder,
    existingFile,
    maxSize,
  } = props;
  const [uploadedFile, setUploadedFile] = useState<FileMetaData | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (existingFile) {
      setUploadedFile(existingFile);
    }
  }, [existingFile]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFileError('');

      if (!file) return;

      const isImage = file.type.startsWith('image/');
      const isPDF = file.type === 'application/pdf';

      if (!isImage && !isPDF) {
        dispatch(
          setSnackbarOn({
            severity: AlertSeverity.ERROR,
            message: APIFeedbackMessages.UNSUPPORTED_FORMAT,
          })
        );
        return;
      }

      if (maxSize && file.size > maxSize) {
        dispatch(
          setSnackbarOn({
            severity: AlertSeverity.ERROR,
            message: APIFeedbackMessages.IMAGE_SIZE_ERROR,
          })
        );
        return;
      }

      let preview = '';
      if (isImage) {
        preview = URL.createObjectURL(file);
      } else {
        preview = `data:${file.type}`;
      }

      const fileMetaData: FileMetaData = {
        name: file.name,
        type: file.type,
        preview,
        file,
      };

      setUploadedFile(fileMetaData);
    },
    [props.maxSize]
  );

  useEffect(() => {
    onUpload(uploadedFile);
  }, [uploadedFile, onUpload]);

const handleDelete = useCallback(() => {
  if (uploadedFile) {
    if (uploadedFile.preview && uploadedFile.type?.startsWith('image/')) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
  }

  setUploadedFile(null);
  setFileError('');
  onDelete?.();
}, [uploadedFile, onDelete]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
      'application/pdf': ['.pdf'],
    },
    disabled: !!uploadedFile,
    minSize: 0,
  });

  const shouldShowError = (hasError || fileError) && !uploadedFile;

  return (
    <Grid container flexDirection={'column'} gap={1}>
      <Grid
        {...getRootProps()}
        sx={{
          border: `2px dashed ${shouldShowError ? '#d32f2f' : '#C9CBCC'}`,
          width: '100%',
          height: height || '200px',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          cursor: uploadedFile ? 'not-allowed' : 'pointer',
          flexDirection: 'column',
          opacity: uploadedFile ? 0.6 : 1,
          background: isDragActive ? '#f0f0f0' : 'transparent',
        }}
      >
        <Grid container justifyContent={'center'} rowGap={2}>
          <input {...getInputProps()} disabled={!!uploadedFile} />
          <Grid width={'100%'} container justifyContent={'center'}>
            <img
              src={uploadIcon}
              style={{
                width: '60px',
                height: '60px',
                color: '#C9CBCC',
              }}
              alt="Upload file"
            />
          </Grid>

          {text ? (
            <Typography variant="body1" textAlign={'center'} fontWeight={550} color={'#000'}>
              {placeholder || text}
            </Typography>
          ) : (
            <>
              {isDragActive ? (
                <Typography variant="body1" textAlign={'center'}>
                  Drop the file here...
                </Typography>
              ) : (
                <Grid>
                  <Typography variant="bodyBold3" textAlign={'center'} color="Primary.main">
                    {name}
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Grid>

      <Grid display={'flex'} flexDirection={'column'}>
        <Typography variant="titleMedium4" color={'#C9CBCC'}>
          Supported formats: JPG, PNG, PDF
        </Typography>
        <Typography variant="caption" color={'#C9CBCC'}></Typography>
        {shouldShowError && (
          <Typography variant="caption" sx={errorStyle}>
            {fileError || errorMessage}
          </Typography>
        )}
      </Grid>

      {uploadedFile && (
        <Grid
          container
          sx={{
            background: '#f5f5f5',
            padding: 2,
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Grid container alignItems={'center'} width={'fit-content'} gap={3}>
            {uploadedFile.type.startsWith('image/') ? (
              <ImageIcon
                sx={{
                  fontSize: '40px',
                  color: 'Primary.main',
                }}
              />
            ) : (
              <InsertDriveFileIcon
                sx={{
                  fontSize: '40px',
                  color: 'Primary.main',
                }}
              />
            )}
            <Grid>
              <Typography variant="body1" fontWeight={500}>
                {uploadedFile.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {uploadedFile.type}
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <IconButton onClick={handleDelete} color="error">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default FileUpload;
