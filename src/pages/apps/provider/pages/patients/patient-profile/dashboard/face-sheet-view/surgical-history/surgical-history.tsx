import { Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { surgicalHistoryHeader } from 'src/components/core/reusable/headers/all-headers';
import { PatientSurgicalHistory, PatientSurgicalHistoryControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { formatDateToMMDDYYYY } from 'src/constants/date-format';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import { useEffect, useState } from 'react';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { APIFeedbackMessages } from 'src/constants/formConst';
import { formsConstants, patientDashboardConstants } from 'src/constants/patients-constants';
import AddSurgicalHistory from './add-surgical-history';
import { useAppDispatch } from 'src/redux/hooks';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { settingConstants } from 'src/constants/admin-constants';

export default function SurgicalHistory() {
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedData, setSelectedData] = useState<PatientSurgicalHistory | null>(null);
  const dispatch = useAppDispatch();

  const { data: surgicalHistoryData, refetch: refetchSurgicalHistoryData } = useQuery({
    queryKey: ['allSurgicalHistory', patientUUID],
    queryFn: () =>
      PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistory({
        patientClinicUuid: patientUUID || '',
      }),
  });

  const {
    mutate: archiveSurgicalHistory,
    isSuccess: isSuccessArchiveSurgicalHistory,
    isError: isErrorArchiveSurgicalHistory,
    error: errorArchiveSurgicalHistory,
    data: archiveSurgicalHistoryData,
    isPending: isArchiveSurgicalHistoryLoading,
  } = useMutation({
    mutationFn: (data: any) =>
      PatientSurgicalHistoryControllerService.putApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdArchiveStatusByStatus(
        {
          patientSurgicalHistoryId: data.patientSurgicalHistoryId,
          status: data.status,
        }
      ),
  });

  const allSurgicalHistory = (surgicalHistoryData?.data?.content as any[]) || [];
  const surgicalHistoryArchived = archiveSurgicalHistoryData?.data?.archived;

  const handleEdit = (surgicalHistory: any) => {
    setIsEdit(true);
    setOpenDialog(true);
    setSelectedData(surgicalHistory);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setConfirmationPopup(false);
    setIsEdit(false);
    setSelectedData(null);
  };
  const handleArchive = async (rowData: PatientSurgicalHistory) => {
    setConfirmationPopup(true);
    setSelectedData(rowData);
  };

  const handleConfirm = async () => {
    if (!selectedData) return;
    try {
      const patientSurgicalHistoryId = selectedData.uuid;
      const isCurrentlyArchived = selectedData.archive;

      await archiveSurgicalHistory({
        patientSurgicalHistoryId: patientSurgicalHistoryId,
        status: !isCurrentlyArchived,
      });
    } catch (error) {
      console.error('Error archiving surgical history:', error);
    }
  };

  useApiFeedback(
    isErrorArchiveSurgicalHistory,
    errorArchiveSurgicalHistory,
    isSuccessArchiveSurgicalHistory,
    (archiveSurgicalHistoryData?.message ||
      (surgicalHistoryArchived
        ? APIFeedbackMessages.SURGICAL_HISTORY_ARCHIVED_SUCCESSFULLY
        : APIFeedbackMessages.SURGICAL_HISTORY_RESTORED_SUCCESSFULLY)) as string
  );

  useEffect(() => {
    if (isArchiveSurgicalHistoryLoading) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isArchiveSurgicalHistoryLoading]);

  useEffect(() => {
    if (isSuccessArchiveSurgicalHistory) {
      setConfirmationPopup(false);
      refetchSurgicalHistoryData();
    }
  }, [isSuccessArchiveSurgicalHistory, refetchSurgicalHistoryData]);

  const tableData = allSurgicalHistory.map((surgicalHistory: any, index: number) => {
    return {
      ...surgicalHistory,
      number: index + 1,
      surgeryName: surgicalHistory.surgeryName,
      date: formatDateToMMDDYYYY(surgicalHistory.surgeryDate),
      note: surgicalHistory.note,
      status: surgicalHistory?.archive ? 'ARCHIVED' : 'ACTIVE',
      archive: surgicalHistory.archive,
      recordedBy: surgicalHistory?.recordedBy,
      action: surgicalHistory?.archive
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
          label={patientDashboardConstants.ADD_SURGERICAL_HISTORY}
        />
      </Grid>
      <Grid size={12}>
        <CustomisedTable
          headCells={surgicalHistoryHeader}
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
                ? patientDashboardConstants.EDIT_SURGERICAL_HISTORY
                : patientDashboardConstants.ADD_SURGERICAL_HISTORY
            }
            children={
              <AddSurgicalHistory
                isEdit={isEdit}
                onClose={handleClose}
                selectedData={selectedData}
                refetchSurgicalHistory={refetchSurgicalHistoryData}
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
