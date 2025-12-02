import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Backdrop, Box, Fade, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { StickyNoteControllerService, type StickyNotes } from 'src/sdk/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { setGlobalRefetchStickyNotesFunction } from './patient-profile/documents/sticky-notes';
import SaveIcon from '@mui/icons-material/Save';

interface StickyNotesProps {
  uuid: string;
  isAlertNote?: boolean;
}

const StickyNotes = ({ uuid, isAlertNote }: StickyNotesProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [opens, setOpens] = useState(false);
  const dispatch = useDispatch();

  const style = {
    position: 'absolute' as 'absolute',
    top: '35%',
    left: '85%',
    transform: 'translate(-50%, -50%)',
    width: 435,
    height: 250,
    bgcolor: isAlertNote ? '#FFF2F3' : '#FFFBF2',
    border: isAlertNote ? '1.5px solid #FFB6BC' : '1.5px solid #FFAA00',
    boxShadow: '0px 0px 8px #00000029',
    borderRadius: '5px',
    p: 1,
    Opacity: 1,
  };

  const [stickyNotes, setStickyNotes] = useState('');
  const [alertNote, setAlertNote] = useState('');

  const { data: stickyNotesData, refetch } = useQuery({
    queryKey: ['patients', uuid],
    queryFn: () =>
      StickyNoteControllerService.getApiMasterStickyNotes({
        patientClinicUuid: uuid,
      }),
    // enabled: !!uuid,
  });

  const {
    mutateAsync: createNoteAsync,
    isPending: isCreating,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate,
    data: dataCreate,
  } = useMutation({
    mutationFn: StickyNoteControllerService.postApiMasterStickyNotes,
    onSuccess: () => {
      refetch();
      setGlobalRefetchStickyNotesFunction(refetch);
    },
  });

  const getLatestNote = () => {
    if (!stickyNotesData?.data || !Array.isArray(stickyNotesData?.data?.content)) {
      return null;
    }

    const sortedNotes = [...stickyNotesData?.data?.content].sort(
      (a: StickyNotes, b: StickyNotes) =>
        new Date(b.createdDate || '').getTime() - new Date(a.createdDate || '').getTime()
    );

    return sortedNotes[0] || null;
  };

  const latestNote = getLatestNote();

  const handleOpens = () => {
    const latestNoteDescription = latestNote?.description || '';
    if (isAlertNote) {
      setAlertNote(latestNoteDescription);
    } else {
      setStickyNotes(latestNoteDescription);
    }
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const handleSaveAndClose = async () => {
    await handleSaveNote();
    setOpens(false);
  };

  const handleSaveNote = async () => {
    const noteText = isAlertNote ? alertNote : stickyNotes;

    if (noteText.trim()) {
      try {
        await createNoteAsync({
          requestBody: {
            description: noteText,
            patientClinic: {
              [uuid]: '',
            },
          },
        });
      } catch (error) {
        console.error('Failed to save note:', error);
      }
    }
  };

  useApiFeedback(
    isErrorCreate,
    errorCreate,
    isSuccessCreate,
    (dataCreate?.message || 'Added Successfully') as string
  );

  useEffect(() => {
    if (isCreating) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isCreating, dispatch]);

  return (
    <Grid display={'flex'} justifyContent={'flex-end'} gap={2} height={'8vh'} width={'100%'}>
      <Grid
        p={0.5}
        sx={{
          border: '1px solid #1B598426',
          borderRadius: '5px',
          background: isAlertNote ? '#FFF2F3' : '#FFFBF2',
          display: 'flex',
          flexDirection: 'column',
          opacity: 1,
        }}
        width={'100%'}
      >
        <Grid>
          <Grid>
            <Grid display={'flex'} justifyContent={'space-between'}>
              <Grid>
                <Typography variant="bodyMedium4">{'Note'}</Typography>
              </Grid>
              <Grid>
                <Typography>
                  <IconButton onClick={handleOpens}>
                    <EditIcon
                      fontSize="small"
                      sx={{ marginTop: '-6.5px', color: 'black' }}
                    ></EditIcon>
                  </IconButton>
                </Typography>
              </Grid>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={opens}
                onClose={reason => {
                  if (reason !== 'backdropClick') {
                    handleCloses();
                  }
                }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={opens}>
                  <Box sx={style}>
                    <Grid
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography id="transition-modal-title" variant="bodyMedium4">
                        {'NOTE'}
                      </Typography>
                      <Typography>
                        <IconButton onClick={handleSaveAndClose}>
                          <SaveIcon />
                        </IconButton>
                      </Typography>
                    </Grid>
                    <TextField
                      id="note-textarea"
                      // label="Add your note"
                      multiline
                      rows={6}
                      variant="outlined"
                      fullWidth
                      placeholder="Add your note here..."
                      sx={{
                        mt: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            border: 'none',
                          },
                          '&:hover fieldset': {
                            border: 'none',
                          },
                          '&.Mui-focused fieldset': {
                            border: 'none',
                          },
                        },
                      }}
                      value={isAlertNote ? alertNote : stickyNotes}
                      onChange={e =>
                        isAlertNote ? setAlertNote(e.target.value) : setStickyNotes(e.target.value)
                      }
                    />
                  </Box>
                </Fade>
              </Modal>
            </Grid>
          </Grid>
        </Grid>
        <Grid width={'10vw'} height={'6vh'} container>
          <Typography variant="bodyRegular5" color={'black'}>
            {latestNote?.description &&
              (() => {
                const originalText = latestNote.description;
                const alphabetOnly = originalText.replace(/[^A-Za-z]/g, '');

                if (alphabetOnly.length > 20) {
                  let count = 0;
                  let truncatedText = '';

                  for (let char of originalText) {
                    if (/[A-Za-z]/.test(char)) count++;
                    truncatedText += char;
                    if (count === 20) break;
                  }

                  return (
                    <>
                      {truncatedText}...
                      <span
                        style={{
                          color: '#1B5984',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginLeft: 4,
                        }}
                        onClick={handleOpen}
                      >
                        More
                      </span>
                    </>
                  );
                } else {
                  return <>{originalText}</>;
                }
              })()}
          </Typography>
        </Grid>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={reason => {
            if (reason !== 'backdropClick') {
              handleClose();
            }
          }}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography id="transition-modal-title" variant="bodyMedium3">
                  {'NOTE'}
                </Typography>
                <Typography>
                  <IconButton onClick={handleClose}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </Typography>
              </Grid>

              <Box
                sx={{
                  mt: 2,
                  maxHeight: '150px',
                  overflowY: 'auto',
                }}
              >
                <Typography
                  id="modal-modal-description"
                  variant="bodyMedium3"
                  sx={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {latestNote?.description}
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default StickyNotes;
