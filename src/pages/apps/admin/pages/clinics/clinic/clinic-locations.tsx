import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import CustomDrawer from '../../../../../../components/core/reusable/custom-drawer/custom-drawer';
import ConfirmationPopUp from '../../../../../../components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { useMutation } from '@tanstack/react-query';
import {
  profileLocationHeader,
  profileLocationHeaderProvider,
} from '../../../../../../components/core/reusable/headers/all-headers';
import LocationForm from './new-location/new-location';
import useApiFeedback from '../../../../../../hooks/useApiFeedback';
import { useAppSelector } from '../../../../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { FilterType } from '../dashboard';
import ViewLocationDetails from './new-location/view-location-details';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import { Location, LocationControllerService } from 'src/sdk/requests';
import { getCountAndFormat } from 'src/utils/stringUtils';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import CustomisedTable from '../../../../../../components/core/reusable/custom-table/custom-table';
import { providerConstants } from 'src/constants/patients-constants';
import { locationConstants } from 'src/constants/admin-constants';
import useAuthority from 'src/hooks/use-authority';

// Global state for location search and status
let globalRefetchClinicLocationsFunction: (() => void) | null = null;
let globalLocationSearchString: string = '';
let globalLocationStatusType: FilterType = 'All';

export const setglobalRefetchClinicLocationsFunction = (refetchFn: () => void) => {
  globalRefetchClinicLocationsFunction = refetchFn;
};

export const getglobalRefetchClinicLocationsFunction = () => globalRefetchClinicLocationsFunction;

export const setGlobalLocationSearchAndStatus = (search: string, status: FilterType) => {
  globalLocationSearchString = search;
  globalLocationStatusType = status;
};

export const getGlobalLocationSearchAndStatus = () => ({
  searchString: globalLocationSearchString,
  statusType: globalLocationStatusType,
});

