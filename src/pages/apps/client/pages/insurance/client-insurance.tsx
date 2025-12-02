import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { capitalizeFirstLetter } from 'src/utils/stringUtils';
import { formatISODate } from 'src/utils/date-utils';
import { forwardRef, useEffect, useState } from 'react';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { Add } from '@mui/icons-material';
import AddInsuranceForm from './add-client-insurance';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import {
  ClientInsurnaceLables,
  InsuranceFormLabels,
  SUBSCRIBER_DETAILS_ENUM,
} from 'src/constants/setting-constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  PatientClinic,
  PatientClinicControllerService,
  PatientControllerService,
  PatientInsuranceControllerService,
} from 'src/sdk/requests';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import useApiFeedback from 'src/hooks/useApiFeedback';
import useAuthority from 'src/hooks/use-authority';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

interface RowProps {
  label: string;
  value: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ label, value }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Typography variant="bodyMedium4" sx={{ color: '#74797B', minWidth: 150 }}>
      {label}
    </Typography>
    <Box sx={{ flex: 1, ml: 2 }}>
      {typeof value === 'string' || typeof value === 'number' ? (
        <Typography variant="bodyRegular4" sx={{ color: '#373D41' }}>
          : {value}
        </Typography>
      ) : (
        value
      )}
    </Box>
  </Box>
);

interface InsurancePlanCardProps {
  title: string;
  insuranceType: string;
  planName: string;
  planType: string;
  relationship: string;
  name: string;
  dob: string;
  gender: string;
  memberId: string;
  groupId: string;
  startDate: string;
  endDate: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  insuranceCount?: number;
  onEdit?: () => void;
  onArchive?: () => void;
  onSetPrimary?: () => void;
  onSetSecondary?: () => void;
  insuranceCardFront?: string | null;
  insuranceCardBack?: string | null;
}

