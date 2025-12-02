import { Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { allergiesHeader } from 'src/components/core/reusable/headers/all-headers';
import { PatientAllergy, PatientAllergyControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { formatDateToMMDDYYYY, formatIsoDateToMMDDYYYY } from 'src/constants/date-format';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import { useEffect, useState } from 'react';
import AddAllergy from './add-allergy';
import {
  APIFeedbackMessages,
  ReactionOptions,
  SeverityOptions,
  allergyTypeOptions,
} from 'src/constants/formConst';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { formsConstants, patientDashboardConstants } from 'src/constants/patients-constants';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { settingConstants } from 'src/constants/admin-constants';

export default function Allergies() {
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<PatientAllergy | null>(null);
  const [openConfirmationPopup, setConfirmationPopup] = useState(false);
  const dispatch = useAppDispatch();

  const {
    data,
    refetch: refetchAllergyData,
    isPending,
  } = useQuery({
    queryKey: ['allAllergies', patientUUID],
    queryFn: () =>
      PatientAllergyControllerService.getApiMasterPatientAllergy({
        patientClinicUuid: patientUUID || '',
      }),
  });

  const {
    mutate: archiveAllergy,
    isSuccess: isArchiveAllergySuccess,
    isError: isArchiveAllergyError,
    error: archiveAllergyError,
    data: archiveAllergyData,
  } = useMutation({
    mutationFn: (data: any) => {
      return PatientAllergyControllerService.putApiMasterPatientAllergyByPatientAllergyIdArchiveStatusByStatus(
        {
          patientAllergyId: data.patientAllergyId,
          status: data.status,
        }
      );
    },
  });

  const allAllergies = (data?.data?.content as any[]) || [];
  const allergyArchived = archiveAllergyData?.data?.archived;

  const handleEdit = (allergy: PatientAllergy) => {
    setIsEdit(true);
    setOpenDialog(true);
    setSelectedData(allergy);
  };

  const handleArchive = async (rowData: PatientAllergy) => {
    setConfirmationPopup(true);
    setSelectedData(rowData);
  };

  const handleConfirm = async () => {
    if (!selectedData) return;
    try {
      const patientAllergyId = selectedData?.uuid;
      const isCurrentlyArchived = selectedData?.archive;

      await archiveAllergy({
        patientAllergyId: patientAllergyId,
        status: !isCurrentlyArchived,
      });

      refetchAllergyData();
    } catch (error) {
      console.error('Error archiving allergy:', error);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setConfirmationPopup(false);
    setIsEdit(false);
    setSelectedData(null);
  };

  useEffect(() => {
    if (isArchiveAllergySuccess) {
      setConfirmationPopup(false)
      refetchAllergyData();
    }
  }, [isArchiveAllergySuccess, refetchAllergyData]);

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isPending]);

  useApiFeedback(
    isArchiveAllergyError,
    archiveAllergyError,
    isArchiveAllergySuccess,
    (archiveAllergyData?.message ||
      (allergyArchived
        ? APIFeedbackMessages.ALLERGY_RESTORED_SUCCESSFULLY
        : APIFeedbackMessages.ALLERGY_ARCHIVED_SUCCESSFULLY)) as string
  );

  const tableData = allAllergies.map((allergy: any, index: number) => {
    return {
      ...allergy,
      number: index + 1,
      allergyType: allergyTypeOptions.find(option => option.value === allergy.allergyType)?.label,
      allergies: allergy.allergy?.name,
      reaction: ReactionOptions.find(option => option.value === allergy.reaction)?.label,
      severity: SeverityOptions.find(option => option.value === allergy.severity)?.label,
      date: formatDateToMMDDYYYY(allergy.onSetDate),
      recordedDate: formatIsoDateToMMDDYYYY(allergy.recordedDate),
      recordedBy: allergy.recordedBy,
      note: allergy.note,
      status: allergy?.archive ? 'ARCHIVED' : 'ACTIVE',
      archive: allergy?.archive,
      action: allergy?.archive
        ? [{ label: 'Restore', route: 'restore' }]
        : [
            { label: 'Edit', route: 'edit' },
            { label: 'Archive', route: 'archive' },
          ],
    };
  });
  return (
    <Grid container spacing={2}>
      <Grid
        size={12}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <CustomButton
          variant="filled"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenDialog(true);
            setIsEdit(false);
          }}
          label={patientDashboardConstants.ADD_ALLERGY}
        />
      </Grid>
      <Grid size={12}>
        <CustomisedTable
          headCells={allergiesHeader}
          tableData={tableData}
          handleEdit={handleEdit}
          handleArchive={handleArchive}
        />
      </Grid>
      <Grid>
        {openDialog && (
          <CustomDialog
            open={openDialog}
            onClose={handleClose}
            title={
              isEdit
                ? patientDashboardConstants.EDIT_ALLERGY
                : patientDashboardConstants.ADD_ALLERGY
            }
            children={
              <AddAllergy
                isEdit={isEdit}
                selectedData={selectedData || (null as unknown as PatientAllergy)}
                refetchAllergyData={refetchAllergyData}
                onClose={() => setOpenDialog(false)}
              />
            }
            buttonName={[formsConstants.SAVE]}
          />
        )}

        <ConfirmationPopUp
          open={openConfirmationPopup}
          onClose={handleClose}
          onConfirm={handleConfirm}
          message={settingConstants.CONFIRM_POP}
        />
      </Grid>
    </Grid>
  );
}
