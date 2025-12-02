import { Grid, Box, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomDrawer from '../../../../../components/core/reusable/custom-drawer/custom-drawer';
import ClinicForm from '../../../../../pages/apps/admin/pages/clinics/clinic/new-clinic/new-clinic';
import { EditIcon } from '../../../../../assets/icons/editIcon';
import { AddIcon } from '../../../../../assets/icons/addIcon';
import LocationForm from '../../pages/clinics/clinic/new-location/new-location';
import CommonTabs from '../../../../../components/core/reusable/common-tabs';
import CustomButton from '../../../../../components/core/reusable/custom-button/custom-button';
import { useAppSelector } from '../../../../../redux/hooks';

import {
  getglobalRefetchClinicLocationsFunction,
  setglobalRefetchClinicLocationsFunction,
  setGlobalLocationSearchAndStatus,
} from '../../pages/clinics/clinic/clinic-locations';
import { getGlobalRefetchClinicDetailsFunction } from '../../pages/clinics/clinic/clinic-details';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { clinicConstants, settingConstants } from 'src/constants/admin-constants';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import { FilterType } from '../../pages/clinics/dashboard';
import { STATUS_OPTIONS } from '../../pages/settings/admin-users/admin-users';
import { SearchIcon } from 'src/assets/icons/searchIcon';

const TabsForAdminSettings = () => {
  const tabValuesData = ['Profile', 'Locations'];
  const location = useLocation();
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const [openAddLocationDialog, setOpenAddLocationDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [statusTypeLoc, setStatusTypeLoc] = useState<FilterType>('All');
  const [searchStringLoc, setSearchStringLoc] = useState('');

  const selectedClinic = useAppSelector((state: any) => state.clinicReducer?.data);

  const returnIndex = () => {
    const pathSegments = location?.pathname?.split('/');
    const secondLastSegment = pathSegments?.[pathSegments.length - 2];

    if (secondLastSegment === 'profile') {
      return 0;
    } else if (secondLastSegment === 'locations') {
      return 1;
    } else {
      return 0;
    }
  };

  const [value, setValue] = useState(returnIndex());

  useEffect(() => {
    const pathSegments = location?.pathname?.split('/');
    const secondLastSegment = pathSegments?.[pathSegments.length - 2];

    if (secondLastSegment === 'profile') {
      setValue(0);
    } else if (secondLastSegment === 'locations') {
      setValue(1);
    }
  }, [location?.pathname]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate(`profile/${uuid}`);
        break;
      case 1:
        navigate(`locations/${uuid}`);
        break;
    }
    setValue(newValue);
  };

  const handleSearchStringLoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value.length > 2 ? e.target.value : '';
    setSearchStringLoc(newSearchString);

    // Set global search and status values for locations
    setGlobalLocationSearchAndStatus(newSearchString, statusTypeLoc);

    // Trigger refetch in clinic-locations.tsx when search string changes
    if (value === 1) {
      const refetchFunction = getglobalRefetchClinicLocationsFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleStatusChangeLoc = (event: SelectChangeEvent<string>) => {
    const statusValue = event.target.value as FilterType;
    setStatusTypeLoc(statusValue);

    // Set global search and status values for locations
    setGlobalLocationSearchAndStatus(searchStringLoc, statusValue);

    // Trigger refetch in clinic-locations.tsx when status type changes
    if (value === 1) {
      const refetchFunction = getglobalRefetchClinicLocationsFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleEditClinic = () => {
    setOpenEditProfileDialog(true);
    setIsEditMode(true);
    if (value === 0) {
      const refetchFunction = getGlobalRefetchClinicDetailsFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  // Set up global refetch function when Locations tab is active
  useEffect(() => {
    if (value === 1) {
      // Locations tab is active
      setglobalRefetchClinicLocationsFunction(() => {
        // Dispatch a custom event to trigger refetch in clinic-locations.tsx
        window.dispatchEvent(new CustomEvent('refetchClinicLocations'));
      });
      // Initialize global search and status values for locations
      setGlobalLocationSearchAndStatus(searchStringLoc, statusTypeLoc);
    } else {
      setglobalRefetchClinicLocationsFunction(() => {});
    }
  }, [value, searchStringLoc, statusTypeLoc]);

  const tabItems =
    tabValuesData?.map((label, index) => ({
      label,
      value: `tab-${index}`,
    })) || [];

  return (
    <Box>
      <Grid
        container
        mt={value === 0 ? 2 : 0}
        sx={{ display: 'flex', justifyContent: 'space-between', width: '99vw', alignItems: 'end' }}
      >
        <Grid>
          <CommonTabs
            tabItems={tabItems}
            tabValue={value}
            onTabValueChange={(newValue: number) =>
              handleChange({} as React.SyntheticEvent, newValue)
            }
            onTabChange={(newValue: number) => handleChange({} as React.SyntheticEvent, newValue)}
          />
        </Grid>

        <Grid size={6}>
          {value === 0 && (
            <Grid
              size={12}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'end'}
              justifyContent={'flex-end'}
            >
              <Grid size={1.8}>
                <CustomButton
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEditClinic}
                  label={clinicConstants.EDIT_CLINIC}
                />
              </Grid>
            </Grid>
          )}
          {value === 1 && (
            <Grid size={12} display={'flex'} flexDirection={'row'} gap={2} alignItems={'end'}>
              <Grid size={3.5}></Grid>
              <Grid size={4}>
                <CustomInput
                  placeholder={settingConstants.SEARCH_BY_LOC_NAME}
                  value={searchStringLoc}
                  onChange={handleSearchStringLoc}
                  showIcon={<SearchIcon />}
                  name="search"
                  bgWhite
                />
              </Grid>
              <Grid size={4}>
                <CustomLabel label={clinicConstants.STATUS} />
                <CustomSelect
                  name="statusType"
                  placeholder={'Status'}
                  value={statusTypeLoc}
                  onChange={handleStatusChangeLoc}
                  items={STATUS_OPTIONS}
                  backgroundColor="white"
                />
              </Grid>
              <Grid size={2.5}>
                <CustomButton
                  variant="filled"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setOpenAddLocationDialog(true);
                    setIsEditMode(false);
                  }}
                  label="Add Location"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Box>
        <Grid size={12}>
          <CustomDrawer
            title={clinicConstants.EDIT_CLINIC}
            open={openEditProfileDialog}
            onClose={() => setOpenEditProfileDialog(false)}
            anchor="right"
            drawerPadding="12px"
          >
            <ClinicForm
              onClose={() => {
                setOpenEditProfileDialog(false);
                setIsEditMode(true);
                const refetchFunction = getGlobalRefetchClinicDetailsFunction();
                if (refetchFunction) {
                  refetchFunction();
                }
              }}
              RefetchClinicData={() => {
                const refetchFunction = getGlobalRefetchClinicDetailsFunction();
                if (refetchFunction) {
                  refetchFunction()
                }
              }}
              isEdit={isEditMode}
              uuid={selectedClinic?.uuid || ''}
            />
          </CustomDrawer>
        </Grid>
        <Grid size={12}>
          <CustomDrawer
            title="Add Location"
            open={openAddLocationDialog}
            onClose={() => setOpenAddLocationDialog(false)}
            anchor="right"
            drawerPadding="12px"
          >
            <LocationForm
              onClose={() => {
                setOpenAddLocationDialog(false);
                const refetchFunct = getglobalRefetchClinicLocationsFunction();
                if (refetchFunct) {
                  refetchFunct();
                }
              }}
              isEdit={false}
              RefetchLocationData={() => {
                const refetchFunct = getglobalRefetchClinicLocationsFunction();
                if (refetchFunct) {
                  refetchFunct();
                }
              }}
            />
          </CustomDrawer>
        </Grid>
      </Box>
    </Box>
  );
};

export default TabsForAdminSettings;
