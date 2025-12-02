import { useState } from 'react';
import { Box, Grid } from '@mui/material';

import BackArrowIcon from '@mui/icons-material/ArrowBack';
import { ePrescriptionConstants } from '../../../constants/dashboard-constants';
import { useNavigate } from 'react-router-dom';
import TabToggle from '../../../components/core/reusable/tab-toggle/tab-toggle';
// import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import CustomisedTable from '../../../components/core/reusable/custom-table/custom-table';
import { renewalRequestTableHeader } from '../../../components/core/reusable/headers/all-headers';
import {
  RENEWAL_REQUEST_MOCK_DATA,
  CHANGE_REQUEST_MOCK_DATA,
  CANCEL_REQUEST_MOCK_DATA,
  FILL_RESPONSES_MOCK_DATA,
  SEND_FAILURES_MOCK_DATA,
} from '../../../components/core/reusable/mock-data/all-mock-data';
import EPrescriptionDialog from '../../../components/core/dialog/e-prescription-dialog/ePrescriptionDialog';

const tabOptions = [
  { label: 'Renewal Requests', value: 'renewal-requests', count: 4 },
  { label: 'Change Requests', value: 'change-requests', count: 2 },
  { label: 'Cancel Requests', value: 'cancel-requests', count: 4 },
  { label: 'Fill Responses', value: 'fill-responses', count: 2 },
  { label: 'Send Failures', value: 'send-failures', count: 4 },
];

const EPrescription = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('renewal-requests');
  const [dialogTitle, setDialogTitle] = useState('');

  const [renewalrequestTableData] = useState(
    RENEWAL_REQUEST_MOCK_DATA.map(patient => ({
      ...patient,
      action: 'view',
    }))
  );
  const [changerequestTableData] = useState(
    CHANGE_REQUEST_MOCK_DATA.map(patient => ({
      ...patient,
      action: 'view',
    }))
  );

  const [cancelRequestTableData] = useState(
    CANCEL_REQUEST_MOCK_DATA.map(patient => ({
      ...patient,
      action: 'view',
    }))
  );

  const [fillResponseTableData] = useState(
    FILL_RESPONSES_MOCK_DATA.map(patient => ({
      ...patient,
      action: 'view',
    }))
  );
  const [sendFailureTableData] = useState(
    SEND_FAILURES_MOCK_DATA.map(patient => ({
      ...patient,
      action: 'view',
    }))
  );

  const handleBackArrow = () => {
    navigate('/dashboard');
  };

  const handleLabDialog = (row: any) => {
    setSelectedRow(row);
    if (selectedTab === 'renewal-requests') {
      setDialogTitle('Renewal Request Details');
    } else if (selectedTab === 'change-requests') {
      setDialogTitle('Change Request Details');
    } else if (selectedTab === 'cancel-requests') {
      setDialogTitle('Cancel Request Details');
    } else if (selectedTab === 'fill-responses') {
      setDialogTitle('Fill Response Details');
    } else if (selectedTab === 'send-failures') {
      setDialogTitle('Send Failure Details');
    } else {
      setDialogTitle('');
    }
    setOpenDialog(true);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: 'Neutral.20' }}>
      <Box sx={{ backgroundColor: 'Base.white', padding: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BackArrowIcon onClick={handleBackArrow} cursor="pointer" />
            {ePrescriptionConstants.EPRESCRIPTION_REQUEST}
          </Grid>
        </Grid>

        <TabToggle value={selectedTab} onChange={setSelectedTab} options={tabOptions} />
        {selectedTab === 'renewal-requests' ? (
          <CustomisedTable
            headCells={renewalRequestTableHeader}
            tableData={renewalrequestTableData}
            onActionClick={handleLabDialog}
          />
        ) : selectedTab === 'change-requests' ? (
          <CustomisedTable
            headCells={renewalRequestTableHeader}
            tableData={changerequestTableData}
            onActionClick={handleLabDialog}
          />
        ) : selectedTab === 'cancel-requests' ? (
          <CustomisedTable
            headCells={renewalRequestTableHeader}
            tableData={cancelRequestTableData}
            onActionClick={handleLabDialog}
          />
        ) : selectedTab === 'fill-responses' ? (
          <CustomisedTable
            headCells={renewalRequestTableHeader}
            tableData={fillResponseTableData}
            onActionClick={handleLabDialog}
          />
        ) : selectedTab === 'send-failures' ? (
          <CustomisedTable
            headCells={renewalRequestTableHeader}
            tableData={sendFailureTableData}
            onActionClick={handleLabDialog}
          />
        ) : null}
      </Box>

      
        <EPrescriptionDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title={dialogTitle}
          dialogData={selectedRow}
        />

    </Box>
  );
};

export default EPrescription;
