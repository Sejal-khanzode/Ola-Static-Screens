import { Grid } from '@mui/material';
import { useState } from 'react';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import {
  claims,
} from 'src/components/core/reusable/headers/all-headers';

const Remits = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const mockData = [
    {
      claimId: '1454',
      billDate: '11-30-2024',
      dateOfService: '11-30-2024',
      patientName: 'Ralph Edwards',
      payerName: 'United Health',
      renderingProvider: 'Darrell Steward',
      insuranceAmt: '$200',
      patientAmt: '$200',
      updateOn: '11-30-2024',
      secClaim: 'ELIGIBLE',
      status:'Submitted',
      action: [
        { label: 'Change status', route: 'edit' },
        { label: 'Generate Secondary Claim', route: 'generate' },
        { label: 'Submit Claim', route: 'submit' },
        { label: 'Collect Payment', route: 'collect' },
        { label: 'Reconcile Claim', route: 'reconcile' },
      ],
    },
    {
      claimId: '1454',
      billDate: '11-30-2024',
      dateOfService: '11-30-2024',
      patientName: 'Ralph Edwards',
      payerName: 'United Health',
      renderingProvider: 'Darrell Steward',
      insuranceAmt: '$200',
      patientAmt: '$200',
      updateOn: '11-30-2024',
      secClaim: 'NOT_ELIGIBLE',
      status:'Rejected',
      action: [
        { label: 'Change status', route: 'edit' },
        { label: 'Generate Secondary Claim', route: 'generate' },
        { label: 'Submit Claim', route: 'submit' },
        { label: 'Collect Payment', route: 'collect' },
        { label: 'Reconcile Claim', route: 'reconcile' },
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
            headCells={claims}
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

export default Remits;
