import { Grid } from '@mui/material';
import { useState } from 'react';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { superbillHeader } from 'src/components/core/reusable/headers/all-headers';

const SuperBill = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const billingMockData = [
    {
      billDate: '11-30-2024',
      billId: '4778',
      dateOfService: '11-30-2024',
      patientName: 'Ralph Edwards',
      appointmentType: 'Follow Up',
      renderingProvider: 'Darrell Steward',
      totalAmount: '$200',
      insuranceBalance: '$200',
      patientPaid: '$200',
      patientBalance: '$0',

      status: 'PAID',
      action: [
        { label: 'Edit Bill', route: 'edit' },
        { label: 'Print Bill', route: 'print' },
        { label: 'Archive Bill', route: 'archive' },
        { label: 'Download Bill', route: 'download' },
        { label: 'View Ledger', route: 'view' },
      ],
    },
    {
      billDate: '11-30-2024',
      billId: '4778',
      dateOfService: '11-30-2024',
      patientName: 'Ralph Edwards',
      appointmentType: 'Follow Up',
      renderingProvider: 'Darrell Steward',
      totalAmount: '$200',
      insuranceBalance: '$200',
      patientPaid: '$200',
      patientBalance: '$0',

      status: 'READY_TO_CLAIM',
      action: [
        { label: 'Edit Bill', route: 'edit' },
        { label: 'Print Bill', route: 'print' },
        { label: 'Archive Bill', route: 'archive' },
        { label: 'Download Bill', route: 'download' },
        { label: 'View Ledger', route: 'view' },
      ],
    },
    {
      billDate: '11-30-2024',
      billId: '4778',
      dateOfService: '11-30-2024',
      patientName: 'Ralph Edwards',
      appointmentType: 'Follow Up',
      renderingProvider: 'Darrell Steward',
      totalAmount: '$200',
      insuranceBalance: '$200',
      patientPaid: '$200',
      patientBalance: '$0',

      status: 'UNPAID',
      action: [
        { label: 'Edit Bill', route: 'edit' },
        { label: 'Print Bill', route: 'print' },
        { label: 'Archive Bill', route: 'archive' },
        { label: 'Download Bill', route: 'download' },
        { label: 'View Ledger', route: 'view' },
      ],
    },
  ];

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  return (
    <>
      <Grid container gap={2}>
        <Grid size={12}>
          <CustomisedTable
            headCells={superbillHeader}
            tableData={billingMockData}
            showPagination
            totalCount={10}
            currentPage={page + 1}
            itemsPerPage={pageSize}
            onPageChange={newPage => setPage(newPage - 1)}
            onItemsPerPageChange={handlePageSizeChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SuperBill;
