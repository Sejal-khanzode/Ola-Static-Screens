import { Grid } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { stickyNotesHeader } from 'src/components/core/reusable/headers/all-headers';
import { StickyNoteControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { useEffect, useState } from 'react';
import ConfirmationPopup from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { formatDateToMMDDYYYY, formatTime } from 'src/constants/date-format';
import { APIFeedbackMessages } from 'src/constants/formConst';

let globalRefetchStickyNotesFunction: (() => void) | null = null;

export const setGlobalRefetchStickyNotesFunction = (refetchFn: () => void) => {
  globalRefetchStickyNotesFunction = refetchFn;
};

export const getGlobalRefetchStickyNotesFunction = () => globalRefetchStickyNotesFunction;

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { data: stickyNotes, isPending: isPendingStickyNotes } = useQuery({
    queryKey: ['sticky-notes', patientUUID],
    queryFn: () =>
      StickyNoteControllerService.getApiMasterStickyNotes({
        patientClinicUuid: patientUUID || '',
        archive: false,
      }),
  });
  const stickyNotesData = (stickyNotes?.data?.content as any[]) || [];

  const {
    mutateAsync: changeStatusAsync,
    isSuccess: isSuccessChangeStatus,
    isError: isErrorChangeStatus,
    error: errorChangeStatus,
    data: dataChangeStatus,
  } = useMutation({
    mutationFn:
      StickyNoteControllerService.putApiMasterStickyNotesByStickyNoteIdArchiveStatusByStatus,
  });

  const handleArchive = async (rowData: any) => {
    try {
      await changeStatusAsync({
        stickyNoteId: rowData.uuid,
        status: true,
      });
    } catch (error) {
      console.error('Error archiving sticky note:', error);
    }
  };

  const handleView = (row: any) => {
    setOpenPopup(true);
    setSelectedRow(row);
  };

  const tableData = Array.isArray(stickyNotesData)
    ? stickyNotesData?.map((stickyNote: any) => ({
        ...stickyNote,
        createdInfo: stickyNote?.createdInfo || '',
        description: stickyNote?.description || '',
        createdDate: formatDateToMMDDYYYY(stickyNote?.createdDate) || '',
        createdTime: formatTime(stickyNote?.createdDate) || '   ',
        action: [{ label: 'Archive', route: 'archive' }],
      }))
    : [];

  useEffect(() => {
    if (isPendingStickyNotes) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPendingStickyNotes]);

  useEffect(() => {
    if (isSuccessChangeStatus) {
      getGlobalRefetchStickyNotesFunction()?.();
    }
  }, [isSuccessChangeStatus]);

  useApiFeedback(
    isErrorChangeStatus,
    errorChangeStatus,
    isSuccessChangeStatus,
    (dataChangeStatus?.data?.message as string) ||
      APIFeedbackMessages.STICKY_NOTE_ARCHIVED_SUCCESSFULLY
  );

  return (
    <Grid container>
      <Grid size={12}>
        <CustomisedTable
          headCells={stickyNotesHeader}
          tableData={tableData}
          handleArchive={handleArchive}
          handleView={handleView}
          pageSize={10}
        />
      </Grid>

      <ConfirmationPopup
        open={openPopup}
        title="Note Details"
        onClose={() => setOpenPopup(false)}
        onConfirm={() => {}}
        message={selectedRow?.description || ''}
        button={false}
        details={selectedRow}
      />
    </Grid>
  );
}
