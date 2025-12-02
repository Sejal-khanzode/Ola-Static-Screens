import { useState } from 'react';
import { Box } from '@mui/material';
import { colorConfigurationHeader } from 'src/components/core/reusable/headers/all-headers';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { APT_COLOR_CONFIGURATION_SETTING_MOCK_DATA } from 'src/components/core/reusable/mock-data/all-mock-data';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import EditColorConfig from './edit-color-config';
import { settingsConstants } from 'src/constants/setting-constants';

const ColorConfiguration = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const [TableData] = useState(
    APT_COLOR_CONFIGURATION_SETTING_MOCK_DATA.map(data => ({
      ...data,
      action: [{ label: 'Edit', route: 'edit' }],
    }))
  );

  const handleEdit = (data: any) => {
    setSelectedData(data);
    setIsEditMode(true);
  };

  const handleCloseFlagDialog = () => {
    setIsEditMode(false);
  };

  return (
    <Box paddingTop={2}>
      <CustomisedTable
        headCells={colorConfigurationHeader}
        tableData={TableData}
        setHeight="70vh"
        removeRadius={false}
        handleEdit={handleEdit}
      />

      <CustomDrawer
        title={settingsConstants.EDIT_COLOR_CONFIG}
        open={isEditMode}
        onClose={handleCloseFlagDialog}
        anchor={'right'}
        drawerWidth="35vw"
        drawerPadding="18px"
      >
        <EditColorConfig
          onClose={handleCloseFlagDialog}
          isEdit={isEditMode}
          editData={selectedData}
        />
      </CustomDrawer>
    </Box>
  );
};

export default ColorConfiguration;
