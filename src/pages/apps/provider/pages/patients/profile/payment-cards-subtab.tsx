import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomisedTable from '../../../../../../components/core/reusable/custom-table/custom-table';
import { Header } from 'src/components/core/reusable/headers/all-headers';
import { paymentCardConstants } from 'src/constants/patients-constants';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import {
  PatientClinicPaymentMethodControllerService,
  StripeControllerService,
} from 'src/sdk/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import useApiFeedback from 'src/hooks/useApiFeedback';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';

// Global refetch function for payment cards
let globalRefetchPaymentCardsFunction: (() => void) | null = null;

export const setGlobalRefetchPaymentCardsFunction = (refetchFn: () => void) => {
  globalRefetchPaymentCardsFunction = refetchFn;
};

export const getGlobalRefetchPaymentCardsFunction = () => globalRefetchPaymentCardsFunction;

interface PaymentCardsSubtabProps {
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PaymentCardsSubtab({}: PaymentCardsSubtabProps = {}) {
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
  const [cardToArchive, setCardToArchive] = useState<any>(null);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);
  const [cardToChangeStatus, setCardToChangeStatus] = useState<any>(null);
  const [isPrimaryConfirmOpen, setIsPrimaryConfirmOpen] = useState(false);
  const [cardToSetPrimary, setCardToSetPrimary] = useState<any>(null);

  const {
    data: patientClinicApiData,
    isLoading: isLoading,
    isFetching: isFetching,
    refetch,
  } = useQuery({
    queryKey: ['cardDetails', patientUUID],
    enabled: !!patientUUID,
    queryFn: () =>
      StripeControllerService.getApiMasterStripePaymentMethodByPatientClinicUuid({
        patientClinicUuid: patientUUID || '',
        page: page,
        size: pageSize,
      }),
  });

  const {
    mutateAsync: changeStatusAsync,
    isSuccess: isSuccessChangeStatus,
    isError: isErrorChangeStatus,
    error: errorChangeStatus,
    data: dataChangeStatus,
    isPending: isPendingChangeStataus,
  } = useMutation({
    mutationFn:
      PatientClinicPaymentMethodControllerService.putApiMasterPatientClinicPaymentMethodByPaymentMethodIdStatusByStatus,
  });

  const {
    mutateAsync: archiveRestoreAsync,
    isSuccess: isSuccessArchiveRestore,
    isError: isErrorArchiveRestore,
    error: errorArchiveRestore,
    data: dataArchiveRestore,
    isPending: isPendingArchiveRestore,
  } = useMutation({
    mutationFn:
      PatientClinicPaymentMethodControllerService.putApiMasterPatientClinicPaymentMethodByPaymentMethodIdArchiveStatusByStatus,
  });

  const {
    mutateAsync: setPrimaryAsync,
    isSuccess: isSuccessSetPrimary,
    isError: isErrorSetPrimary,
    error: errorSetPrimary,
    data: dataSetPrimary,
    isPending: isPendingSetPrimary,
  } = useMutation({
    mutationFn:
      PatientClinicPaymentMethodControllerService.putApiMasterPatientClinicPaymentMethodByPaymentMethodIdDefault,
  });

  const handleChangeStatus = (rowData: any) => {
    setCardToChangeStatus(rowData);
    setIsStatusConfirmOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    try {
      if (!cardToChangeStatus) return;

      await changeStatusAsync({
        paymentMethodId: cardToChangeStatus?.uuid,
        status: !cardToChangeStatus?.active,
      });
      refetch();
      setIsStatusConfirmOpen(false);
      setCardToChangeStatus(null);
    } catch (error) {
      console.error('Error changing payment method status:', error);
      setIsStatusConfirmOpen(false);
      setCardToChangeStatus(null);
    }
  };

  const handleCancelStatusChange = () => {
    setIsStatusConfirmOpen(false);
    setCardToChangeStatus(null);
  };

  const handleSetPrimary = (rowData: any) => {
    setCardToSetPrimary(rowData);
    setIsPrimaryConfirmOpen(true);
  };

  const handleConfirmSetPrimary = async () => {
    try {
      if (!cardToSetPrimary?.uuid) return;

      await setPrimaryAsync({
        paymentMethodId: cardToSetPrimary?.uuid,
      });
      refetch();
      setIsPrimaryConfirmOpen(false);
      setCardToSetPrimary(null);
    } catch (error) {
      console.error('Error setting card as primary:', error);
      setIsPrimaryConfirmOpen(false);
      setCardToSetPrimary(null);
    }
  };

  const handleCancelSetPrimary = () => {
    setIsPrimaryConfirmOpen(false);
    setCardToSetPrimary(null);
  };

  const handleArchive = (rowData: any) => {
    setCardToArchive(rowData);
    setIsArchiveConfirmOpen(true);
  };

