import { Grid } from '@mui/material';
import { useState } from 'react';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import {
  invoice
} from 'src/components/core/reusable/headers/all-headers';

const Invoice = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const mockData = [
    {
      invoiceDate: '11-30-2024',
      invoiceId: '4778',
      mrn: '44545',
      patientName: 'Ralph Edwards',
      encounterDate: '11-30-2024',
      billingProvider: 'Darrell Steward',
      amount: '$200',
      payment: '$200',
      due: '$0',
      status: 'PAID',
      action: [{ label: 'Change Status', route: 'edit' }],
    },
     {
      invoiceDate: '11-30-2024',
      invoiceId: '4778',
      mrn: '44545',
      patientName: 'Ralph Edwards',
      encounterDate: '11-30-2024',
      billingProvider: 'Darrell Steward',
      amount: '$200',
      payment: '$200',
      due: '$0',
      status: 'PENDING',
      action: [{ label: 'Change Status', route: 'edit' }],
    },
     {
      invoiceDate: '11-30-2024',
      invoiceId: '4778',
      mrn: '44545',
      patientName: 'Ralph Edwards',
      encounterDate: '11-30-2024',
      billingProvider: 'Darrell Steward',
      amount: '$200',
      payment: '$200',
      due: '$0',
      status: 'UNPAID',
      action: [{ label: 'Change Status', route: 'edit' }],
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
            headCells={invoice}
            tableData={mockData}
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

export default Invoice;
