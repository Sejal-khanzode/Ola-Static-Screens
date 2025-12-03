import { Grid } from '@mui/material';
import { useState } from 'react';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { remits } from 'src/components/core/reusable/headers/all-headers';

const Remits = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const mockData = [
    {
      era: 'REM4152',
      eraDate: '11-30-2024',
      eft: '#5454',
      eftDate: '11-30-2024',
      payer: 'United Health Care',
      amount: '1200',
      batchNo: '557701',
      action: [{ label: 'Download ERA', route: 'download' }],
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
            headCells={remits}
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
