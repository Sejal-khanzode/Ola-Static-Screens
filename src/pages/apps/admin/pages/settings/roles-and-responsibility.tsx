import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CustomisedTable from "../../../../../components/core/reusable/custom-table/custom-table";
import { profileRoleHeader } from "../../../../../components/core/reusable/headers/all-headers";
import { PROFILE_ROLES_SETTING_MOCK_DATA } from "../../../../../components/core/reusable/mock-data/all-mock-data";
import { settingConstants } from "../../../../../constants/admin-constants";
;

const RolesAndResponsibity = () => {
  const [tableData] = useState(
    PROFILE_ROLES_SETTING_MOCK_DATA.map((row) => ({
      ...row,
      style: {
        "& td": {
          padding: "9px 16px",
        },
        ...(Object.keys(row).length === 1 && {
          backgroundColor: "#F4F4F4",
          "& td": {
            fontWeight: 500,
            padding: "9px 16px",
          },
          "& td:not(:first-of-type)": {
            visibility: "hidden",
            backgroundColor: "blue",
          },
        }),
      },
    }))
  );

  return (
    <Box sx={{ margin: 2, backgroundColor: 'Base.white', height: '92vh', borderRadius: 1.5 }}>
        <Stack p={2} >
        <Typography variant="titleBold4" color="Primary.main">
        {settingConstants.USERS}
      </Typography>
        </Stack>
    <Stack p={2} >
      
      <CustomisedTable
        headCells={profileRoleHeader}
        tableData={tableData}
        setHeight="75vh"
        removeRadius={false}
      />
      </Stack>
    </Box>
  );
};

export default RolesAndResponsibity;
