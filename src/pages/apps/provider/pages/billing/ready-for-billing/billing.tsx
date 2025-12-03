import { Grid } from '@mui/material';
import { useState } from 'react';
import { SearchIcon } from 'src/assets/icons/searchIcon';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { readyForBillingHeader } from 'src/components/core/reusable/headers/all-headers';

const Billing = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [, setSearchText] = useState('');

  const billingMockData = [
    {
      dateOfService: '2020-07-15',
      patientName: 'Ralph Edwards',
      appointmentType: 'Follow Up',
      renderingProvider: 'Darrell Steward',
      location: 'Location 1',
      status: 'BILLING_SELF_PAY',
      action: [
        { label: 'Generate Superbill', route: 'edit' },
        { label: 'Change Status', route: 'archive' },
        { label: 'View Summary', route: 'view' },
      ],
    },
    {
      dateOfService: '2020-07-15',
      patientName: 'Ralph Edwards',
      appointmentType: 'Follow Up',
      renderingProvider: 'Darrell Steward',
      location: 'Location 1',
      status: 'BILLABLE_INSURANCE',
      action: [
        { label: 'Generate Superbill', route: 'edit' },
        { label: 'Change Status', route: 'archive' },
        { label: 'View Summary', route: 'view' },
      ],
    },
    {
      dateOfService: '2020-07-15',
      patientName: 'Ralph Edwards',
      appointmentType: 'Follow Up',
      renderingProvider: 'Darrell Steward',
      location: 'Location 1',
      status: 'NON_BILLABLE',
      action: [
        { label: 'Generate Superbill', route: 'edit' },
        { label: 'Change Status', route: 'archive' },
        { label: 'View Summary', route: 'view' },
      ],
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      setSearchText(e.target.value);
      setPage(0);
    } else if (e.target.value === '') {
      setSearchText('');
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
  };

  return (
    <>
      <Grid container gap={2}>
        <Grid size={12} sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
          <Grid size={1.5}>
            <CustomLabel label="Date of Service" />
            <CustomDatePicker value={''} handleDateChange={() => {}} bgWhite/>
          </Grid>
          <Grid size={2}>
            <CustomLabel label="Patient Name" />
            <CustomInput
              bgWhite
              placeholder="Search by Patient Name"
              showIcon={<SearchIcon />}
              onChange={handleSearch}
            />
          </Grid>
          <Grid size={2}>
            <CustomLabel label="Provider Name" />
            <CustomInput
              bgWhite
              placeholder="Search by provider Name"
              showIcon={<SearchIcon />}
              onChange={handleSearch}
            />{' '}
          </Grid>
        </Grid>
        <Grid size={12}>
          <CustomisedTable
            headCells={readyForBillingHeader}
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

export default Billing;
