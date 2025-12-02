import { Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { medicalHistoryHeader } from 'src/components/core/reusable/headers/all-headers';
import {
  PatientFamilyHistory,
  PatientMedicalHistory,
  PatientMedicalHistoryControllerService,
} from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { formatDateToMMDDYYYY, formatIsoDateToMMDDYYYY } from 'src/constants/date-format';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import { useEffect, useState } from 'react';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { formsConstants, patientDashboardConstants } from 'src/constants/patients-constants';
import AddMedicalHistory from './add-medical-history';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { settingConstants } from 'src/constants/admin-constants';
import { useAppDispatch } from 'src/redux/hooks';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';

export default function MedicalHistory() {
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<PatientMedicalHistory | null>(null);
  const [openConfirmationPopup, setConfirmationPopup] = useState(false);
  const dispatch = useAppDispatch();

  const { data: medicalHistoryData, refetch: refetchMedicalHistoryData } = useQuery({
    queryKey: ['allMedicalHistory', patientUUID],
    queryFn: () =>
      PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistory({
        patientClinicUuid: patientUUID || '',
      }),
  });

  const {
    mutate: archiveMedicalHistory,
    isPending: isArchiveMedicalHistoryLoading,
    isSuccess: isSuccessArchiveMedicalHistory,
    isError: isErrorArchiveMedicalHistory,
    error: errorArchiveMedicalHistory,
    data: archiveMedicalHistoryData,
  } = useMutation({
    mutationFn: (data: any) =>
      PatientMedicalHistoryControllerService.putApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdArchiveStatusByStatus(
        {
          patientMedicalHistoryId: data.patientMedicalHistoryId,
          status: data.status,
        }
      ),
  });

  const allMedicalHistory = (medicalHistoryData?.data?.content as PatientMedicalHistory[]) || [];

  const handleEdit = (medicalHistory: any) => {
    setIsEdit(true);
    setOpenDialog(true);
    setSelectedData(medicalHistory);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setConfirmationPopup(false);
    setIsEdit(false);
    setSelectedData(null);
  };

  const handleArchive = async (rowData: PatientMedicalHistory) => {
    setConfirmationPopup(true);
    setSelectedData(rowData);
  };

  const handleConfirm = async () => {
    if (!selectedData) return;
    try {
      const patientMedicalHistoryId = selectedData.uuid;
      const isCurrentLyArchieved = selectedData.archive;

      await archiveMedicalHistory({
        patientMedicalHistoryId: patientMedicalHistoryId,
        status: !isCurrentLyArchieved,
      });

      refetchMedicalHistoryData();
    } catch (error) {
      console.error('Error archiving clinic:', error);
    }
  };

  useEffect(() => {
    if (isArchiveMedicalHistoryLoading) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isArchiveMedicalHistoryLoading]);

  const tableData = allMedicalHistory.map((medicalHistory: any, index: number) => {
    return {
      ...medicalHistory,
      number: index + 1,
      conditionName: medicalHistory.conditionName,
      date: formatDateToMMDDYYYY(medicalHistory.medicalHistoryDate),
      note: medicalHistory.note,
      recordedDate: formatIsoDateToMMDDYYYY(medicalHistory.recordedDate),
      status: medicalHistory?.archive ? 'ARCHIVED' : 'ACTIVE',
      archive: medicalHistory?.archive,
      recordedBy: medicalHistory?.recordedBy,
      action: medicalHistory.archive
        ? [{ label: 'Restore', route: 'restore' }]
        : [
            { label: 'Edit', route: 'edit' },
            { label: 'Archive', route: 'archive' },
          ],
    };
  });

  useEffect(() => {
    if (isSuccessArchiveMedicalHistory) {
      setConfirmationPopup(false);
      refetchMedicalHistoryData();
    }
  }, [isSuccessArchiveMedicalHistory, refetchMedicalHistoryData]);

  useApiFeedback(
    isErrorArchiveMedicalHistory,
    errorArchiveMedicalHistory,
    isSuccessArchiveMedicalHistory,
    (archiveMedicalHistoryData?.message as unknown as string) 
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
          label={patientDashboardConstants.ADD_MEDICAL_HISTORY}
        />
      </Grid>
      <Grid size={12}>
        <CustomisedTable
          headCells={medicalHistoryHeader}
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
                ? patientDashboardConstants.EDIT_MEDICAL_HISTORY
                : patientDashboardConstants.ADD_MEDICAL_HISTORY
            }
            buttonName={[formsConstants.CANCEL, formsConstants.SAVE]}
            children={
              <AddMedicalHistory
                isEdit={isEdit}
                selectedData={selectedData || (null as unknown as PatientFamilyHistory)}
                onClose={() => setOpenDialog(false)}
                refetchMedicalHistoryData={refetchMedicalHistoryData}
              />
            }
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
