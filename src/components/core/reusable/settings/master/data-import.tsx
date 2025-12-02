import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CustomisedTable from '../../custom-table/custom-table';
import DataImportTooltip from './data-import-tooltip';

import { MigrationControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../headers/all-headers';

// Utility function to format date to mm-dd-yyyy, hh:mm AM/PM
const formatDateToMMDDYY = (dateString: string): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    // Format time to 12-hour format with AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${month}-${day}-${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if parsing fails
  }
};

let globalRefetchDataFunction: (() => void) | null = null;

export const setglobalRefetchDataFunction = (refetchFn: () => void) => {
  globalRefetchDataFunction = refetchFn;
};

export const getglobalRefetchDataFunction = () => globalRefetchDataFunction;

const DataImportSetting = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipAnchorEl, setTooltipAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedImportData, setSelectedImportData] = useState<any>(null);

  const { data: medicalCodesData, refetch: refetchMedicalCodes } = useQuery({
    queryKey: ['ProviderData', { pageSize, page }],
    queryFn: () =>
      MigrationControllerService.getApiMasterDataImport({
        page,
        size: pageSize,
      }),
  });

  const medicalCodeData = medicalCodesData?.data?.content || [];

  const tableData = Array.isArray(medicalCodeData)
    ? medicalCodeData?.map((medical: any) => {
        const mappedData = {
          // Only include specific fields we need
          type: medical?.type,
          uuid: medical?.uuid,
          createdDate: formatDateToMMDDYY(medical?.createdDateTime) || '',
          totalRecords: (medical?.passedRecords || 0) + (medical?.failedRecords || 0),
          passedRecords: medical?.passedRecords || 0,
          failedRecords: medical?.failedRecords || 0,
          userName: medical?.userName || 'N/A',
          fileUrl: medical?.fileUrl || null,
          // Keep other fields that might be needed
          code: medical?.code,
          description: medical?.description,
          status: medical?.active ?? false,
          codeStatus: medical?.status ? 'PROCESSED' : 'FAILED',
        };
        return mappedData;
      })
    : [];

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);

    MigrationControllerService.getApiMasterDataImport({
      page: 0,
      size: newPageSize,
    });
  };

  const handlePageChange = (newPage: number) => {
    const newPageIndex = newPage - 1;
    setPage(newPageIndex);

    MigrationControllerService.getApiMasterDataImport({
      page: newPageIndex,
      size: pageSize,
    });
  };

  const handleCloseTooltip = () => {
    setTooltipOpen(false);
    setTooltipAnchorEl(null);
    setSelectedImportData(null);
  };

  useEffect(() => {
    setglobalRefetchDataFunction(refetchMedicalCodes);
    return () => {
      setglobalRefetchDataFunction(() => {});
    };
  }, [refetchMedicalCodes]);

  const dataImportHeader: Header[] = [
    { id: 'createdDate', label: 'Import Initiated', type: 'text' },
    { id: 'type', label: 'Type', type: 'text' },
    { id: 'userName', label: 'User Name', type: 'text' },
    { id: 'totalRecords', label: 'Total Records', type: 'warning' },
  ];

  return (
    <Box paddingTop={2}>
      <CustomisedTable
        headCells={dataImportHeader}
        tableData={tableData}
        setHeight="70vh"
        removeRadius={false}
        showPagination
        totalCount={(medicalCodesData?.data?.page as any)?.totalElements || 0}
        currentPage={page + 1}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handlePageSizeChange}
        onWarningIconClick={(event: React.MouseEvent<HTMLElement>, rowData: any) => {
          setSelectedImportData({
            totalRecords: rowData.totalRecords,
            passedRecords: rowData.passedRecords,
            failedRecords: rowData.failedRecords,
            fileUrl: rowData.fileUrl,
          });
          setTooltipAnchorEl(event.currentTarget);
          setTooltipOpen(true);
        }}
      />

      <DataImportTooltip
        open={tooltipOpen}
        anchorEl={tooltipAnchorEl}
        onClose={handleCloseTooltip}
        data={selectedImportData}
      />
    </Box>
  );
};

export default DataImportSetting;
