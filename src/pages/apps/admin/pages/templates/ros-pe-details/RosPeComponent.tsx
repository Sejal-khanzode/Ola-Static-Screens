import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { useMutation } from '@tanstack/react-query';
import { ClinicalTemplateService } from 'src/sdk/requests';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { templateConstants } from 'src/constants/setting-constants';
import Details from './Details';
import { AlertSeverity } from 'src/components/core/reusable/snackbar-alert/snackbar-alert';
import { setSnackbarOn } from 'src/redux/actions/snackbar-actions';
import { useDispatch } from 'react-redux';

export interface ROSItem {
  name: string;
  value: string;
}

const ROSComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [rosItems, setRosItems] = useState<ROSItem[]>([]);
  const [rosName, setRosName] = useState<string>('');
  const [rosNameError, setRosNameError] = useState<string>('');

  const isEdit = location?.state?.isEdit;
  const isPE = location.state?.type === 'pe';
  const componentType = isPE ? 'PE' : 'ROS';
  const componentTypeFull = isPE ? 'Physical Exam' : 'Review of System';

  const availableCategories = isPE
    ? [
        'General Appearance',
        'Vital Signs',
        'HEENT',
        'Cardiovascular',
        'Respiratory',
        'Gastrointestinal',
        'Genitourinary',
        'Musculoskeletal',
        'Neurological',
        'Skin',
        'Lymphatic',
        'Psychiatric',
      ]
    : [
        'Diet',
        'Exercise',
        'Eyes',
        'HENT',
        'Resp',
        'CVS',
        'Breast',
        'GI',
        'GU',
        'Gyne',
        'MSS',
        'NS',
        'Skin',
        'Hemo',
        'Endoc',
        'Psych',
      ];

  const {
    mutateAsync: createROSAsync,
    isPending: isCreatingROS,
    isSuccess: isSuccessCreateROS,
    isError: isErrorCreateROS,
    error: errorCreateROS,
    data: dataCreateROS,
  } = useMutation({
    mutationFn: ClinicalTemplateService.postApiMasterClinicalTemplate,
  });

  const {
    mutateAsync: putApiMasterClinicalTemplate,
    isPending: isUpdatingROS,
    isSuccess: isSuccessUpdateROS,
    isError: isErrorUpdateROS,
    error: errorUpdateROS,
    data: dataUpdateROS,
  } = useMutation({
    mutationFn: ClinicalTemplateService.putApiMasterClinicalTemplate,
  });

  useApiFeedback(
    isErrorCreateROS,
    errorCreateROS,
    isSuccessCreateROS,
    (dataCreateROS?.message || templateConstants.ROS_created_successfully) as string
  );

  useApiFeedback(
    isErrorUpdateROS,
    errorUpdateROS,
    isSuccessUpdateROS,
    (dataUpdateROS?.message || templateConstants.ROS_updated_successfully) as string
  );

  useEffect(() => {
    if (isSuccessCreateROS || isSuccessUpdateROS) {
      navigate(`/admin/templates/${isPE ? 'physical-exam' : 'ros'}`);
    }
  }, [isSuccessCreateROS, isSuccessUpdateROS, navigate, isPE]);

  useEffect(() => {
    if (isEdit && location?.state?.rosData) {
      const rosData = location.state.rosData;

      if (rosData.title) {
        setRosName(rosData.title);
      }

      if (rosData.questionsAnswers && typeof rosData.questionsAnswers === 'object') {
        const mappedItems: ROSItem[] = [];

        Object.entries(rosData.questionsAnswers).forEach(([category, data]: [string, any]) => {
          if (data && typeof data === 'object') {
            mappedItems.push({
              name: category,
              value: data.answer || '',
            });
          }
        });

        setRosItems(mappedItems);
      }
    }
  }, [isEdit, location?.state?.rosData]);

  const handleDragStart = (e: React.DragEvent, category: string) => {
    e.dataTransfer.setData('text/plain', category);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const category = e.dataTransfer.getData('text/plain');

    if (!rosItems.find(item => item.name === category)) {
      const newItem: ROSItem = {
        name: category,
        value: ``,
      };
      setRosItems([...rosItems, newItem]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCategoryClick = (category: string) => {
    if (!rosItems.find(item => item.name === category)) {
      const newItem: ROSItem = {
        name: category,
        value: '',
      };
      setRosItems([...rosItems, newItem]);
    }
  };

  const handleSave = async () => {
    setRosNameError('');

    if (!rosName || rosName.trim() === '') {
      setRosNameError(`${componentType} Name is required`);
      return;
    }

    if (rosItems?.length === 0) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR, 
          message: `Please add at least one ${componentType} category`,
        })
      );
      return;
    }

    // Convert rosItems to questionsAnswers format
    const questionsAnswers: { [key: string]: { [key: string]: unknown } } = {};
    rosItems?.forEach(item => {
      questionsAnswers[item.name] = {
        question: item.name,
        answer: item.value || '',
      };
    });

    const payload = {
      title: rosName.trim(),
      questionsAnswers,
      active: true,
      archive: false,
    };

    try {
      if (isEdit && !isPE) {
        // Update ROS
        await putApiMasterClinicalTemplate({
          requestBody: {
            ...payload,
            uuid: location?.state?.uuid,
            templateType: 'ROS',
          },
        });
      } else if (!isEdit && !isPE) {
        // Create ROS
        await createROSAsync({
          requestBody: { ...payload, templateType: 'ROS' },
        });
      } else {
        if (isEdit) {
          //update PE
          await putApiMasterClinicalTemplate({
            requestBody: {
              ...payload,
              uuid: location?.state?.uuid,
              templateType: 'PE',
            },
          });
        } else {
          // Create PE
          await createROSAsync({
            requestBody: { ...payload, templateType: 'PE' },
          });
        }
      }
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} ${componentType}:`, error);
    }
  };

  return (
    <Box sx={{ pl: 1, pr: 1, backgroundColor: '#F5F5F5', minHeight: '100vh', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <BackArrowIcon
          color="Primary.main"
          onClick={() => navigate(`/admin/templates/${isPE ? 'physical-exam' : 'ros'}`)}
          style={{ cursor: 'pointer' }}
        />
        <Typography variant="bodyRegular3">
          {isEdit ? 'Edit' : 'Create'} {componentTypeFull} ({componentType})
        </Typography>
      </Box>

      <Grid container spacing={1}>
        <Grid size={{ xs: 3 }}>
          <CustomLabel label={`${componentType} Name`} isRequired />
          <CustomInput
            placeholder={`Enter ${componentType} Name`}
            value={rosName}
            onChange={e => {
              setRosName(e.target.value);
              if (rosNameError) {
                setRosNameError('');
              }
            }}
            bgWhite
            hasError={!!rosNameError}
            errorMessage={rosNameError}
          />

          <Paper
            sx={{
              mt: 2,
              p: 2,
              // backgroundColor: '#FFF3E0',
              height: '71vh',
            }}
          >
            <Box display={'flex'} flexDirection={'column'} sx={{ mb: 1 }}>
              <Typography variant="bodyRegular4">{templateConstants.QUESTIONS_BY_EHR}</Typography>
              <Typography variant="bodyRegular4" sx={{ color: '#666' }}>
                {templateConstants.CLICK_OR_DRAG_DROP_INTO_FORM_ON_RIGHT}
              </Typography>
            </Box>
            <List sx={{ height: 'calc(70vh - 100px)', overflowY: 'auto', pt: 0, pb: 0 }}>
              {availableCategories?.map(category => (
                <ListItem
                  key={category}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#F4F4F4' },
                    borderBottom: '1px solid #d6d6d6',

                    '& .MuiTypography-root': {
                      fontSize: '14px',
                      fontFamily: 'Roboto',
                    },
                  }}
                  onClick={() => handleCategoryClick(category)}
                  draggable
                  onDragStart={e => handleDragStart(e, category)}
                >
                  <DragIndicator sx={{ mr: 1, fontSize: '18px', color: '#666' }} />
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 9 }} display={'flex'} flexDirection={'column'} justifyContent={'end'}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: 'Base.white',
              height: '80vh',
              overflowY: 'auto',
              width: '100%',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {rosItems?.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  backgroundColor: '#fafafa',
                }}
              >
                <Typography variant="bodyRegular4" color="textSecondary">
                  {templateConstants.ADD_AT_LEAST_ONE_CATEGORY.replace(
                    '{componentType}',
                    componentTypeFull
                  )}
                </Typography>
              </Box>
            ) : (
              <Box>
                {rosItems?.map((item, index) => (
                  <Details
                    item={item}
                    index={index}
                    rosItems={rosItems}
                    setRosItems={setRosItems}
                  />
                ))}
              </Box>
            )}
          </Paper>
          <Box display={'flex'} justifyContent={'end'} gap={1} mt={1}>
            <CustomButton variant="outlined" onClick={() => navigate(-1)} label="Cancel" />
            <CustomButton
              label={isCreatingROS || isUpdatingROS ? 'Saving...' : isEdit ? 'Update' : 'Save'}
              variant="filled"
              onClick={handleSave}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ROSComponent;
