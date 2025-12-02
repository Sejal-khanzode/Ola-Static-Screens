import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Grid, IconButton, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../../../../assets/images/file_upload.svg';
import { errorStyle } from '../custom-time-picker/style';

export type FilesMetaData = {
  name: string;
  type: string;
  preview: string;
  file: File;
};

type MultipleFilesUploadProps = {
  onUpload: (filesMetaData: FilesMetaData[]) => void;
  hasError?: boolean;
  errorMessage?: string;
  supportMsg?: boolean;
  fileType?: string;
  csvFile?: boolean;
  text?: string;
  height?: string;
  placeholder?: string;
};

const MultipleFilesUpload = (props: MultipleFilesUploadProps) => {
  const { onUpload, hasError, supportMsg, fileType, csvFile, text, height, placeholder } = props;
  const [uploadedFiles, setUploadedFiles] = useState<FilesMetaData[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (fileType === 'csv') {
        if (file.type.includes('text/csv')) {
          setUploadedFiles(prev => [
            ...prev,
            {
              name: file.name,
              type: file.type,
              preview: `data:${file.type}`,
              file,
            },
          ]);
        }
      } else if (supportMsg) {
        if (
          file.type.includes('application/pdf') ||
          file.type.includes('image/png') ||
          file.type.includes('image/jpeg') ||
          file.type.includes('text/csv')
        ) {
          setUploadedFiles(prev => [
            ...prev,
            {
              name: file.name,
              type: file.type,
              preview: `data:${file.type}`,
              file,
            },
          ]);
        }
      } else {
        if (file.type.includes('text/edi') || file.name.endsWith('.edi')) {
          setUploadedFiles(prev => [
            ...prev,
            {
              name: file.name,
              type: file.type || 'application/edi',
              preview: `data:${file.type}`,
              file,
            },
          ]);
        }
      }
    },
    [supportMsg]
  );

  useEffect(() => {
    onUpload(uploadedFiles);
  }, [uploadedFiles, onUpload]);

  const handleDelete = (index: number) => {
    setUploadedFiles(prev => {
      const arr = structuredClone(prev);
      arr.splice(index, 1);
      return arr;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: fileType
      ? {
          'text/csv': ['.csv'],
        }
      : supportMsg && !csvFile
        ? {
            'application/pdf': ['.pdf'],
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
          }
        : supportMsg
          ? {
              'application/pdf': ['.pdf'],
              'image/png': ['.png'],
              'image/jpeg': ['.jpg', '.jpeg'],
              'text/csv': ['.csv'],
            }
          : { 'application/octet-stream': ['.edi'] },
  });

  return (
    <Grid container flexDirection={'column'} gap={2}>
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${hasError ? '#d32f2f' : '#C9CBCC'}`,
          width: '100%',
          height: height || '100%',
          padding: '3rem',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: '10px',
          cursor: 'pointer',
          flexDirection: 'column',
        }}
      >
        <Grid container justifyContent={'center'} rowGap={2}>
          <input {...getInputProps()} />
          <Grid width={'100%'} container justifyContent={'center'}>
            <img
              src={uploadIcon}
              style={{
                width: '100px',
                height: '50px',
                color: '#C9CBCC',
              }}
            />
          </Grid>

          {text ? (
            <Typography variant="body1" textAlign={'center'} fontWeight={550} color={'#000'}>
              {placeholder || text}
            </Typography>
          ) : (
            <>
              {isDragActive ? (
                <Typography variant="body1">
                  Drop the files here ...Only pdf, png, jpeg, csv, or edi.
                </Typography>
              ) : (
                <Grid>
                  <Typography
                    variant="titleMedium4"
                    textAlign={'center'}
                    fontWeight={550}
                    color={'#000'}
                  >
                    Drag & drop files
                  </Typography>

                  <Typography variant="body1" textAlign={'center'} fontWeight={550} color={'#000'}>
                    Or
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={550}
                    color={'#233853'}
                    textAlign={'center'}
                  >
                    Browse Files
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </div>
      <Grid>
        <Typography variant="titleMedium4" color={'#C9CBCC'}>
          {fileType
            ? 'Supported formats: csv'
            : !csvFile && supportMsg
              ? 'Supported formats: pdf, png, jpeg'
              : supportMsg
                ? 'Supported formats: pdf, png, jpeg, csv'
                : 'Supported formats: edi'}
        </Typography>
      </Grid>
      {props.hasError && (
        <Typography variant="caption" sx={errorStyle}>
          {props.hasError ? props.errorMessage : ''}
        </Typography>
      )}
      {uploadedFiles?.map((item, index) => (
        <Grid
          container
          key={index}
          sx={{ background: '#C9CBCC', padding: 1 }}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Grid container alignItems={'center'} width={'fit-content'} gap={5}>
            <Grid
              container
              justifyContent={'center'}
              alignItems={'center'}
              width={'80px'}
              height={'80px'}
            >
              <InsertDriveFileIcon fontSize="large" />
            </Grid>
            <Typography variant="body1">{item.name}</Typography>
          </Grid>
          <Grid>
            <IconButton onClick={() => handleDelete(index)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default MultipleFilesUpload;
