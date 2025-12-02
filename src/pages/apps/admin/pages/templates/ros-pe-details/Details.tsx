import { Delete } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ROSItem } from './RosPeComponent';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ClinicalTemplateService } from 'src/sdk/requests/services.gen';

interface ROSDetailsProps {
  item?: ROSItem;
  index?: number;
  uuid?: string;
  rosItems?: ROSItem[];
  setRosItems?: (items: ROSItem[]) => void;
  onDataChange?: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  editForm?: boolean;
  onOriginalDataChange?: (data: Record<string, any>) => void;
}

const Details = (props: ROSDetailsProps) => {
  const {
    item,
    uuid,
    rosItems,
    setRosItems,
    onDataChange,
    initialData,
    editForm,
    onOriginalDataChange,
  } = props;
  const [apiData, setApiData] = useState<Record<string, any>>({});
  const [lastUuid, setLastUuid] = useState<string | undefined>(undefined);
  const [lastInitialData, setLastInitialData] = useState<Record<string, any> | undefined>(
    undefined
  );

  const { data: fieldsData } = useQuery({
    queryKey: ['rosFields', uuid],
    queryFn: () =>
      ClinicalTemplateService.getApiMasterClinicalTemplateByTemplateId({
        templateId: uuid || '',
      }),
    enabled: !!uuid,
  });

  const fieldData = fieldsData?.data?.questionsAnswers;

  useEffect(() => {
    if (!fieldData) return;

    // Check if initialData changed
    const initialDataChanged = JSON.stringify(lastInitialData) !== JSON.stringify(initialData);

    // Update conditions: UUID changed, first load, or initialData changed
    const shouldUpdate = lastUuid !== uuid || lastUuid === undefined || initialDataChanged;

    if (shouldUpdate) {
      // If uuid changed (different template selected), always use fresh fieldData
      if (lastUuid !== uuid && lastUuid !== undefined) {
        setApiData(fieldData);
      } else if (initialData && Object.keys(initialData)?.length > 0) {
        // Filter fieldData to only show what's in initialData with non-empty answers
        const filteredData: Record<string, any> = {};

        Object.keys(initialData).forEach(key => {
          const initialField = initialData[key];

          if (initialField && fieldData && typeof fieldData === 'object' && key in fieldData) {
            filteredData[key] = {
              ...(fieldData as any)[key],
              answer: initialField.answer || '',
            };
          }
        });

        setApiData(filteredData); // Only call onDataChange with filtered data if we're in edit mode
        // This ensures that for edit mode, the parent gets the filtered data
        if (editForm) {
          onDataChange?.(filteredData);
        }
      } else {
        setApiData(fieldData);

        // Always send the original fieldData to parent via onOriginalDataChange
        // This allows parent to store the template structure separately
        onOriginalDataChange?.(fieldData);

        // Send the apiData as trueData to parent
        onDataChange?.(fieldData);
      }

      setLastUuid(uuid);
      setLastInitialData(initialData);
    }
  }, [fieldData, initialData, uuid, lastUuid, lastInitialData]);

  // Send updated apiData to parent whenever it changes
  useEffect(() => {
    if (apiData && Object.keys(apiData)?.length > 0) {
      onDataChange?.(apiData);
    }
  }, [apiData, onDataChange]);

  const handleInputChange = (questionKey: string, value: string) => {
    if (uuid) {
      const updatedData = {
        ...apiData,
        [questionKey]: {
          ...apiData[questionKey],
          answer: value,
        },
      };
      setApiData(updatedData);
      onDataChange?.(updatedData);
    } else {
      if (setRosItems && rosItems) {
        const updatedItems = rosItems?.map(item =>
          item.name === questionKey ? { ...item, value } : item
        );
        setRosItems(updatedItems);
      }
    }
  };

  const handleRemoveItem = (questionKey: string) => {
    if (uuid) {
      setApiData(prev => {
        const newData = { ...prev };
        delete newData[questionKey];
        // Call onDataChange to notify parent component about the deletion
        onDataChange?.(newData);
        return newData;
      });
    } else {
      if (setRosItems && rosItems) {
        const updatedItems = rosItems?.filter(item => item.name !== questionKey);
        setRosItems(updatedItems);
      }
    }
  };

  if (apiData && Object.keys(apiData)?.length > 0) {
    return (
      <>
        {Object.entries(apiData)?.map(([key, value]: [string, any]) => (
          <Box key={key} sx={{ mb: 1 }}>
            <Grid container gap={1.5} size={12}>
              <Grid size={1.2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="titleMedium4" sx={{ color: '#595F63', flexGrow: 1 }}>
                  {value.question}
                </Typography>
              </Grid>
              <Grid size={10}>
                <TextField
                  fullWidth
                  multiline
                  rows={1}
                  value={value.answer || ''}
                  onChange={e => handleInputChange(key, e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: 'Base.white',
                  }}
                />
              </Grid>
              <Grid size={0.3} sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveItem(key)}
                  sx={{ color: 'Negative.40' }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
      </>
    );
  }

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <Grid container gap={1.5} size={12}>
          <Grid size={1.2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="titleMedium4" sx={{ color: '#595F63', flexGrow: 1 }}>
              {item?.name || ''}
            </Typography>
          </Grid>
          <Grid size={10}>
            <TextField
              fullWidth
              multiline
              rows={1}
              value={item?.value || ''}
              onChange={e => handleInputChange(item?.name || '', e.target.value)}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid size={0.3} sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={() => handleRemoveItem(item?.name || '')}
              sx={{ color: 'Negative.40' }}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Details;