const ClinicLocations = () => {
  const { uuid: paramUuid } = useParams();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [isViewMode, setIsViewMode] = useState(false);
  const [viewData, setViewData] = useState<Location>();
  const [hasRefetched, setHasRefetched] = useState(false);
  const [clinicUuid, setClinicUuid] = useState('');
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
  const [locationToArchive, setLocationToArchive] = useState<Location | null>(null);
  const selectedClinic = useAppSelector((state: any) => state.clinicReducer?.data);
  const { isProviderPortal } = useAuthority();
  const [localStorageVersion, setLocalStorageVersion] = useState(0);

  const getClinicId = () => {
    const roles = getDataFromLocalStorage('roles') as unknown as string[];
    if (roles && roles.includes('SUPER_ADMIN')) {
      return paramUuid || '';
    } else {
      const localStorageClinicId =
        getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
      return localStorageClinicId;
    }
  };

  const clinicId = getClinicId();

  const {
    mutateAsync: getLocationById,
    data: locationByIdData,
    isPending,
  } = useMutation({
    mutationFn: LocationControllerService.getApiMasterLocationByLocationId,
  });

  const {
    mutateAsync: getClinicLocations,
    data: clinicLocationsData,
    isPending: isLoading,
  } = useMutation({
    mutationFn: LocationControllerService.getApiMasterLocation,
  });

  const {
    mutateAsync: archiveLocation,
    isSuccess: isSuccessArchivingLocation,
    data: archivingLocationData,
    isError: isErrorArchivingLocation,
    error: errorArchivingLocation,
    isPending: isPendingArchive,
  } = useMutation({
    mutationFn: LocationControllerService.putApiMasterLocationByLocationIdByStatus,
  });

  const handleArchiveLocation = (rowData: any) => {
    setLocationToArchive(rowData);
    setIsArchiveConfirmOpen(true);
  };

  const handleConfirmArchive = async () => {
    try {
      if (!locationToArchive?.uuid) return;

      const locationData = await getLocationById({ locationId: locationToArchive.uuid });
      if (!locationData) return;

      await archiveLocation({
        locationId: locationToArchive.uuid,
        status: locationToArchive.archive === true ? false : true,
      });

      setIsArchiveConfirmOpen(false);
      setLocationToArchive(null);
    } catch (error) {
      console.error('Error archiving location:', error);
      setIsArchiveConfirmOpen(false);
      setLocationToArchive(null);
    }
  };

  const handleCancelArchive = () => {
    setIsArchiveConfirmOpen(false);
    setLocationToArchive(null);
  };

  const allLocations = clinicLocationsData?.data?.content;
  const roles = (getDataFromLocalStorage('roles') as unknown as string[]) || [];

  const RefetchClinicLocations = useCallback(() => {
    const { searchString: globalSearch, statusType: globalStatus } =
      getGlobalLocationSearchAndStatus();

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

    getClinicLocations({
      page: page,
      size: pageSize,
      searchString: globalSearch,
      status,
      archive,
      clinicId: clinicId || '',
    });
  }, [page, pageSize, getClinicLocations, clinicId]);

  const fetchClinicData = (id: string) => {
    if (id) {
      getClinicLocations({ clinicId: id });
    }
  };

  const handleEditLocation = (rowData: any) => {
    getLocationById({ locationId: rowData?.uuid });
    setIsEditMode(true);
    setOpenEditDialog(true);
    setHasRefetched(false);
  };

  const handleView = (rowData: any) => {
    setIsViewMode(true);
    setViewData(rowData);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);

    // Call API with the new page size and reset to page 0
    const { searchString: globalSearch, statusType: globalStatus } =
      getGlobalLocationSearchAndStatus();

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

    getClinicLocations({
      page: 0,
      size: newPageSize,
      searchString: globalSearch,
      status,
      archive,
      clinicId: clinicId || '',
    });
  };

  const handlePageChange = (newPage: number) => {
    const newPageIndex = newPage - 1;
    setPage(newPageIndex);

    const { searchString: globalSearch, statusType: globalStatus } =
      getGlobalLocationSearchAndStatus();

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

    getClinicLocations({
      page: newPageIndex, // Use the new page value directly
      size: pageSize,
      searchString: globalSearch,
      status,
      archive,
      clinicId: clinicId || '',
    });
  };

  const transformedLocations = useMemo(() => {
    return Array.isArray(allLocations)
      ? allLocations?.map((location: Location) => ({
          ...location,
          groupspecialities: getCountAndFormat(location?.specialities || [])?.formattedRoles || '',

          specialities: location?.specialities
            ? Object.values(location?.specialities).join(', ')
            : '',
          address: location?.physicalAddress
            ? `${location?.physicalAddress.line1 || ''} ${location?.physicalAddress.line2 || ''} `
            : '',
          city: location?.physicalAddress.city,
          state: location?.physicalAddress.state,
          zipCode: location?.physicalAddress.zipcode,
          phone: location?.contact,
          contact: location?.contact ? `${formatPhoneNumber(location?.contact)}` : '',
          locationStatus: location?.archive ? 'ARCHIVED' : location?.active ? 'ACTIVE' : 'INACTIVE',
          action: [
            ...(roles.includes('SUPER_ADMIN')
              ? location?.archive === true
                ? [
                    {
                      label: 'Restore',
                      route: 'archive',
                    },
                  ]
                : [
                    {
                      label: 'Edit',
                      route: 'edit',
                    },
                    {
                      label: 'Archive',
                      route: 'archive',
                    },
                  ]
              : []),
          ],
        }))
      : [];
  }, [allLocations, roles]);

  useEffect(() => {
    if (isLoading || isPendingArchive) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isPendingArchive]);

  useEffect(() => {
    const checkClinicChange = () => {
      const currentClinicId =
        getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

      if (currentClinicId !== clinicUuid) {
        setClinicUuid(currentClinicId);
        fetchClinicData(currentClinicId);
      }
    };

    checkClinicChange();
    const interval = setInterval(checkClinicChange, 100000);

    return () => clearInterval(interval);
  }, [clinicId]);

  useEffect(() => {
    const initialClinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
    setClinicUuid(initialClinicId);
    fetchClinicData(initialClinicId);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedClinicUuid') {
        const newClinicId = e.newValue?.replace(/"/g, '') || '';
        setClinicUuid(newClinicId);
        fetchClinicData(newClinicId);
      }
    };
    const handleClinicChanged = (e: CustomEvent) => {
      const newClinicId = e.detail?.clinicId || '';
      setClinicUuid(newClinicId);
      fetchClinicData(newClinicId);
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('clinicChanged', handleClinicChanged as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('clinicChanged', handleClinicChanged as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isSuccessArchivingLocation) {
      RefetchClinicLocations();
    }
  }, [isSuccessArchivingLocation]);

  useEffect(() => {
    const checkLocalStorageChanges = () => {
      const currentRole = getDataFromLocalStorage('role');
      const currentClinicId =
        getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

      if (
        currentRole !== getDataFromLocalStorage('role') ||
        currentClinicId !== getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '')
      ) {
        setLocalStorageVersion(prev => prev + 1);
      }
    };

    checkLocalStorageChanges();

    const interval = setInterval(checkLocalStorageChanges, 1000);

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

  useEffect(() => {
    if (clinicUuid) {
      getClinicLocations({
        page,
        size: pageSize,
        searchString: '',
        clinicId: clinicUuid,
      });
    }
  }, [clinicUuid, localStorageVersion, page, pageSize, getClinicLocations]);

  useEffect(() => {
    if (isLoading || isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isPending, dispatch]);

  useEffect(() => {
    setglobalRefetchClinicLocationsFunction(() => {
      const { searchString: globalSearch, statusType: globalStatus } =
        getGlobalLocationSearchAndStatus();

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

      getClinicLocations({
        page,
        size: pageSize,
        searchString: globalSearch,
        status,
        archive,
        clinicId: clinicId || '',
      });
    });
    return () => {
      setglobalRefetchClinicLocationsFunction(() => {});
    };
  }, [selectedClinic?.schema, page, pageSize, getClinicLocations, clinicId]);

  useEffect(() => {
    const handleRefetchEvent = () => {
      RefetchClinicLocations();
    };

    window.addEventListener('refetchClinicLocations', handleRefetchEvent);

    return () => {
      window.removeEventListener('refetchClinicLocations', handleRefetchEvent);
    };
  }, []);

  useEffect(() => {
    getClinicLocations({
      page,
      size: pageSize,
      searchString: '',
      clinicId: clinicId || '',
    });
  }, [clinicId]);

  useApiFeedback(
    isErrorArchivingLocation,
    errorArchivingLocation,
    isSuccessArchivingLocation,
    (archivingLocationData?.message || 'Location archived successfully!') as string
  );

  const handleRefetch = useCallback(() => {
    if (hasRefetched) {
      return;
    }

    setHasRefetched(true);

    getClinicLocations({
      page,
      size: pageSize,
      searchString: '',
      archive: false,
      clinicId: clinicId || '',
    });
    setOpenEditDialog(false);
    setIsEditMode(false);
  }, [page, pageSize, getClinicLocations, hasRefetched, clinicId]);

  return (
    <>
      {clinicId === '' ? (
        <Grid display={'flex'} justifyContent={'center'}>
          <Typography variant="titleMedium3">
            {providerConstants.NO_LOCATIONS_ASSOCIATED}
          </Typography>
        </Grid>
      ) : (
        !isLoading && (
          <Grid container spacing={3} mt={2}>
            <Grid size={{ xs: 12 }}>
              <CustomisedTable
                headCells={isProviderPortal ? profileLocationHeaderProvider : profileLocationHeader}
                tableData={transformedLocations}
                setHeight="65vh"
                removeRadius={false}
                handleArchive={handleArchiveLocation}
                handleEdit={handleEditLocation}
                showPagination
                handleView={handleView}
                totalCount={(clinicLocationsData?.data?.page as any)?.totalElements || 0}
                currentPage={page + 1}
                itemsPerPage={pageSize}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handlePageSizeChange}
              />
            </Grid>
          </Grid>
        )
      )}
      <CustomDrawer
        title={locationConstants.EDIT_LOCATION}
        anchor="right"
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          setIsEditMode(false);
        }}
        drawerPadding="18px"
      >
        <LocationForm
          onClose={() => {
            setOpenEditDialog(false);
            setIsEditMode(false);
            handleRefetch();
          }}
          isEdit={isEditMode}
          locationData={locationByIdData?.data as any}
          schema={selectedClinic?.schema as string}
        />
      </CustomDrawer>

      <CustomDrawer
        title="Location Details"
        anchor="right"
        open={isViewMode}
        onClose={() => {
          setIsViewMode(false);
        }}
        drawerPadding="18px"
      >
        {viewData && <ViewLocationDetails dataView={viewData} />}
      </CustomDrawer>

      {/* Archive Confirmation Dialog */}
      <ConfirmationPopUp
        open={isArchiveConfirmOpen}
        onClose={handleCancelArchive}
        onConfirm={handleConfirmArchive}
        message={`Are you sure you want to ${locationToArchive?.archive ? 'restore' : 'archive'} the location "${locationToArchive?.name}"?`}
      />
    </>
  );
};

export default ClinicLocations;
