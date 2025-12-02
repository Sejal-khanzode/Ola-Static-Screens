import { Box, Grid, Typography, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from 'src/assets/icons/addIcon';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CommonTabs from 'src/components/core/reusable/common-tabs/common-tabs';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import AdminAddIcd10Dialog from 'src/components/core/reusable/settings/master/admin-add-icd-10-dialog';
import AdminAddCptDialog from 'src/components/core/reusable/settings/master/admin-add-cpt-dialog';
import {
  getglobalRefetchCPTFunction,
  setGlobalCPTSearchAndStatus,
} from 'src/components/core/reusable/settings/master/cpt-code';
import {
  getglobalRefetchICDFunction,
  setGlobalICDSearchAndStatus,
} from 'src/components/core/reusable/settings/master/icd-code';
import { clinicConstants, settingConstants } from 'src/constants/admin-constants';
import { AdminUploadDataDialog } from 'src/components/core/reusable/settings/master/admin-upload-data-dialog';
import { getglobalRefetchDataFunction } from 'src/components/core/reusable/settings/master/data-import';
import { masterSettingConstants } from 'src/constants/setting-constants';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import { FilterType } from '../pages/clinics/dashboard';
import SearchIcon from '@mui/icons-material/Search';
import { CodeList } from 'src/constants/formConst';

export const AdmintabsConst = ['Data Import', 'ICD 10 Code', 'Procedure Code'];
export const STATUS_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export const AdminPortalMaster = () => {
  const navigate = useNavigate();
  const [openAddICDDialog, setOpenAddICDDialog] = useState(false);
  const [openAddCPTDialog, setOpenAddCPTDialog] = useState(false);
  const [openAddUploadDialog, setOpenAddUploadDialog] = useState(false);
  const [searchStringICD, setSearchStringICD] = useState('');
  const [statusType, setStatusType] = useState<FilterType>('All');

  const [searchStringCPT, setSearchStringCPT] = useState('');
  const [statusTypeCPT, setStatusTypeCPT] = useState<FilterType>('All');
  const [codeTypeCPT, setCodeTypeCPT] = useState('CPT');

  const tabItems =
    AdmintabsConst?.map((label, index) => ({
      label,
      value: `tab-${index}`,
    })) || [];
  const returnIndex = () => {
    const pathSegments = location?.pathname?.split('/');
    const lastSegment = pathSegments?.[pathSegments.length - 1];
    const secondLastSegment = pathSegments?.[pathSegments.length - 2];

    if (secondLastSegment === 'data-import') {
      return 0;
    } else if (lastSegment === 'icd-10-code') {
      return 1;
    } else if (lastSegment === 'procedure-code') {
      return 2;
    } else {
      return 0;
    }
  };

  const [value, setValue] = useState(returnIndex());

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate(`data-import`);
        break;
      case 1:
        navigate(`icd-10-code`);
        break;
      case 2:
        navigate(`procedure-code`);
        break;
    }
    setValue(newValue);
  };

  const handleCloseICDDialog = () => {
    setOpenAddICDDialog(false);
    const refetchFunction = getglobalRefetchICDFunction();
    if (refetchFunction) {
      refetchFunction();
    }
  };

  const handleCloseCPTDialog = () => {
    setOpenAddCPTDialog(false);
    const refetchFunction = getglobalRefetchCPTFunction();
    if (refetchFunction) {
      refetchFunction();
    }
  };

  const handleCloseDataDialog = () => {
    setOpenAddUploadDialog(false);
    const refetchFunction = getglobalRefetchDataFunction();
    if (refetchFunction) {
      refetchFunction();
    }
  };

  const handleSearchStringICD = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value.length > 2 ? e.target.value : '';
    setSearchStringICD(newSearchString);

    // Set global search and status values for ICD
    setGlobalICDSearchAndStatus(newSearchString, statusType);

    // Trigger refetch in icd-code.tsx when search string changes
    if (value === 1) {
      const refetchFunction = getglobalRefetchICDFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleStatusChangeLoc = (event: SelectChangeEvent<string>) => {
    const statusValue = event.target.value as FilterType;
    setStatusType(statusValue);

    // Set global search and status values for ICD
    setGlobalICDSearchAndStatus(searchStringICD, statusValue);

    // Trigger refetch in icd-code.tsx when status type changes
    if (value === 1) {
      const refetchFunction = getglobalRefetchICDFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleSearchStringCPT = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value.length > 2 ? e.target.value : '';
    setSearchStringCPT(newSearchString);

    // Set global search and status values for CPT
    setGlobalCPTSearchAndStatus(newSearchString, statusTypeCPT, codeTypeCPT as 'CPT' | 'CUSTOM');

    // Trigger refetch in procedure-code.tsx when search string changes
    if (value === 2) {
      const refetchFunction = getglobalRefetchCPTFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleStatusChangeCPT = (event: SelectChangeEvent<string>) => {
    const statusValue = event.target.value as FilterType;
    setStatusTypeCPT(statusValue);

    // Set global search and status values for CPT
    setGlobalCPTSearchAndStatus(searchStringCPT, statusValue, codeTypeCPT as 'CPT' | 'CUSTOM');

    // Trigger refetch in procedure-code.tsx when status type changes
    if (value === 2) {
      const refetchFunction = getglobalRefetchCPTFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleStatusChangeCODE = (event: SelectChangeEvent<string>) => {
    const codeValue = event.target.value as 'CPT' | 'CUSTOM';
    setCodeTypeCPT(codeValue);

    // Set global search and status values for CPT
    setGlobalCPTSearchAndStatus(searchStringCPT, statusTypeCPT, codeValue);

    // Trigger refetch in procedure-code.tsx when code type changes
    if (value === 2) {
      const refetchFunction = getglobalRefetchCPTFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  return (
    <Box>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid
          size={12}
          alignItems={'center'}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Typography variant="bodyRegular3">{clinicConstants.MEDICAL_CODES}</Typography>
        </Grid>
        <Grid pt={2.6} display={'flex'} alignItems={'end'}>
          <CommonTabs
            tabItems={tabItems}
            tabValue={value}
            onTabValueChange={(newValue: number) =>
              handleChange({} as React.SyntheticEvent, newValue)
            }
            onTabChange={(newValue: number) => handleChange({} as React.SyntheticEvent, newValue)}
          />
        </Grid>

        <Grid size={8}>
          {value === 0 && (
            <Grid size={12} display="flex" justifyContent={'end'}  pt={2.6}>
              <CustomButton
                variant="filled"
                startIcon={<FileUploadOutlinedIcon />}
                onClick={() => setOpenAddUploadDialog(true)}
                label={settingConstants.UPLOAD_DATA}
              />
            </Grid>
          )}

          {value === 1 && (
            <Grid
              container
              display={'flex'}
              flexDirection={'row'}
              gap={2}
              justifyContent={'end'}
              alignItems={'end'}
            >
              <Grid size={3}>
                <CustomInput
                  placeholder={settingConstants.ADMIN_MASTER_TAB_SEARCH_PLACEHOLDER}
                  value={searchStringICD}
                  onChange={handleSearchStringICD}
                  name="search"
                  showIcon={<SearchIcon />}
                  bgWhite
                />
              </Grid>
              <Grid size={1.5}>
                <CustomLabel label={clinicConstants.STATUS} />
                <CustomSelect
                  name="statusType"
                  placeholder={'Status'}
                  value={statusType}
                  onChange={handleStatusChangeLoc}
                  items={STATUS_OPTIONS}
                  backgroundColor="white"
                />
              </Grid>
              <Grid>
                <CustomButton
                  variant="filled"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenAddICDDialog(true)}
                  label={masterSettingConstants.ADD_ICD_10_CODE}
                />
              </Grid>
            </Grid>
          )}

          {value === 2 && (
            <Grid
              container
              display={'flex'}
              flexDirection={'row'}
              gap={2}
              alignItems={'end'}
              justifyContent={'end'}
            >
              <Grid size={3}>
                <CustomInput
                  placeholder={settingConstants.ADMIN_MASTER_TAB_SEARCH_PLACEHOLDERS_CPT}
                  value={searchStringCPT}
                  onChange={handleSearchStringCPT}
                  name="search"
                  showIcon={<SearchIcon />}
                  bgWhite
                />
              </Grid>
              <Grid size={2}>
                <CustomLabel label={'Type'} />
                <CustomSelect
                  name="codeTypeCPT"
                  placeholder={'Status'}
                  value={codeTypeCPT}
                  onChange={handleStatusChangeCODE}
                  items={CodeList}
                  backgroundColor="white"
                />
              </Grid>
              <Grid size={1.5}>
                <CustomLabel label={clinicConstants.STATUS} />
                <CustomSelect
                  name="statusType"
                  placeholder={'Status'}
                  value={statusTypeCPT}
                  onChange={handleStatusChangeCPT}
                  items={STATUS_OPTIONS}
                  backgroundColor="white"
                />
              </Grid>
              <Grid>
                <CustomButton
                  variant="filled"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenAddCPTDialog(true)}
                  label={masterSettingConstants.ADD_CPT_CODE}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid container>
        <CustomDrawer
          title={masterSettingConstants.ADD_ICD_10_CODE}
          open={openAddICDDialog}
          onClose={handleCloseICDDialog}
          anchor={'right'}
          drawerWidth="45vw"
          drawerPadding="18px"
        >
          <AdminAddIcd10Dialog
            refetch={() => {
              const refetchFunction = getglobalRefetchICDFunction();
              if (refetchFunction) {
                refetchFunction();
              }
            }}
            onClose={handleCloseICDDialog}
          />
        </CustomDrawer>

        <CustomDrawer
          title={masterSettingConstants.ADD_CPT_CODE}
          open={openAddCPTDialog}
          onClose={handleCloseCPTDialog}
          anchor={'right'}
          drawerWidth="45vw"
          drawerPadding="18px"
        >
          <AdminAddCptDialog
            refetch={() => {
              const refetchFunction = getglobalRefetchCPTFunction();
              if (refetchFunction) {
                refetchFunction();
              }
            }}
            onClose={handleCloseCPTDialog}
          />
        </CustomDrawer>

        <CustomDrawer
          title={settingConstants.UPLOAD_IMPORT}
          open={openAddUploadDialog}
          onClose={handleCloseDataDialog}
          anchor={'right'}
          drawerWidth="35vw"
          drawerPadding="18px"
        >
          <AdminUploadDataDialog
            refetchDataImport={() => {
              const refetchFunction = getglobalRefetchDataFunction();
              if (refetchFunction) {
                refetchFunction();
              }
            }}
            onClose={handleCloseDataDialog}
          />
        </CustomDrawer>
      </Grid>
    </Box>
  );
};
