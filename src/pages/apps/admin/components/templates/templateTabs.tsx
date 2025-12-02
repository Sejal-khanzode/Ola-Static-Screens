import { Grid, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AddIcon } from 'src/assets/icons/addIcon';
import CommonTabs from 'src/components/core/reusable/common-tabs';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import { SearchIcon } from 'src/assets/icons/searchIcon';
import {
  getGlobalRefetchMacrosFunction,
  setGlobalMacroSearchString,
} from '../../pages/templates/macros';
import {
  setGlobalVisitNotesSearchAndStatus,
  getGlobalRefetchVisitNotesFunction,
} from '../../pages/templates/visit-notes';
import AddEditMacros from '../../pages/templates/AddEditMacros';
import { templateConstants } from 'src/constants/setting-constants';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import {
  setGlobalROSSearchString,
  getGlobalRefetchROSFunction,
} from '../../pages/templates/review-of-systems';
import {
  getGlobalRefetchPEFunction,
  setGlobalPESearchString,
} from '../../pages/templates/physical-exam';

const TabsConst = [
  templateConstants.VISIT_NOTE,
  templateConstants.REVIEW_OF_SYSTEMS,
  templateConstants.PHYSICAL_EXAM,
  templateConstants.MACROS,
  templateConstants.TEMPLATES,  
];

