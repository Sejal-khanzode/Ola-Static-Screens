import { useCallback, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CustomisedTable from '../../../../../../components/core/reusable/custom-table/custom-table';
import { profileUserHeader } from '../../../../../../components/core/reusable/headers/all-headers';
import { UserControllerService } from 'src/sdk/requests';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import { User } from '../../../../../../sdk/requests/types.gen';
import { FilterType } from 'src/pages/apps/admin/pages/clinics/dashboard';
import { formatRoles } from '../provider-account/provider-profile/profile';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import { settingConstants } from 'src/constants/admin-constants';
import ViewUserDetails from 'src/pages/apps/admin/pages/settings/admin-users/view-user-details';

let globalRefetchPracticeUsersFunction: (() => void) | null = null;
let globalUserSearchString: string = '';
let globalUserStatusType: FilterType = 'All';

export const setglobalRefetchPracticeUsersFunction = (refetchFn: () => void) => {
  globalRefetchPracticeUsersFunction = refetchFn;
};

export const getglobalRefetchPracticeUsersFunction = () => globalRefetchPracticeUsersFunction;

export const setGlobalUserSearchAndStatus = (search: string, status: FilterType) => {
  globalUserSearchString = search;
  globalUserStatusType = status;
};

export const getGlobalUserSearchAndStatus = () => ({
  searchString: globalUserSearchString,
  statusType: globalUserStatusType,
});

const UserSetting = () => {
  const clinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [localStorageVersion, setLocalStorageVersion] = useState(0);
  const dispatch = useDispatch();
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const {
    mutateAsync: getUserDetails,
    data: userDetailsData,
    isPending,
  } = useMutation({
    mutationFn: UserControllerService.getApiMasterUsers,
  });

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    getUserDetails({
      page: 0,
      size: newPageSize,
      searchString: '',
      status: true,
      clinicId: clinicId,
    });
  };

  const RefetchPracticeUsers = useCallback(() => {
    const { searchString: globalSearch, statusType: globalStatus } = getGlobalUserSearchAndStatus();

    let status = undefined;
    let archive = undefined;

    if (globalStatus === 'Active') {
      status = true;
      archive = false;
    } else if (globalStatus === 'Inactive') {
      status = false;
      archive = false;
    } else if (globalStatus === 'Archived') {
      status = undefined;
      archive = true;
    }

    // Search with the provided string (empty string will show all results)
    const searchString = globalSearch || '';

    getUserDetails({
      page: 0, // Reset to first page when filtering
      size: pageSize,
      searchString: searchString,
      status,
      archive,
      clinicId: clinicId || '',
    });

    // Update local page state
    setPage(0);
  }, [pageSize, getUserDetails, clinicId]);

  // Register the refetch function globally
  useEffect(() => {
    setglobalRefetchPracticeUsersFunction(RefetchPracticeUsers);
  }, [RefetchPracticeUsers]);

  // Listen for custom refetch events
  useEffect(() => {
    const handleRefetchEvent = () => {
      RefetchPracticeUsers();
    };

    window.addEventListener('refetchPracticeUsers', handleRefetchEvent);

    return () => {
      window.removeEventListener('refetchPracticeUsers', handleRefetchEvent);
    };
  }, [RefetchPracticeUsers]);

  useEffect(() => {
    let previousRole = getDataFromLocalStorage('role');
    let previousClinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

    const checkLocalStorageChanges = () => {
      const currentRole = getDataFromLocalStorage('role');
      const currentClinicId =
        getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

      if (currentRole !== previousRole || currentClinicId !== previousClinicId) {
        previousRole = currentRole;
        previousClinicId = currentClinicId;
        setLocalStorageVersion(prev => prev + 1);
      }
    };

    checkLocalStorageChanges();

    const interval = setInterval(checkLocalStorageChanges, 2000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'role' || e.key === 'selectedClinicUuid') {
        setLocalStorageVersion(prev => prev + 1);
      }
    };

    const handleCustomEvent = (e: CustomEvent) => {
      if (e.type === 'localStorageChanged') {
        setLocalStorageVersion(prev => prev + 1);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChanged', handleCustomEvent as EventListener);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChanged', handleCustomEvent as EventListener);
    };
  }, []);

  const handleView = (rowData: any) => {
    setIsViewMode(true);
    setSelectedUser(rowData);
  };

  useEffect(() => {
    getUserDetails({
      page: 0,
      size: 10,
      searchString: '',
      status: true,
      clinicId: clinicId,
    });
  }, [clinicId, localStorageVersion]);

  const userData = userDetailsData?.data?.content;
  const tableData = Array.isArray(userData)
    ? userData?.map((userData: User) => ({
        ...userData,
        name: `${userData?.firstName} ${userData?.lastName}`,
        email: userData?.email,
        contact: userData?.phone ? `${formatPhoneNumber(userData?.phone)}` : '',
        role: formatRoles((userData?.roles as any) || '-'),
        status: userData?.active ? 'ACTIVE' : 'INACTIVE',
      }))
    : [];

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending]);

  return (
    <Box paddingTop={2}>
      {clinicId === '' ? (
        <Grid display={'flex'} justifyContent={'center'}>
          <Typography variant="titleMedium3">No Users Associated</Typography>
        </Grid>
      ) : (
        !isPending && (
          <CustomisedTable
            headCells={profileUserHeader}
            tableData={tableData || []}
            setHeight="65vh"
            removeRadius={false}
            showPagination
            totalCount={(userDetailsData?.data?.page as any)?.totalElements || 0}
            currentPage={page + 1}
            itemsPerPage={pageSize}
            onPageChange={newPage => setPage(newPage - 1)}
            onItemsPerPageChange={handlePageSizeChange}
            handleView={handleView}
          />
        )
      )}

        <CustomDrawer
          title={settingConstants.VIEW_USER_DETAILS}
          anchor="right"
          open={isViewMode}
          onClose={() => {
            setIsViewMode(false);
            setSelectedUser(null);
          }}
          drawerPadding="18px"
        >
          {selectedUser && <ViewUserDetails dataView={selectedUser} />}
        </CustomDrawer>
    </Box>
  );
};

export default UserSetting;
