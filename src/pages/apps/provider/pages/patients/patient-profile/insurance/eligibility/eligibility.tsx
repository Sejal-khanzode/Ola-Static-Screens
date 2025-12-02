import { Box, Typography } from '@mui/material';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { eligibilityHeader } from 'src/components/core/reusable/headers/all-headers';
import { EligibilityLables } from 'src/constants/setting-constants';

export default function Eligibility() {
  const MOCK_DATA = [
    {
      insurance: 'Active Coverage',
      clinician: 'Harryy',
      reqDate: 'Fri Nov 12 2021',
      insuranceType: 'Primary',
      noteType: 'SOAP',
      updatedDate: '10-21-1995',
      providerName: 'Jacob Jones',
      action: [{ label: 'View', route: 'view' }],
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
        {EligibilityLables.ELIGIBILITY}
      </Typography>
      <CustomisedTable
        setHeight="80vh"
        headCells={eligibilityHeader}
        tableData={MOCK_DATA}
        noRecordsMsg={EligibilityLables.NO_INSURANCE_FOUND}
        showPagination
      />
    </Box>
  );
}
