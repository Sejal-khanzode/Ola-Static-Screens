import { Grid } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { diagnosesHeader } from 'src/components/core/reusable/headers/all-headers';
import { PatientDiagnosis, PatientDiagnosisControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { formatDateToMMDDYYYY, formatIsoDateToMMDDYYYY } from 'src/constants/date-format';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import { useEffect, useState } from 'react';
import AddDiagnosis from './add-diagnoses';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { typeOptions } from './add-diagnoses';
import { APIFeedbackMessages } from 'src/constants/formConst';
import { formsConstants, patientDashboardConstants } from 'src/constants/patients-constants';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { settingConstants } from 'src/constants/admin-constants';

export default function Diagnoses() {
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedData, setSelectedData] = useState<PatientDiagnosis | null>(null);
  const dispatch = useAppDispatch();

  const { data, refetch: refetchDiagnosesData } = useQuery({
    queryKey: ['allDiagnoses', patientUUID],
    queryFn: () =>
      PatientDiagnosisControllerService.getApiMasterPatientDiagnosis({
        patientClinicUuid: patientUUID || '',
      }),
  });

  const {
    mutate: archiveDiagnosis,
    isPending: isArchiveDiagnosisLoading,
    isSuccess: isArchiveDiagnosisSuccess,
    isError: isArchiveDiagnosisError,
    error: archiveDiagnosisError,
    data: archiveDiagnosisData,
  } = useMutation({
    mutationFn: (data: any) => {
      return PatientDiagnosisControllerService.putApiMasterPatientDiagnosisByPatientDiagnosisIdArchiveStatusByStatus(
        {
          patientDiagnosisId: data.patientDiagnosisId,
          status: data.status,
        }
      );
    },
  });

  const allDiagnoses = (data?.data?.content as any[]) || [];
  const diagnosisArchived = archiveDiagnosisData?.data?.archived;

  const handleEdit = (allergy: any) => {
    setIsEdit(true);
    setOpenDialog(true);
    setSelectedData(allergy);
  };

  const handleArchive = async (rowData: PatientDiagnosis) => {
    setConfirmationPopup(true);
    setSelectedData(rowData);
  };

  const handleConfirm = async () => {
    if (!selectedData) return;
    try {
      const patientDiagnosisId = selectedData.uuid;
      const isCurrentLyArchieved = selectedData.archive;

      await archiveDiagnosis({
        patientDiagnosisId: patientDiagnosisId,
        status: !isCurrentLyArchieved,
      });

      refetchDiagnosesData();
    } catch (error) {
      console.error('Error archiving diagnosis:', error);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setConfirmationPopup(false);
    setIsEdit(false);
    setSelectedData(null);
  };

  useEffect(() => {
    if (isArchiveDiagnosisLoading) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isArchiveDiagnosisLoading]);

  useEffect(() => {
    if (isArchiveDiagnosisSuccess) {
      setConfirmationPopup(false);
      refetchDiagnosesData();
    }
  }, [isArchiveDiagnosisSuccess, refetchDiagnosesData]);

  useApiFeedback(
    isArchiveDiagnosisError,
    archiveDiagnosisError,
    isArchiveDiagnosisSuccess,
    (archiveDiagnosisData?.message ||
      (diagnosisArchived
        ? APIFeedbackMessages.DIAGNOSIS_RESTORED_SUCCESSFULLY
        : APIFeedbackMessages.DIAGNOSIS_ARCHIVED_SUCCESSFULLY)) as string
  );

  const tableData = allDiagnoses.map((diagnosis: any, index: number) => {
    return {
      ...diagnosis,
      number: index + 1,
      diagnosisCode: `${diagnosis.medicalCode?.code} - ${diagnosis.medicalCode?.description}`,
      type: typeOptions.find(option => option.value === diagnosis.type)?.label,
      onsetDate: formatDateToMMDDYYYY(diagnosis.diagnosedDate),
      recordedDate: formatIsoDateToMMDDYYYY(diagnosis.recordedDate),
      recordedBy: diagnosis.recordedBy,
      status: diagnosis.archive ? 'ARCHIVED' : diagnosis?.active ? 'ACTIVE' : 'INACTIVE',
      note: diagnosis.note,
      action: diagnosis?.archive
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
          label={patientDashboardConstants.ADD_DIAGNOSIS}
        />
      </Grid>
      <Grid size={12}>
        <CustomisedTable
          headCells={diagnosesHeader}
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
                ? patientDashboardConstants.EDIT_DIAGNOSIS
                : patientDashboardConstants.ADD_DIAGNOSIS
            }
            children={
              <AddDiagnosis
                isEdit={isEdit}
                selectedData={selectedData || (null as unknown as PatientDiagnosis)}
                onClose={() => setOpenDialog(false)}
                refetchDiagnosesData={refetchDiagnosesData}
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