export default function TemplateTabs() {
  const navigate = useNavigate();
  const [isMacrosDrawerOpen, setIsMacrosDrawerOpen] = useState<boolean>(false);
  const [searchStringLoc, setSearchStringLoc] = useState('');
  const [searchStringVisitNote, setSearchStringVisitNote] = useState('');
  const [statusType, setStatusType] = useState<
    'Soap Note' | 'Simple Note' | 'Consultation Note' | 'All'
  >('All');
  const [searchStringROS, setSearchStringROS] = useState('');
  const [searchStringPE, setSearchStringPE] = useState('');

  const tabItems =
    TabsConst?.map((label, index) => ({
      label,
      value: `tab-${index}`,
    })) || [];

  const returnIndex = () => {
    const pathSegments = location?.pathname?.split('/');
    const lastSegment = pathSegments?.[pathSegments.length - 1];
    const secondLastSegment = pathSegments?.[pathSegments.length - 2];

    if (secondLastSegment === 'visit-notes') {
      return 0;
    } else if (lastSegment === 'ros') {
      return 1;
    } else if (lastSegment === 'physical-exam') {
      return 2;
    } else if (lastSegment === 'macros') {
      return 3;
    } else if (lastSegment === 'custom-templates') { 
      return 4;
    } else {
      return 0;
    }
  };

  const [value, setValue] = useState(returnIndex());

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate(`visit-notes`);
        break;
      case 1:
        navigate(`ros`);
        break;
      case 2:
        navigate(`physical-exam`);
        break;
      case 3:
        navigate(`macros`);
        break;
      case 4:
        navigate(`custom-templates`);
        break;
    }
    setValue(newValue);
  };

  const handleSearchStringLoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value.length > 2 ? e.target.value : '';
    setSearchStringLoc(newSearchString);

    setGlobalMacroSearchString(newSearchString);

    if (value === 3) {
      const refetchFunction = getGlobalRefetchMacrosFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleSearchStringVisitNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value.length > 2 ? e.target.value : '';
    setSearchStringVisitNote(newSearchString);

    // Set global search and status values for Visit Notes
    setGlobalVisitNotesSearchAndStatus(newSearchString, statusType);

    // Trigger refetch in visit-notes.tsx when search string changes
    if (value === 0) {
      const refetchFunction = getGlobalRefetchVisitNotesFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleStatusChangeLoc = (event: SelectChangeEvent<string>) => {
    const statusValue = event.target.value as
      | 'Soap Note'
      | 'Simple Note'
      | 'Consultation Note'
      | 'All';
    setStatusType(statusValue);

    // Set global search and status values for Visit Notes
    setGlobalVisitNotesSearchAndStatus(searchStringVisitNote, statusValue);

    // Trigger refetch in visit-notes.tsx when status type changes
    if (value === 0) {
      const refetchFunction = getGlobalRefetchVisitNotesFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleSearchStringROS = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value.length > 2 ? e.target.value : '';
    setSearchStringROS(newSearchString);

    // Set global search string for ROS
    setGlobalROSSearchString(newSearchString);

    // Trigger refetch in review-of-systems.tsx when search string changes
    if (value === 1) {
      const refetchFunction = getGlobalRefetchROSFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  const handleSearchStringPE = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value.length > 2 ? e.target.value : '';
    setSearchStringPE(newSearchString);

    // Set global search string for PE
    setGlobalPESearchString(newSearchString);

    if (value === 2) {
      const refetchFunction = getGlobalRefetchPEFunction();
      if (refetchFunction) {
        refetchFunction();
      }
    }
  };

  return (
    <>
      <Grid size={12} p={1}>
        <Grid size={12}>
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
              <Typography variant="bodyRegular3">{templateConstants.TEMPLATES}</Typography>
            </Grid>
            <Grid mt={2}>
              <CommonTabs
                tabItems={tabItems}
                tabValue={value}
                onTabValueChange={(newValue: number) =>
                  handleChange({} as React.SyntheticEvent, newValue)
                }
                onTabChange={(newValue: number) =>
                  handleChange({} as React.SyntheticEvent, newValue)
                }
              />
            </Grid>

            <Grid size={6} display={'flex'} gap={2} justifyContent={'end'}>
              {value === 0 && (
                <Grid
                  size={12}
                  display={'flex'}
                  flexDirection={'row'}
                  gap={2}
                  alignItems={'end'}
                  justifyContent={'end'}
                >
                  <Grid size={4}>
                    <CustomInput
                      placeholder={templateConstants.SEARCH_BY_NAME}
                      value={searchStringVisitNote}
                      onChange={handleSearchStringVisitNote}
                      name="search"
                      showIcon={<SearchIcon />}
                      bgWhite
                    />
                  </Grid>
                  <Grid size={3}>
                    <CustomLabel label={templateConstants.TYPE} />
                    <CustomSelect
                      name="statusType"
                      placeholder={templateConstants.STATUS}
                      value={statusType}
                      onChange={handleStatusChangeLoc}
                      items={[
                        { value: templateConstants.ALL, label: templateConstants.ALL },
                        { value: 'CONSULTATION_NOTE', label: templateConstants.CONSULTATION_NOTE },
                        { value: 'SIMPLE_NOTE', label: templateConstants.SIMPLE_NOTE },
                        { value: 'SOAP_NOTE', label: templateConstants.SOAP_NOTE },
                      ]}
                      backgroundColor="white"
                    />
                  </Grid>
                  <Grid>
                    <CustomButton
                      variant="filled"
                      startIcon={<AddIcon />}
                      onClick={() => navigate('visit-notes/add-visit-notes')}
                      label={templateConstants.ADD_VISIT_NOTE}
                    />
                  </Grid>
                </Grid>
              )}

              {value === 1 && (
                <Grid
                  size={12}
                  display={'flex'}
                  flexDirection={'row'}
                  gap={2}
                  justifyContent={'end'}
                  alignItems={'end'}
                >
                  <Grid>
                    <CustomInput
                      placeholder={templateConstants.SEARCH_BY_ROS_TITLE}
                      value={searchStringROS}
                      onChange={handleSearchStringROS}
                      name="search"
                      showIcon={<SearchIcon />}
                      bgWhite
                    />
                  </Grid>

                  <Grid>
                    <CustomButton
                      variant="filled"
                      startIcon={<AddIcon />}
                      onClick={() =>
                        navigate('create-ros', { state: { type: 'ros', isEdit: false } })
                      }
                      label={templateConstants.ADD_ROS}
                    />
                  </Grid>
                </Grid>
              )}

              {value === 2 && (
                <Grid
                  size={12}
                  display={'flex'}
                  flexDirection={'row'}
                  gap={2}
                  justifyContent={'end'}
                  alignItems={'end'}
                >
                  <Grid>
                    <CustomInput
                      placeholder={templateConstants.SEARCH_BY_PE_TITLE}
                      value={searchStringPE}
                      onChange={handleSearchStringPE}
                      name="search"
                      showIcon={<SearchIcon />}
                      bgWhite
                    />
                  </Grid>

                  <Grid>
                    <CustomButton
                      variant="filled"
                      startIcon={<AddIcon />}
                      onClick={() =>
                        navigate('create-physical-exam', { state: { type: 'pe', isEdit: false } })
                      }
                      label={templateConstants.ADD_PE}
                    />
                  </Grid>
                </Grid>
              )}

              {value === 3 && (
                <Grid
                  size={12}
                  display={'flex'}
                  flexDirection={'row'}
                  gap={2}
                  justifyContent={'end'}
                  alignItems={'end'}
                >
                  <Grid>
                    <CustomInput
                      placeholder={templateConstants.SEARCH_BY_MACRO_TITLE}
                      value={searchStringLoc}
                      onChange={handleSearchStringLoc}
                      showIcon={<SearchIcon />}
                      name="search"
                      bgWhite
                    />{' '}
                  </Grid>

                  <Grid>
                    <CustomButton
                      variant="filled"
                      startIcon={<AddIcon />}
                      onClick={() => setIsMacrosDrawerOpen(true)}
                      label={templateConstants.ADD_MACRO}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Outlet />
        </Grid>
      </Grid>

      <CustomDrawer
        open={isMacrosDrawerOpen}
        onClose={() => setIsMacrosDrawerOpen(false)}
        anchor="right"
        drawerWidth="40vw"
        title={templateConstants.ADD_MACRO}
      >
        <AddEditMacros
          onClose={() => setIsMacrosDrawerOpen(false)}
          ReftechData={() => {
            const refetchFunction = getGlobalRefetchMacrosFunction();
            if (refetchFunction) {
              refetchFunction();
            }
          }}
        />
      </CustomDrawer>
    </>
  );
}
