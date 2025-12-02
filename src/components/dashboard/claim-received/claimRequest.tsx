import { useState } from 'react';
import { Box, Grid } from '@mui/material';

import BackArrowIcon from '@mui/icons-material/ArrowBack';
import {ePrescriptionConstants} from "../../../constants/dashboard-constants"
import { useNavigate } from 'react-router-dom';
import TabToggle from '../../../components/core/reusable/tab-toggle/tab-toggle';
import CustomisedTable from '../../../components/core/reusable/custom-table/custom-table';
import { labResultTableHeader} from "../../../components/core/reusable/headers/all-headers";
import { RESULT_AVAILABLE_MOCK_DATA , PENDING_MOCK_DATA, RESENT_SIGNED_MOCK_DATA, UNMATCHED_MOCK_DATA} from '../../../components/core/reusable/mock-data/all-mock-data';

const tabOptions = [
    { label: 'Result Available', value: 'result-available', count: 4 },
    { label: 'Pending', value: 'pending', count: 2 },
    { label: 'Recently Signed', value: 'resently-signed', count: 5 },
    { label: 'Unmatched', value: 'unmatched', count: 1 },
  ];


const ClaimReceived = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('result-available');

  const [resultAvailableTableData] = useState(
    RESULT_AVAILABLE_MOCK_DATA.map(patient => ({
      ...patient,
       action:'Review'
    }))
  );
  const [pendingTableData] = useState(
    PENDING_MOCK_DATA.map(patient => ({
      ...patient,
       action:'Open'
    }))
  );

  const [resentSignedTableData] = useState(
    RESENT_SIGNED_MOCK_DATA.map(patient => ({
      ...patient,
       action:'View'
    }))
  );

  const [unmatchedTableData] = useState(
    UNMATCHED_MOCK_DATA.map(patient => ({
      ...patient,
       action:'View'
    }))
  );
 

  const handleBackArrow = () => {
    navigate('/dashboard');
  }

  return (
    <Box sx={{ padding: 2, backgroundColor: 'Neutral.20' }}>
      <Box sx={{backgroundColor:'Base.white', padding:2}}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BackArrowIcon onClick={handleBackArrow} cursor='pointer'/>
          {ePrescriptionConstants.EPRESCRIPTION_REQUEST}
        </Grid>
      </Grid>

      <TabToggle value={selectedTab} onChange={setSelectedTab} options={tabOptions} />
      {selectedTab === 'result-available' ? (
        <CustomisedTable headCells={labResultTableHeader} tableData={resultAvailableTableData} />
      ) : selectedTab === 'pending' ? (
        <CustomisedTable headCells={labResultTableHeader} tableData={pendingTableData} />
      ) : selectedTab === 'resently-signed' ? (
        <CustomisedTable headCells={labResultTableHeader} tableData={resentSignedTableData} />
      ) : selectedTab === 'unmatched' ? (
        <CustomisedTable headCells={labResultTableHeader} tableData={unmatchedTableData} />
      ) : null}
          </Box>
          </Box>
  );
};

export default ClaimReceived;
