import { Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { familyHistoryHeader } from 'src/components/core/reusable/headers/all-headers';
import { PatientFamilyHistory, PatientFamilyHistoryControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import { useEffect, useState } from 'react';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { APIFeedbackMessages, RelationshipList } from 'src/constants/formConst';
import { formsConstants, patientDashboardConstants } from 'src/constants/patients-constants';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import AddFamilyHistory from './add-family-history';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { settingConstants } from 'src/constants/admin-constants';

export default function FamilyHistory() {
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedData, setSelectedData] = useState<PatientFamilyHistory | null>(null);
  const dispatch = useAppDispatch();

  const { data: familyHistoryData, refetch: refetchFamilyHistoryData } = useQuery({
    queryKey: ['allFamilyHistory', patientUUID],
    queryFn: () =>
      PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistory({
        patientClinicUuid: patientUUID || '',
      }),
  });

  const {
    mutate: archiveFamilyHistory,
    isPending: isArchiveFamilyHistoryLoading,
    isSuccess: isArchiveFamilyHistorySuccess,
    isError: isArchiveFamilyHistoryError,
    error: archiveFamilyHistoryError,
    data: archiveFamilyHistoryData,
  } = useMutation({
    mutationFn: (data: any) => {
      return PatientFamilyHistoryControllerService.putApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdArchiveStatusByStatus(
        {
          patientFamilyHistoryId: data.patientFamilyHistoryId,
          status: data.status,
        }
      );
    },
  });

  const allFamilyHistory = (familyHistoryData?.data?.content as PatientFamilyHistory[]) || [];
  const familyHistoryArchived = archiveFamilyHistoryData?.data?.archived;

  const handleEdit = (allergy: PatientFamilyHistory) => {
    setIsEdit(true);
    setOpenDialog(true);
    setSelectedData(allergy);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setConfirmationPopup(false);
    setIsEdit(false);
    setSelectedData(null);
  };

  const handleArchive = async (rowData: PatientFamilyHistory) => {
    setConfirmationPopup(true);
    setSelectedData(rowData);
  };

  const handleConfirm = async () => {
    if (!selectedData) return;

    try {
      const patientFamilyHistoryId = selectedData.uuid;
      const isCurrentLyArchieved = selectedData.archive;

      await archiveFamilyHistory({
        patientFamilyHistoryId: patientFamilyHistoryId,
        status: !isCurrentLyArchieved,
      });

      refetchFamilyHistoryData();
    } catch (error) {
      console.error('Error archiving family history:', error);
    }
  };

  const getRelationshipLabel = (value: string) => {
    const relationship = RelationshipList.find(rel => rel.value === value);
    return relationship?.label || value;
  };

  const tableData = allFamilyHistory.map((familyHistory: any, index: number) => {
    return {
      ...familyHistory,
      number: index + 1,
      problems: familyHistory.problems,
      relative: getRelationshipLabel(familyHistory.relative),
      onSetAge: familyHistory.onSetAge,
      died: familyHistory.died ? 'Yes' : 'No',
      note: familyHistory.note,
      status: familyHistory?.archive ? 'ARCHIVED' : 'ACTIVE',
      archive: familyHistory?.archive,
      recordedBy: familyHistory?.recordedBy,
      action: familyHistory?.archive
        ? [{ label: 'Restore', route: 'restore' }]
        : [
            { label: 'Edit', route: 'edit' },
            { label: 'Archive', route: 'archive' },
          ],
    };
  });

  useEffect(() => {
    if (isArchiveFamilyHistoryLoading) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isArchiveFamilyHistoryLoading]);

  useEffect(() => {
    if (isArchiveFamilyHistorySuccess) {
      setConfirmationPopup(false);
      refetchFamilyHistoryData();
    }
  }, [isArchiveFamilyHistorySuccess, refetchFamilyHistoryData]);

  useApiFeedback(
    isArchiveFamilyHistoryError,
    archiveFamilyHistoryError,
    isArchiveFamilyHistorySuccess,
    (archiveFamilyHistoryData?.message ||
      (familyHistoryArchived
        ? APIFeedbackMessages.FAMILY_HISTORY_RESTORED_SUCCESSFULLY
        : APIFeedbackMessages.FAMILY_HISTORY_ARCHIVED_SUCCESSFULLY)) as string
  );

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
          label={patientDashboardConstants.ADD_FAMILY_HISTORY}
        />
      </Grid>
      <Grid size={12}>
        <CustomisedTable
          headCells={familyHistoryHeader}
          tableData={tableData || []}
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
                ? patientDashboardConstants.EDIT_FAMILY_HISTORY
                : patientDashboardConstants.ADD_FAMILY_HISTORY
            }
            children={
              <AddFamilyHistory
                isEdit={isEdit}
                selectedData={selectedData || (null as unknown as PatientFamilyHistory)}
                onClose={() => setOpenDialog(false)}
                refetchFamilyHistoryData={refetchFamilyHistoryData}
              />
            }
            buttonName={[formsConstants.CANCEL, formsConstants.SAVE]}
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
