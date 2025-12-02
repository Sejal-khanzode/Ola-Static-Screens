import { Box, Grid, Stack, Typography } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { AddIcon } from 'src/assets/icons/addIcon';
import { DeleteIcon } from 'src/assets/icons/deleteIcon';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomIcon from 'src/components/core/reusable/CustomIcon';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { RelationshipList, genderList } from 'src/constants/formConst';
import { templateConstants } from 'src/constants/setting-constants';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface FamilyHistoryFormProps {
  onChangeData?: (data: FamilyHealthHistoryData) => void;
  data?: FamilyHealthHistoryData | null;
  patientApptIntake?: string;
}

export interface FamilyHealthHistoryData {
  familyMembers: {
    relation: string;
    age: string;
    gender: string;
    significantHealthProblem: string;
  }[];
}

const FamilyHealthHistory: React.FC<FamilyHistoryFormProps> = ({
  onChangeData,
  data,
  patientApptIntake,
}) => {
  const [, setIsDataLoaded] = useState(false);
  const { control, setValue, getValues } = useForm<FamilyHealthHistoryData>({
    defaultValues: {
      familyMembers: [{ relation: '', age: '', gender: '', significantHealthProblem: '' }],
    },
  });

  useEffect(() => {
    const members = data?.familyMembers;
    if (members && members.length > 0) {
      setValue('familyMembers', members);
      setIsDataLoaded(true);
    }
  }, [data, setValue]);

  const formValues = useWatch({ control });

  const debouncedChange = useDebouncedCallback((values: FamilyHealthHistoryData) => {
    onChangeData?.(values);
  }, 400);

  useEffect(() => {
    debouncedChange(formValues as any);
  }, [formValues]);

  const familyMembers = formValues.familyMembers || [];

  const addFamilyMember = () => {
    const currentMembers = getValues('familyMembers') || [];
    setValue('familyMembers', [
      ...currentMembers,
      { relation: '', age: '', gender: '', significantHealthProblem: '' },
    ]);
  };

  const removeFamilyMember = (index: number) => {
    const currentMembers = getValues('familyMembers') || [];
    setValue(
      'familyMembers',
      currentMembers.filter((_, i) => i !== index)
    );
  };

  return (
    <Grid container sx={{ width: '100%', overflowY: 'auto', padding: 0.5 }}>
      <Grid size={12} sx={{ padding: 1 }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <CustomLabel label={templateConstants.RELATIONSHIP_TO_PATIENT} />
          </Grid>
          <Grid size={2}>
            <CustomLabel label={templateConstants.AGE} />
          </Grid>
          <Grid size={2}>
            <CustomLabel label={templateConstants.GENDER} />
          </Grid>
          <Grid size={5}>
            <CustomLabel label={templateConstants.SIGNIFICANT_HEALTH_PROBLEM} />
          </Grid>
        </Grid>

        <Stack spacing={1}>
          {familyMembers.map((_, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid size={3}>
                <Controller
                  name={`familyMembers.${index}.relation` as any}
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      placeholder={templateConstants.SELECT_RELATIONSHIP_TO_PATIENT}
                      items={RelationshipList}
                      value={field.value || ''}
                      isDisabled={!!patientApptIntake}
                    />
                  )}
                />
              </Grid>
              <Grid size={2}>
                <Controller
                  name={`familyMembers.${index}.age` as any}
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder={templateConstants.ENTER_AGE}
                      value={field.value || ''}
                      disableField={!!patientApptIntake}
                    />
                  )}
                />
              </Grid>
              <Grid size={2}>
                <Controller
                  name={`familyMembers.${index}.gender` as any}
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      placeholder={templateConstants.SELECT_GENDER}
                      items={genderList}
                      value={field.value || ''}
                      isDisabled={!!patientApptIntake}
                    />
                  )}
                />
              </Grid>
              <Grid size={4.5}>
                <Controller
                  name={`familyMembers.${index}.significantHealthProblem` as any}
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder="Enter"
                      value={field.value || ''}
                      disableField={!!patientApptIntake}
                    />
                  )}
                />
              </Grid>
              <Grid size={0.5}>
                <CustomIcon
                  iconColor="Negative.40"
                  size="medium"
                  disabled={!!patientApptIntake}
                  icon={
                    <DeleteIcon
                      style={{ cursor: familyMembers.length > 1 ? 'pointer' : 'not-allowed' }}
                    />
                  }
                  onClick={() => familyMembers.length > 1 && removeFamilyMember(index)}
                />
              </Grid>
            </Grid>
          ))}
        </Stack>

        <Grid size={12}>
          <Box onClick={!!patientApptIntake ? undefined : addFamilyMember}>
            <Typography
              variant="bodyMedium4"
              sx={{
                display: 'flex',
                width: 'fit-content',
                py: 0.5,
                alignItems: 'center',
                cursor: !!patientApptIntake ? 'not-allowed' : 'pointer',
                gap: 1,
                opacity: !!patientApptIntake ? 0.6 : 1,
                color: !!patientApptIntake ? 'text.disabled' : 'Primary.main',
              }}
            >
              <AddIcon /> Add New
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FamilyHealthHistory;
