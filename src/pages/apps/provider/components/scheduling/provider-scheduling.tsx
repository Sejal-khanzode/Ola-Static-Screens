import AddIcon from '@mui/icons-material/Add';
import { ButtonBase, Grid, Typography, Box, Popover } from '@mui/material';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import dayjs, { Dayjs } from 'dayjs';
import {
  AppointmentConstants,
  AppointmentViewOptions,
} from './schedule-appointments/schedule-appointment-constants';
import ScheduleAppointmentDialog from './schedule-appointments/schedule-appointment-dialog';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import AppointmentList from './appointment-list/appointment-list';
import AppointmentCalendar from './calendar-view/appointment-calendar';
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from 'src/sdk/requests/core/localStorage';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import { newAppointment, schedulingConstants } from 'src/constants/scheduling-constants';
import ListCalenderSwitcher from './list-calender-switcher/list-calender-switcher';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import {
  Appointment,
  AppointmentManagementService,
  AppointmentType,
  AppointmentTypeManagementService,
  Location,
  LocationControllerService,
  PatientClinicControllerService,
  Provider,
  ProviderControllerService,
} from 'src/sdk/requests';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import CustomAutoComplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import { formConstants } from 'src/constants/setting-constants';
import { providerConstants } from 'src/constants/patients-constants';
import { appointmentStatusColors } from './schedule-appointments/schedule-appointment-constants';
import InfoIcon from '@mui/icons-material/Info';

export interface Page {
  totalElements: number;
  totalPages: number;
}

