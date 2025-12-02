import { Grid, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { SettingsFormConstants } from 'src/constants/formConst';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { PrintConfigurationControllerService } from 'src/sdk/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import useApiFeedback from 'src/hooks/useApiFeedback';

const PrintConfig = () => {
  const [headerContent, setHeaderContent] = useState('');
  const [footerContent, setFooterContent] = useState('');
  const [clinicId, setClinicId] = useState(
    getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || ''
  );
  const dispatch = useDispatch<AppDispatch>();

  const { data: printConfigurationData } = useQuery({
    queryKey: ['printConfigurationData', clinicId],
    enabled: !!clinicId,
    queryFn: () => {
      return PrintConfigurationControllerService.getApiMasterPrintConfigurationClinicByClinicUuid({
        clinicUuid: (clinicId as string) || '',
      });
    },
  });

  const {
    mutateAsync: addAsync,
    isSuccess: isSuccessadd,
    isError: isErroradd,
    data: addData,
    error: addError,
    isPending: addPending,
  } = useMutation({
    mutationFn: PrintConfigurationControllerService.postApiMasterPrintConfiguration,
  });

  const {
    mutateAsync: updateAsync,
    isSuccess: isSuccessupdate,
    isError: isErrorupdate,
    data: updateData,
    error: updateError,
    isPending: updatePending,
  } = useMutation({
    mutationFn: PrintConfigurationControllerService.putApiMasterPrintConfiguration,
  });

  const handleSave = async () => {
    try {
      if (printConfigurationData?.data) {
        const existingData = printConfigurationData.data as any;
        updateAsync({
          requestBody: {
            uuid: existingData.uuid as string,
            header: headerContent,
            footer: footerContent,
            clinicUuid: clinicId,
            clinicName: existingData.clinicName as string,
          },
        });
      } else {
        addAsync({
          requestBody: {
            header: headerContent,
            footer: footerContent,
            clinicUuid: clinicId,
          },
        });
      }
    } catch (error) {
      console.error('Error saving print configuration:', error);
    }
  };

  useEffect(() => {
    if (printConfigurationData?.data) {
      const data = printConfigurationData?.data as any;
      setHeaderContent(data.header || '');
      setFooterContent(data.footer || '');
    } else {
      // Clear content when data is null or undefined
      setHeaderContent('');
      setFooterContent('');
    }
  }, [printConfigurationData]);

  useEffect(() => {
    const handleClinicChange = () => {
      // Get the latest clinicId from localStorage
      const latestClinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

      if (latestClinicId) {
        // Update the clinicId state which will trigger the query to refetch
        setClinicId(latestClinicId);
      }
    };

    window.addEventListener('clinicChanged', handleClinicChange);
    return () => {
      window.removeEventListener('clinicChanged', handleClinicChange);
    };
  }, []);

  useEffect(() => {
    if (updatePending || addPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [updatePending, addPending]);

  // Quill editor modules configuration
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'align',
    'blockquote',
    'code-block',
    'link',
    'image',
  ];

  useApiFeedback(
    isErroradd,
    addError,
    isSuccessadd,
    (addData?.message || 'Print configuration Added Successfully') as string
  );

  useApiFeedback(
    isErrorupdate,
    updateError,
    isSuccessupdate,
    (updateData?.message || 'Print configuration Updated Successfully') as string
  );

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', height: '80vh', p: 2, overflowY: 'scroll' }}>
      {clinicId === '' ? (
        <Grid display={'flex'} justifyContent={'center'}>
          <Typography variant="titleMedium3">No Configurations Associated</Typography>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid size={{ xs: 12 }}>
            <CustomLabel label="Header" />

            <Box
              sx={{
                border: '1px solid #E0E0E0',
                borderRadius: 1,
                '& .ql-editor': {
                  fontFamily: 'sans-serif',
                },
              }}
            >
              <ReactQuill
                theme="snow"
                value={headerContent}
                onChange={setHeaderContent}
                modules={modules}
                formats={formats}
                style={{
                  backgroundColor: '#FFFFFF',
                }}
              />
            </Box>
          </Grid>

          {/* Footer Section */}
          <Grid size={{ xs: 12 }}>
            <CustomLabel label="Footer" />

            <Box
              sx={{
                border: '1px solid #E0E0E0',
                borderRadius: 1,
                '& .ql-editor': {
                  fontFamily: 'sans-serif',
                },
              }}
            >
              <ReactQuill
                theme="snow"
                value={footerContent}
                onChange={setFooterContent}
                modules={modules}
                formats={formats}
                style={{
                  backgroundColor: '#FFFFFF',
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }} display={'flex'} justifyContent={'end'}>
            <CustomButton
              variant="filled"
              label={printConfigurationData?.data ? SettingsFormConstants.SAVE : 'Update'}
              onClick={handleSave}
              type="button"
              changePadding={false}
              isSubmitButton
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default PrintConfig;