const InsurancePlanCard = ({
  title,
  insuranceType,
  planName,
  relationship,
  name,
  dob,
  memberId,
  groupId,
  startDate,
  endDate,
  isPrimary = false,
  isSecondary = false,
  insuranceCount = 0,
  onEdit,
  onArchive,
  onSetPrimary,
  onSetSecondary,
  insuranceCardFront,
  insuranceCardBack,
}: InsurancePlanCardProps) => (
  <Box
    sx={{
      background: '#EEF7FE',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: 'auto',
      boxShadow: 'none',
      border: '1px solid #E7E7E7',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 1.5,
        py: 0.8,
        borderBottom: '1px solid #E7E7E7',
      }}
    >
      <Typography
        variant="bodyRegular4"
        sx={{
          color: '#21262B',
        }}
      >
        {capitalizeFirstLetter(title)}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {insuranceType === 'SECONDARY' && onSetPrimary && (
          <Button
            variant="outlined"
            size="small"
            onClick={onSetPrimary}
            sx={{
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'none',
              borderColor: '#007FFF',
              color: '#007FFF',
              '&:hover': {
                borderColor: '#0056CC',
                backgroundColor: '#F0F8FF',
              },
            }}
          >
            {ClientInsurnaceLables.SET_PRIMARY}{' '}
          </Button>
        )}
        {insuranceType === 'OTHER' && (
          <>
            {onSetPrimary && (
              <Button
                variant="outlined"
                size="small"
                onClick={onSetPrimary}
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: 'none',
                  borderColor: '#007FFF',
                  color: '#007FFF',
                  '&:hover': {
                    borderColor: '#0056CC',
                    backgroundColor: '#F0F8FF',
                  },
                }}
              >
                {ClientInsurnaceLables.SET_PRIMARY}
              </Button>
            )}
            {onSetSecondary && (
              <Button
                variant="outlined"
                size="small"
                onClick={onSetSecondary}
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: 'none',
                  borderColor: '#007FFF',
                  color: '#007FFF',
                  '&:hover': {
                    borderColor: '#0056CC',
                    backgroundColor: '#F0F8FF',
                  },
                }}
              >
                {ClientInsurnaceLables.SET_SECONDARY}
              </Button>
            )}
          </>
        )}

        <Tooltip
          title={
            isPrimary
              ? ClientInsurnaceLables.PRIM_INS_CANNOT_BE_ARCHIVED
              : isSecondary && (insuranceCount ?? 0) > 2
                ? ClientInsurnaceLables.SEC_INS_CANNOT_BE_ARCHIVED
                : ClientInsurnaceLables.ARCHIVE
          }
        >
          <span>
            <IconButton
              size="small"
              sx={{ color: '#373D41' }}
              onClick={onArchive}
              disabled={isPrimary || (isSecondary && (insuranceCount ?? 0) > 2)}
            >
              <ArchiveOutlinedIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <IconButton size="small" sx={{ color: '#373D41' }} onClick={onEdit}>
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
    <Box sx={{ bgcolor: 'white' }}>
      <Grid container spacing={1} sx={{ p: 2 }}>
        <Grid size={4}>
          <Row label={InsuranceFormLabels.INSURANCE_NAME} value={capitalizeFirstLetter(planName)} />
        </Grid>
        <Grid size={4}>
          <Row label={InsuranceFormLabels.MEMBER_ID} value={memberId} />
        </Grid>
        <Grid size={4}>
          <Row label={InsuranceFormLabels.GROUP_ID} value={groupId} />
        </Grid>
        <Grid size={4}>
          <Row label={InsuranceFormLabels.START_DATE} value={formatISODate(startDate)} />
        </Grid>
        <Grid size={4}>
          <Row label={InsuranceFormLabels.END_DATE} value={formatISODate(endDate)} />
        </Grid>
        <Grid size={4}>
          <Row
            label={InsuranceFormLabels.RELATIONSHIP}
            value={capitalizeFirstLetter(relationship) || 'Self'}
          />
        </Grid>
        {relationship !== 'SELF' && (
          <>
            <Grid size={4}>
              <Row
                label={SUBSCRIBER_DETAILS_ENUM.SUBSCRIBER_NAME}
                value={capitalizeFirstLetter(name)}
              />
            </Grid>
            <Grid size={4}>
              <Row label={SUBSCRIBER_DETAILS_ENUM.DATE_OF_BIRTH} value={formatISODate(dob)} />
            </Grid>
          </>
        )}
      </Grid>

      <Stack direction="row" spacing={5} mb={2} ml={2}>
        <Box
          sx={{
            width: 250,
            height: 158,
            background: '#F5F5F5',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {insuranceCardFront ? (
            <img
              src={insuranceCardFront}
              alt={InsuranceFormLabels.INSURANCE_CARD_FRONT}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Typography
              variant="bodyMedium4"
              sx={{
                color: '#BDBDBD',
              }}
            >
              {InsuranceFormLabels.INSURANCE_CARD_FRONT}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 250,
            height: 158,
            background: '#F5F5F5',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {insuranceCardBack ? (
            <img
              src={insuranceCardBack}
              alt={InsuranceFormLabels.INSURANCE_CARD_BACK}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Typography
              variant="bodyMedium4"
              sx={{
                color: '#BDBDBD',
              }}
            >
              {InsuranceFormLabels.INSURANCE_CARD_BACK}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  </Box>
);

export const ClientInsurance = forwardRef(function ClientInsurance(_props, ref) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit'>('add');
  const [selectedInsurance, setSelectedInsurance] = useState<any>(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isPatientPortal } = useAuthority();
  const patientUUID = getDataFromLocalStorage('patientUUID');

  const { data: patientProfileData } = useQuery({
    queryKey: ['patientProfileData'],
    enabled: !patientUUID,
    queryFn: () => PatientControllerService.getApiMasterPatientProfile(),
  });

  const patientData = (patientProfileData as any)?.data;

  const { data: patientsApiData } = useQuery({
    queryKey: ['patientData'],
    enabled: !!patientData?.uuid,
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinicPatientByPatientUuid({
        patientUuid: patientData?.uuid || '',
      }),
  });

  const patientDetails = patientsApiData?.data as PatientClinic;

  const { data: patienInusrancetData, isLoading } = useQuery({
    queryKey: ['patienInusrancetData'],
    enabled: !!patientDetails?.uuid || !!patientUUID,
    queryFn: () =>
      PatientInsuranceControllerService.getApiMasterPatientInsurancePatientClinicByPatientClinicUuid(
        {
          patientClinicUuid: patientDetails?.uuid || patientUUID || '',
          archive: false,
        }
      ),
  });

  const {
    mutateAsync: changeInsTypeAsync,
    isPending: isUpdating,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = useMutation({
    mutationFn:
      PatientInsuranceControllerService.putApiMasterPatientInsuranceByPatientInsuranceIdTypeByInsuranceType,
  });

  const { mutateAsync: changeInsArchiveStatusAsync } = useMutation({
    mutationFn:
      PatientInsuranceControllerService.putApiMasterPatientInsuranceByPatientInsuranceIdArchiveStatusByStatus,
  });

  useEffect(() => {
    if (ref) {
      (ref as any).current = {
        openAddDrawer: () => {
          setDrawerMode('add');
          setDrawerOpen(true);
        },
      };
    }
  }, [ref]);

  const activeInsuranceData = (patienInusrancetData as any)?.data?.filter(
    (insurance: any) => insurance.active === true
  );

  const sortedInsuranceData = activeInsuranceData?.sort((a: any, b: any) => {
    const typeOrder = { PRIMARY: 1, SECONDARY: 2, OTHER: 3, TERTIARY: 3 };
    const orderA = typeOrder[a.insuranceType as keyof typeof typeOrder] || 4;
    const orderB = typeOrder[b.insuranceType as keyof typeof typeOrder] || 4;
    return orderA - orderB;
  });

  const handleEdit = (_insuranceId: string, insuranceData?: any) => {
    const formData = {
      insuranceType: insuranceData.insuranceType?.toLowerCase() || 'primary',
      insuranceName: insuranceData.insurancePayer?.payerName || insuranceData.planName || '',
      memberId: insuranceData.memberId || '',
      groupId: insuranceData.groupId || '',
      relationship: insuranceData.insuredRelationshipWithPatient || '',
      startDate: insuranceData.effectiveStartDate || '',
      endDate: insuranceData.effectiveEndDate || '',
      firstName: insuranceData.subscriberFirstName || '',
      lastName: insuranceData.subscriberLastName || '',
      dateOfBirth: insuranceData.subscriberBirthDate || insuranceData.insuredBirthDate || '',
      insuranceCardFront: insuranceData.frontPhoto || null,
      insuranceCardBack: insuranceData.backPhoto || null,
    };

    setSelectedInsurance({ ...insuranceData, formData });
    setDrawerMode('edit');
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedInsurance(null);
  };

  const handleFormSubmit = async () => {
    await queryClient.invalidateQueries({ queryKey: ['patienInusrancetData'] });
    handleCloseDrawer();
  };

  const handleArchive = async (insuranceId: string) => {
    try {
      await changeInsArchiveStatusAsync({
        patientInsuranceId: insuranceId,
        status: true,
      });
      await queryClient.invalidateQueries({ queryKey: ['patienInusrancetData'] });
    } catch (error) {
      console.error('Failed to archive insurance:', error);
    }
  };

  const handleSetPrimary = async (insuranceId: string) => {
    try {
      await changeInsTypeAsync({
        patientInsuranceId: insuranceId,
        insuranceType: 'PRIMARY',
      });
      await queryClient.invalidateQueries({ queryKey: ['patienInusrancetData'] });
    } catch (error) {
      console.error('Failed to set primary insurance:', error);
    }
  };

  const handleSetSecondary = async (insuranceId: string) => {
    try {
      await changeInsTypeAsync({
        patientInsuranceId: insuranceId,
        insuranceType: 'SECONDARY',
      });
      // Refetch insurance data after changing type
      await queryClient.invalidateQueries({ queryKey: ['patienInusrancetData'] });
    } catch (error) {
      console.error('Failed to set secondary insurance:', error);
    }
  };

  useEffect(() => {
    if (isLoading || isUpdating) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, dispatch, isUpdating]);

  useApiFeedback(
    isErrorUpdate,
    errorUpdate,
    isSuccessUpdate,
    (dataUpdate?.message || 'Updated Successfully') as string
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          width: '100%',
          height: '90vh',
        }}
      >
        {isPatientPortal && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="bodyMedium3">
              {' '}
              {ClientInsurnaceLables.INSURANCE_DETAILS}
            </Typography>
            <CustomButton
              label={ClientInsurnaceLables.ADD_INSURANCE}
              startIcon={<Add />}
              variant="filled"
              onClick={() => {
                setDrawerMode('add');
                setDrawerOpen(true);
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#D2D2D2',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {sortedInsuranceData && sortedInsuranceData.length > 0 ? (
            sortedInsuranceData?.map((insurance: any, index: number) => {
              const isPrimary = insurance.insuranceType === 'PRIMARY';
              const isSecondary = insurance.insuranceType === 'SECONDARY';
              const insuranceCount = sortedInsuranceData.length;

              const cardTitle = isPrimary
                ? InsuranceFormLabels.PRIMARY_INSURANCE
                : insurance.insuranceType === 'SECONDARY'
                  ? InsuranceFormLabels.SECONDARY_INSURANCE
                  : insurance.insuranceType === 'OTHER'
                    ? InsuranceFormLabels.OTHER_INSURANCE
                    : `${insurance.insuranceType} Insurance`;
              return (
                <InsurancePlanCard
                  key={insurance.uuid || index}
                  title={cardTitle}
                  insuranceType={insurance.insuranceType}
                  planName={insurance.insurancePayer?.payerName || insurance.planName || ''}
                  planType={insurance.planType || ''}
                  relationship={insurance.insuredRelationshipWithPatient || ''}
                  name={`${insurance.subscriberFirstName || ''} ${insurance.subscriberLastName || ''}`.trim()}
                  dob={insurance.subscriberBirthDate || insurance.insuredBirthDate}
                  gender={insurance.subscriberGender || insurance.insuredGender || '-'}
                  memberId={insurance.memberId}
                  groupId={insurance.groupId}
                  startDate={insurance.effectiveStartDate}
                  endDate={insurance.effectiveEndDate}
                  isPrimary={isPrimary}
                  isSecondary={isSecondary}
                  insuranceCount={insuranceCount}
                  onEdit={() => handleEdit(insurance.uuid || `insurance-${index}`, insurance)}
                  onArchive={() => handleArchive(insurance.uuid || `insurance-${index}`)}
                  onSetPrimary={() => handleSetPrimary(insurance.uuid || `insurance-${index}`)}
                  onSetSecondary={() => handleSetSecondary(insurance.uuid || `insurance-${index}`)}
                  insuranceCardFront={insurance.frontPhoto}
                  insuranceCardBack={insurance.backPhoto}
                />
              );
            })
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {ClientInsurnaceLables.NO_INSURANCE_FOUND}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {ClientInsurnaceLables.CLICK_TO_ADD_INSURANCE}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <CustomDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        title={
          drawerMode === 'edit'
            ? ClientInsurnaceLables.EDIT_INSURANCE
            : ClientInsurnaceLables.ADD_INSURANCE
        }
        drawerWidth="50vw"
      >
        <AddInsuranceForm
          defaultValues={selectedInsurance?.formData || {}}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseDrawer}
          isEdit={drawerMode === 'edit'}
          patientClinicUuid={patientDetails?.uuid}
          insuranceUuid={selectedInsurance?.uuid}
        />
      </CustomDrawer>
    </>
  );
});

export default ClientInsurance;