  const handleConfirmArchive = async () => {
    try {
      if (!cardToArchive) return;

      await archiveRestoreAsync({
        paymentMethodId: cardToArchive?.uuid,
        status: cardToArchive?.archive ? false : true,
      });
      refetch();
      setIsArchiveConfirmOpen(false);
      setCardToArchive(null);
    } catch (error) {
      console.error('Error archiving payment method:', error);
      setIsArchiveConfirmOpen(false);
      setCardToArchive(null);
    }
  };

  const handleCancelArchive = () => {
    setIsArchiveConfirmOpen(false);
    setCardToArchive(null);
  };

  const handleTableAction = (action: string, rowData: any) => {
    if (action === 'archive') {
      handleArchive(rowData);
    } else if (action === 'restore') {
      handleArchive(rowData);
    } else if (action === 'changeStatus') {
      handleChangeStatus(rowData);
    } else if (action === 'setPrimary') {
      handleSetPrimary(rowData);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    refetch();
  };

  const headCells: Header[] = [
    { id: 'creditCard', label: paymentCardConstants.CREDIT_CARD, type:'card'},
    { id: 'expirationDate', label: paymentCardConstants.EXPIRATION_DATE },
    { id: 'status', label: paymentCardConstants.STATUS, type: 'chip' },
    { id: 'action', label: 'Action', type: 'actionButton' },
  ];

  // Transform data to include action buttons and styling
  const tableData = (patientClinicApiData?.data?.content as any[])?.map(card => ({
    ...card,
    creditCard: `${card?.cardBrand?.toUpperCase()} ****${card?.last4}`,
    expirationDate: `${String(card?.expMonth).padStart(2, '0')}/${card?.expYear}`,
    default: card?.default ? 'PRIMARY' : '',
    status: card?.active ? 'ACTIVE' : 'INACTIVE',
    action: card?.archive
      ? [{ label: 'Restore', route: 'archive' }]
      : [
          { label: 'Archive', route: 'archive' },
          { label: paymentCardConstants.CHANGE_STATUS, route: 'changeStatus' },
          ...(card?.default === false ? [{ label: 'Set as primary', route: 'setPrimary' }] : []),
        ],
  }));

  useEffect(() => {
    if (
      isLoading ||
      isFetching ||
      isPendingChangeStataus ||
      isPendingArchiveRestore ||
      isPendingSetPrimary
    ) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [
    isLoading,
    isFetching,
    isPendingChangeStataus,
    isPendingArchiveRestore,
    isPendingSetPrimary,
    dispatch,
  ]);

  useEffect(() => {
    setGlobalRefetchPaymentCardsFunction(() => {
      refetch();
    });
    return () => {
      setGlobalRefetchPaymentCardsFunction(() => {});
    };
  }, [refetch]);

  useApiFeedback(
    isErrorChangeStatus,
    errorChangeStatus,
    isSuccessChangeStatus,
    (dataChangeStatus?.message || paymentCardConstants.STATUS_CHANGES_SUCCSSFULLY) as string
  );

  useApiFeedback(
    isErrorArchiveRestore,
    errorArchiveRestore,
    isSuccessArchiveRestore,
    (dataArchiveRestore?.message || paymentCardConstants.OERATION_COM_SUCCSSFULLY) as string
  );

  useApiFeedback(
    isErrorSetPrimary,
    errorSetPrimary,
    isSuccessSetPrimary,
    (dataSetPrimary?.message || 'Card set as primary successfully') as string
  );

  return (
    <Box sx={{ p: 0, width: '100%' }}>
      <CustomisedTable
        headCells={headCells}
        tableData={tableData}
        noRecordsMsg={paymentCardConstants.NO_CARDS_FOUND}
        removeRadius={false}
        handleChangeStatus={handleChangeStatus}
        handleArchive={handleArchive}
        onActionItemSelect={handleTableAction}
        showPagination
        totalCount={(patientClinicApiData?.data?.page as any)?.totalElements || 0}
        currentPage={page + 1}
        itemsPerPage={pageSize}
        onPageChange={newPage => setPage(newPage - 1)}
        onItemsPerPageChange={handlePageSizeChange}
        hideBgColorPagination
        handleSetAsPrimary={handleSetPrimary}
      />

      <ConfirmationPopUp
        open={isArchiveConfirmOpen}
        onClose={handleCancelArchive}
        onConfirm={handleConfirmArchive}
        message={`Are you sure you want to ${cardToArchive?.archive ? 'restore' : 'archive'} this payment card?`}
      />

      <ConfirmationPopUp
        open={isStatusConfirmOpen}
        onClose={handleCancelStatusChange}
        onConfirm={handleConfirmStatusChange}
        message={`Are you sure you want to ${cardToChangeStatus?.active ? 'deactivate' : 'activate'} this payment card?`}
      />

      <ConfirmationPopUp
        open={isPrimaryConfirmOpen}
        onClose={handleCancelSetPrimary}
        onConfirm={handleConfirmSetPrimary}
        message={`Are you sure you want to set this card as primary?`}
      />
    </Box>
  );
}
