import { Box, Grid, SelectChangeEvent, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import CommonTabs from 'src/components/core/reusable/common-tabs/common-tabs';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { clinicConstants, settingConstants } from 'src/constants/admin-constants';
import {
  getglobalRefetchClinicLocationsFunction,
  setGlobalLocationSearchAndStatus,
  setglobalRefetchClinicLocationsFunction,
} from 'src/pages/apps/admin/pages/clinics/clinic/clinic-locations';
import { ClinicControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { FilterType } from 'src/pages/apps/admin/pages/clinics/dashboard';
import { SearchIcon } from 'src/assets/icons/searchIcon';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { STATUS_OPTIONS } from 'src/pages/apps/admin/pages/settings/admin-users/admin-users';
import {
  getglobalRefetchPracticeUsersFunction,
  setglobalRefetchPracticeUsersFunction,
  setGlobalUserSearchAndStatus,
} from '../../pages/settings/practice/user';

const TabsConst = ['Profile', 'Location', 'Users', 'Print Configuration'];

export const PracticeRoutes = () => {
  const navigate = useNavigate();
  const clinicUuid = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '');
  const [statusTypeLoc, setStatusTypeLoc] = useState<FilterType>('All');
  const [searchStringLoc, setSearchStringLoc] = useState('');
  const [searchStringUser, setSearchStringUser] = useState('');
  const [statusType, setStatusType] = useState<FilterType>('All');

  const { mutateAsync: getClinicDetails } = useMutation({
    mutationFn: ClinicControllerService.getApiMasterClinicByClinicId,
  });

  useEffect(() => {
    if (clinicUuid) {
      getClinicDetails({ clinicId: clinicUuid });
    }
  }, [clinicUuid, getClinicDetails]);

  const tabItems =
    TabsConst?.map((label, index) => ({
      label,
      value: `tab-${index}`,
    })) || [];

  const returnIndex = () => {
    const pathSegments = location?.pathname?.split('/');
    const lastSegment = pathSegments?.[pathSegments.length - 1];
    const secondLastSegment = pathSegments?.[pathSegments.length - 2];

    if (secondLastSegment === 'profile') {
      return 0;
    } else if (lastSegment === 'location') {
      return 1;
    } else if (lastSegment === 'users') {
      return 2;
    } else if (lastSegment === 'print-config') {
      return 3;
    } else {
      return 0;
    }
  };

  const [value, setValue] = useState(returnIndex());

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate(`profile`);
        break;
      case 1:
        navigate(`location`);
        break;
      case 2:
        navigate(`users`);
        break;
      case 3:
        navigate(`print-config`);
        break;
    }
    setValue(newValue);
  };

  const handleBackToDashboard = () => {
    navigate('/provider/settings');
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
        setTimeout(() => {
          refetchFunction();
        }, 300);
      }
    }
  };

  const handleSearchStringUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value.length > 2 ? e.target.value : '';
    setSearchStringUser(newSearchString);

    // Set global search and status values for users
    setGlobalUserSearchAndStatus(newSearchString, statusType);

    // Trigger refetch when search string changes (with debouncing)
    if (value === 2) {
      const refetchFunction = getglobalRefetchPracticeUsersFunction();
      if (refetchFunction) {
        setTimeout(() => {
          refetchFunction();
        }, 300);
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

  const handleStatusChangeUser = (event: SelectChangeEvent<string>) => {
    const statusValue = event.target.value as FilterType;
    setStatusType(statusValue);

    // Set global search and status values for users
    setGlobalUserSearchAndStatus(searchStringUser, statusValue);

    // Trigger refetch when status type changes
    if (value === 2) {
      const refetchFunction = getglobalRefetchPracticeUsersFunction();
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

  useEffect(() => {
    if (value === 2) {
      setglobalRefetchPracticeUsersFunction(() => {
        window.dispatchEvent(new CustomEvent('refetchPracticeUsers'));
      });
      setGlobalUserSearchAndStatus(searchStringUser, statusType);
    } else {
      setglobalRefetchPracticeUsersFunction(() => {});
    }
  }, [value, searchStringUser, statusType]);

  return (
    <Box>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid
          size={12}
          alignItems={'center'}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'space-between',
          }}
        >
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Box onClick={handleBackToDashboard} sx={{ cursor: 'pointer' }}>
              <BackArrowIcon color="Primary.main" />
            </Box>
            <Typography variant="bodyRegular3">{settingConstants.PRACTICE}</Typography>
          </Box>
        </Grid>
        <Grid pt={1} pb={1}>
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
          {value === 1 && (
            <Grid size={12}>
              <Grid size={12} display={'flex'} flexDirection={'row'} gap={2} alignItems={'end'}>
                <Grid size={5}></Grid>
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
                <Grid size={3}>
                  <CustomLabel label={clinicConstants.STATUS} />
                  <CustomSelect
                    name="statusType"
                    placeholder={settingConstants.STATUS}
                    value={statusTypeLoc}
                    onChange={handleStatusChangeLoc}
                    items={STATUS_OPTIONS}
                    bgWhite
                  />
                </Grid>
              </Grid>
            </Grid>
          )}

          {value === 2 && (
            <Grid size={12}>
              <Grid size={12} display={'flex'} flexDirection={'row'} gap={2} alignItems={'end'}>
                <Grid size={5}></Grid>
                <Grid size={4}>
                  <CustomInput
                    placeholder={settingConstants.SEARCH_USER}
                    value={searchStringUser}
                    onChange={handleSearchStringUser}
                    showIcon={<SearchIcon />}
                    name="search"
                    bgWhite
                  />
                </Grid>
                <Grid size={3}>
                  <CustomLabel label={settingConstants.STATUS} />
                  <CustomSelect
                    name="statusType"
                    placeholder={settingConstants.STATUS}
                    value={statusType}
                    onChange={handleStatusChangeUser}
                    items={STATUS_OPTIONS}
                    bgWhite
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