export default function ProviderScheduling() {
  const [openScheduleApptDialog, setOpenScheduleApptDialog] = useState(false);
  const [view, setView] = useState(AppointmentViewOptions.LIST);

  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [isLeftGridOpen, setIsLeftGridOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(15);
  const [clinicId, setClinicId] = useState(
    getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || ''
  );
  const [searchText, setsearchText] = useState('');
  const [searchTextProvider, setsearchTextProvider] = useState('');
  const [searchTextLocation, setsearchTextLocation] = useState('');
  const [timeFilter, setTimeFilter] = useState<'UPCOMING' | 'PAST' | 'ALL' | undefined>('UPCOMING');

  const [patientList, setPatientList] = useState<{ key: string; value: string }[]>([]);
  const [patientSelected, setPatientSelected] = useState('');

  const [providerList, setProviderList] = useState<{ key: string; value: string }[]>([]);
  const [providerSelected, setProviderSelected] = useState('');

  const [locationList, setLocationList] = useState<{ key: string; value: string }[]>([]);
  const [locationSelected, setLocationSelected] = useState('');

  const [appointmentTypesList, setAppointmentTypesList] = useState<
    { key: string; value: string; child?: React.ReactElement }[]
  >([]);
  const [appointmentTypeSelected, setAppointmentTypeSelected] = useState('');
  const [appointmentTypeValue, setAppointmentTypeValue] = useState('');

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const dispatch = useDispatch();

  const [appointmentListData, setAppointmentListData] = useState<Appointment[]>();
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const { data: locationsAPIData } = useQuery({
    queryKey: ['locationsAPIData', clinicId, searchTextLocation],
    queryFn: () =>
      LocationControllerService.getApiMasterLocation({
        clinicId: clinicId,
        archive: false,
        status: true,
        searchString: searchTextLocation,
      }),
    enabled: !!clinicId,
  });

  const { data: patientInformationData } = useQuery({
    queryKey: ['patientAPIList', searchText, clinicId],
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinic({
        clinicUuid: clinicId || '',
        searchString: searchText,
      }),
    enabled: !!clinicId,
  });

  const { data: providerAPIData } = useQuery({
    queryKey: ['providerData', clinicId, searchTextProvider],
    queryFn: () =>
      ProviderControllerService.getApiMasterProvider({
        clinicId: clinicId,
        archive: false,
        status: true,
        searchString: searchTextProvider,
      }),
    enabled: !!clinicId,
  });

  const { data: appointmentTypesData } = useQuery({
    queryKey: ['appointmentTypesAPIData'],
    queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypes({ title: '' }),
  });

  const onRowsPerPageChange = (record: number) => {
    setRowPerPage(record);
    setPage(0);
  };

  const onPageChange = (event: unknown, newPage: number) => {
    event;
    setPage(newPage);
  };

  const {
    refetch: refetchList,
    data: dataList,
    isLoading: isLoading,
    isFetching: isFetching,
    dataUpdatedAt,
  } = useQuery({
    // enabled: isProvider ? providerUuid.length > 0 : true,
    queryKey: [
      'ApptList',
      {
        page,
        rowPerPage,
        providerSelected,
        locationSelected,
        patientSelected,
        appointmentTypeValue,
        startDate,
        endDate,
        timeFilter,
        clinicId,
      },
    ],
    queryFn: () =>
      AppointmentManagementService.getApiMasterAppointments({
        page: page,
        size: rowPerPage,
        sortBy: 'startTime',
        sortDirection: 'asc',
        // providerUuid:
        //   isProvider && !providerSelected
        //     ? [userProfile?.uuid || '']
        //     : providerSelected && providerSelected !== 'ALL'
        //       ? [providerSelected]
        //       : [''],
        providerUuid: providerSelected && providerSelected !== 'ALL' ? [providerSelected] : [''],
        locationUuid: locationSelected && locationSelected !== 'ALL' ? [locationSelected] : [''],
        patientUuid: patientSelected && patientSelected !== 'ALL' ? patientSelected : '',
        appointmentTypes:
          appointmentTypeValue && appointmentTypeValue !== 'ALL' ? appointmentTypeValue : '',
        timeFilter: timeFilter,
        startDate: startDate ?? '',
        endDate: endDate ?? '',
        clinicUuid: clinicId,
      }),
  });

  const totalElements = (dataList?.data?.page as unknown as Page)?.totalElements ?? 0;
  const totalPages = (dataList?.data?.page as unknown as Page)?.totalPages ?? 0;

  const toggleLeftGrid = () => {
    setIsLeftGridOpen(prev => !prev);
  };

  const handleInputChange = (inputValue: string) => {
    if (inputValue?.length > 2) {
      setsearchText(inputValue);
    } else {
      setsearchText('');
    }
  };

  const handleInputChangeProvider = (inputValue: string) => {
    if (inputValue?.length > 2) {
      setsearchTextProvider(inputValue);
    } else {
      setsearchTextProvider('');
    }
  };

  const handleInputChangeLocation = (inputValue: string) => {
    if (inputValue?.length > 2) {
      setsearchTextLocation(inputValue);
    } else {
      setsearchTextLocation('');
    }
  };

  useEffect(() => {
    if (location.pathname === '/provider/scheduling') {
      removeDataFromLocalStorage('patientUUID');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (selectedDate) {
      const start = dayjs(selectedDate).startOf('day').toDate().toISOString();
      const end = dayjs(selectedDate).endOf('day').toDate().toISOString();
      setStartDate(start);
      setEndDate(end);
      setTimeFilter(undefined);
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
      if (view === AppointmentViewOptions.LIST) setTimeFilter('UPCOMING');
    }
  }, [selectedDate]);

  useEffect(() => {
    const apiData = Array.isArray(patientInformationData?.data?.content)
      ? patientInformationData?.data?.content?.map((ele: any) => ({
          key: ele.uuid,
          value: ele.patientName,
        }))
      : [];

    if (apiData?.length > 0) {
      const uniqueNewPatients = apiData.filter(
        newPatient => !patientList.some(existingPatient => existingPatient.key === newPatient.key)
      );

      if (uniqueNewPatients.length > 0) {
        const allOption = { key: 'ALL', value: 'All' };
        const hasAllOption = patientList.some(patient => patient.key === 'ALL');

        if (!hasAllOption) {
          setPatientList([allOption, ...patientList, ...uniqueNewPatients]);
        } else {
          setPatientList(prevList => [...prevList, ...uniqueNewPatients]);
        }
      }
    } else if (patientList.length === 0) {
      setPatientList([{ key: 'ALL', value: 'All' }]);
    }
  }, [patientInformationData]);

  useEffect(() => {
    setAppointmentListData(dataList?.data?.content as Appointment[]);
  }, [dataList, dataUpdatedAt]);

  useEffect(() => {
    if (providerAPIData?.data?.content && Array.isArray(providerAPIData?.data?.content)) {
      const apiData = providerAPIData?.data?.content
        ?.filter((provider: Provider) => provider.uuid)
        ?.map((provider: Provider) => ({
          key: provider.uuid!,
          value: `${provider.firstName} ${provider.lastName}`,
        }));

      const uniqueNewProviders = apiData.filter(
        newProvider =>
          !providerList.some(existingProvider => existingProvider.key === newProvider.key)
      );

      if (uniqueNewProviders.length > 0) {
        const allOption = { key: 'ALL', value: 'All' };
        const hasAllOption = providerList.some(provider => provider.key === 'ALL');

        if (!hasAllOption) {
          setProviderList([allOption, ...providerList, ...uniqueNewProviders]);
        } else {
          setProviderList(prevList => [...prevList, ...uniqueNewProviders]);
        }
      }
    } else if (providerList.length === 0) {
      setProviderList([{ key: 'ALL', value: 'All' }]);
    }
  }, [providerAPIData]);

  useEffect(() => {
    if (locationsAPIData?.data?.content && Array.isArray(locationsAPIData?.data?.content)) {
      const apiData = locationsAPIData?.data?.content
        ?.filter((location: Location) => location?.uuid)
        ?.map((location: Location) => ({
          key: location?.uuid!,
          value: location?.name,
        }));

      const uniqueNewLocations = apiData.filter(
        newLocation =>
          !locationList.some(existingLocation => existingLocation.key === newLocation.key)
      );

      if (uniqueNewLocations.length > 0) {
        const allOption = { key: 'ALL', value: 'All' };
        const hasAllOption = locationList.some(location => location.key === 'ALL');

        if (!hasAllOption) {
          setLocationList([allOption, ...locationList, ...uniqueNewLocations]);
        } else {
          setLocationList(prevList => [...prevList, ...uniqueNewLocations]);
        }
      }
    } else if (locationList.length === 0) {
      setLocationList([{ key: 'ALL', value: 'All' }]);
    }
  }, [locationsAPIData]);

  useEffect(() => {
    if (appointmentTypesData?.data?.content && Array.isArray(appointmentTypesData?.data?.content)) {
      const apiData = appointmentTypesData?.data?.content
        ?.filter((appointmentType: AppointmentType) => appointmentType.uuid)
        ?.map((appointmentType: AppointmentType) => ({
          key: appointmentType.uuid!,
          value: appointmentType.title,
          child: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: appointmentType.colorCode || '#ccc',
                  borderRadius: '2px',
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                {appointmentType.title}
              </Typography>
            </Box>
          ),
        }));

      const uniqueNewAppointmentTypes = apiData.filter(
        newApptType =>
          !appointmentTypesList.some(existingApptType => existingApptType.key === newApptType.key)
      );

      if (uniqueNewAppointmentTypes.length > 0) {
        const allOption = {
          key: 'ALL',
          value: 'All',
          child: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                All
              </Typography>
            </Box>
          ),
        };
        const hasAllOption = appointmentTypesList.some(apptType => apptType.key === 'ALL');

        if (!hasAllOption) {
          setAppointmentTypesList([
            allOption,
            ...appointmentTypesList,
            ...uniqueNewAppointmentTypes,
          ]);
        } else {
          setAppointmentTypesList(prevList => [...prevList, ...uniqueNewAppointmentTypes]);
        }
      }
    } else if (appointmentTypesList.length === 0) {
      setAppointmentTypesList([
        {
          key: 'ALL',
          value: 'All',
          child: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                All
              </Typography>
            </Box>
          ),
        },
      ]);
    }
  }, [appointmentTypesData]);

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, isFetching, dispatch]);

  useEffect(() => {
    const handleClinicChange = () => {
      // Get the latest clinicId from localStorage
      const latestClinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';

      if (latestClinicId) {
        // Update the clinicId state which will trigger the query to refetch
        setClinicId(latestClinicId);
      }
    };

    window.addEventListener('clinicChanged', handleClinicChange);
    return () => {
      window.removeEventListener('clinicChanged', handleClinicChange);
    };
  }, []);

  return (
    <Grid
      container
      // border={`1px solid #E0E0E0`}
      sx={{
        borderRadius: '8px',
        // background: '#FFFFFF',
      }}
      height={'100%'}
      maxHeight={'100%'}
      flexWrap={'nowrap'}
      width={'100%'}
      maxWidth={'100%'}
      gap={1}
      p={1}
    >
      {clinicId ? (
        <Grid
          flex={1}
          width={'100%'}
          container
          maxHeight={'100%'}
          flexWrap={'nowrap'}
          flexDirection={'column'}
          gap={2}
        >
          <Grid size={12} display={'flex'} container minHeight={'52px'}>
            <Grid
              container
              maxHeight={'50px'}
              width={'100%'}
              alignContent={'center'}
              justifyContent={'space-between'}
              minHeight={'52px'}
              alignItems={'center'}
            >
              {/* {view === AppointmentViewOptions.LIST && ( */}
              <Grid size={8} display={'flex'} flexDirection={'row'} gap={2}>
                <Grid
                  container
                  display={'flex'}
                  flexDirection={'row'}
                  flexWrap={'nowrap'}
                  width={'100%'}
                >
                  {!isLeftGridOpen && (
                    <ButtonBase onClick={toggleLeftGrid} style={{ paddingTop: 24 }}>
                      <MenuIcon color="primary" />
                    </ButtonBase>
                  )}
                  {view === AppointmentViewOptions.LIST && (
                    <Box mt={0.5} width={'150px'}>
                      <CustomLabel label="Appt. Time" />
                      <CustomSelect
                        value={timeFilter || 'UPCOMING'}
                        items={[
                          { label: 'Upcoming', value: 'UPCOMING' },
                          { label: 'Past', value: 'PAST' },
                        ]}
                        placeholder="Select"
                        onChange={e => {
                          const value = e.target.value;
                          if (value === 'UPCOMING' || value === 'PAST') {
                            setTimeFilter(value);
                            // Clear selected date when changing time filter
                            setSelectedDate(undefined);
                          }
                        }}
                        isDisabled={!!selectedDate}
                      />
                    </Box>
                  )}
                  <Grid size={3} padding={'5px'}>
                    <CustomLabel label={schedulingConstants.PATIENT} />
                    <CustomAutoComplete
                      placeholder={schedulingConstants.SEARCH_BY_PATIENT}
                      value={patientSelected}
                      options={patientList}
                      onChange={selectedValue => {
                        setPatientSelected(selectedValue);
                        setsearchText('');
                      }}
                      onInputChange={handleInputChange}
                      autoname="patientSelected"
                      showClearIcon={true}
                    />
                  </Grid>

                  <Grid size={3} padding={'5px'}>
                    <CustomLabel label={newAppointment.PROVIDER} />
                    <CustomAutoComplete
                      placeholder={schedulingConstants.SEARCH_BY_PROVIDER}
                      value={providerSelected}
                      options={providerList}
                      onChange={selectedValue => {
                        setProviderSelected(selectedValue);
                        setsearchTextProvider('');
                      }}
                      onInputChange={handleInputChangeProvider}
                      autoname="providerSelected"
                      showClearIcon={true}
                    />
                  </Grid>

                  <Grid size={3} padding={'5px'}>
                    <CustomLabel label={schedulingConstants.LOCATION} />
                    <CustomAutoComplete
                      placeholder={schedulingConstants.SEARCH_BY_LOCATION}
                      value={locationSelected}
                      options={locationList}
                      onChange={selectedValue => {
                        setLocationSelected(selectedValue);
                        setsearchTextLocation('');
                      }}
                      onInputChange={handleInputChangeLocation}
                      autoname="locationSelected"
                      showClearIcon={true}
                    />
                  </Grid>

                  <Grid size={3.5} padding={'5px'}>
                    <CustomLabel label={schedulingConstants.APPT_TYPE} />
                    <CustomAutoComplete
                      placeholder={formConstants.SELECT_APPT_TYPE}
                      value={appointmentTypeSelected}
                      options={appointmentTypesList}
                      onChange={selectedKey => {
                        // Find the selected appointment type by key
                        const selectedApptType = appointmentTypesList.find(
                          apptType => apptType.key === selectedKey
                        );
                        // Store the key in appointmentTypeSelected
                        setAppointmentTypeSelected(selectedKey);
                        // Store the value (title) in appointmentTypeValue
                        if (selectedKey === 'ALL') {
                          setAppointmentTypeValue('');
                        } else {
                          setAppointmentTypeValue(selectedApptType?.value || selectedKey);
                        }
                      }}
                      autoname="appointmentTypeSelected"
                      showClearIcon={true}
                    />
                  </Grid>

                  {view === AppointmentViewOptions.LIST && (
                    <Grid size={2.5} padding={'5px'}>
                      <CustomLabel label={'Appt. Date'} />
                      <CustomDatePicker
                        value={
                          selectedDate && selectedDate.isValid() ? selectedDate.toISOString() : ''
                        }
                        handleDateChange={(date: string) => {
                          if (date && date.trim() !== '') {
                            const newDate = dayjs(date);
                            if (newDate.isValid()) {
                              // If clicking on the same date, deselect it
                              if (selectedDate && newDate.isSame(selectedDate, 'day')) {
                                setSelectedDate(undefined);
                              } else {
                                setSelectedDate(newDate);
                              }
                            }
                          } else {
                            // Clear the date
                            setSelectedDate(undefined);
                          }
                        }}
                        placeholder="Select Date"
                        bgWhite={false}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid display={'flex'} gap={2} mt={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  {view === AppointmentViewOptions.CALENDAR && (
                    <>
                      <Box
                        onClick={handlePopoverOpen}
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 0.5,
                          px: 1,
                          py: 0.9,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            variant: 'titleMedium5',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'Primary.main',
                          }}
                        >
                          <InfoIcon
                            sx={{ fontSize: 26, cursor: 'pointer', pr: 0.5, color: 'Primary.main' }}
                          />
                          {AppointmentConstants.APPOINTMENT_STATUS}
                        </Typography>
                      </Box>

                      <Popover
                        open={Boolean(popoverAnchorEl)}
                        anchorEl={popoverAnchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        slotProps={{
                          paper: {
                            sx: {
                              p: 1.5,
                              borderRadius: 1,
                              minWidth: 200,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 1,
                              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            },
                          },
                        }}
                      >
                        {appointmentStatusColors.map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              borderRadius: 0.5,
                            }}
                          >
                            <Box
                              sx={{
                                width: 14,
                                height: 14,
                                backgroundColor: item.colorCode,
                                borderRadius: 0.5,
                                borderColor: 'Neutral.40',
                              }}
                            />
                            <Typography sx={{ variant: 'bodyRegular5', color: 'Neutral.70' }}>
                              {item.name}
                            </Typography>
                          </Box>
                        ))}
                      </Popover>
                    </>
                  )}

                  <ListCalenderSwitcher
                    option1={AppointmentViewOptions.LIST}
                    option2={AppointmentViewOptions.CALENDAR}
                    buttonWidth={'80px'}
                    onChange={(option: string) => {
                      const newView =
                        option === AppointmentViewOptions.LIST
                          ? AppointmentViewOptions.LIST
                          : AppointmentViewOptions.CALENDAR;

                      setView(newView);

                      // Set timeFilter to 'ALL' when switching to calendar view
                      if (newView === AppointmentViewOptions.CALENDAR) {
                        setTimeFilter('ALL');
                        setRowPerPage(500);
                        setSelectedDate(undefined);
                        setStartDate(undefined);
                        setEndDate(undefined);
                      }
                      if (newView === AppointmentViewOptions.LIST) {
                        setTimeFilter('UPCOMING');
                        setSelectedDate(undefined);
                        setStartDate(undefined);
                        setEndDate(undefined);
                      }
                    }}
                  />
                </Box>
                <CustomButton
                  variant="filled"
                  onClick={() => setOpenScheduleApptDialog(true)}
                  startIcon={<AddIcon />}
                  label={schedulingConstants.SCHEDULE_APPOINTMENT}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid></Grid>
          <Grid maxHeight={'100%'}>
            {view === AppointmentViewOptions.CALENDAR && (
              <AppointmentCalendar
                // providerSelected={['']}
                // patientSelected={patientSelected}
                // locationSelected={''}
                appointmentListData={appointmentListData}
                onDateRangeChange={(start: string, end: string) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
                refetchList={refetchList}
              />
            )}
            {view === AppointmentViewOptions.LIST && (
              <Grid>
                <AppointmentList
                  data={appointmentListData}
                  onRowsPerPageChange={onRowsPerPageChange}
                  onPageChange={onPageChange}
                  totalElements={totalElements}
                  totalPages={totalPages}
                  refetch={refetchList}
                  rowPerPage={rowPerPage}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid container width={'100%'}>
          <Grid size={{ xs: 12 }} display={'flex'} justifyContent={'center'} width={'100%'}>
            <Typography variant="titleMedium3">
              {providerConstants.NO_CLINICS_ASSOCIATED}
            </Typography>
          </Grid>
        </Grid>
      )}
      <CustomDrawer
        title={'Schedule Appointment'}
        open={openScheduleApptDialog}
        onClose={() => setOpenScheduleApptDialog(false)}
        anchor={'right'}
        drawerWidth="45vw"
        drawerPadding="19px"
      >
        <ScheduleAppointmentDialog
          handleDrawerClose={function (): void {
            setOpenScheduleApptDialog(false);
          }}
          refetchList={refetchList}
          isEdit={false}
        />
      </CustomDrawer>
    </Grid>
  );
}
