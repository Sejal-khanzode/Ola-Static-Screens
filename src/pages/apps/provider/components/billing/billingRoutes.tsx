import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from 'src/assets/icons/addIcon';
import CommonTabs from 'src/components/core/reusable/common-tabs/common-tabs';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';

const TabsConst = ['Ready for Billing', 'Superbill', 'Invoice', 'Claims', 'Remits'];

export const BillingRoutes = () => {
  const navigate = useNavigate();

  const tabItems =
    TabsConst?.map((label, index) => ({
      label,
      value: `tab-${index}`,
    })) || [];

  const returnIndex = () => {
    const pathSegments = location?.pathname?.split('/');
    const lastSegment = pathSegments?.[pathSegments.length - 1];
    const secondLastSegment = pathSegments?.[pathSegments.length - 2];

    if (secondLastSegment === 'ready-for-billing') {
      return 0;
    } else if (lastSegment === 'superbill') {
      return 1;
    } else if (lastSegment === 'invoice') {
      return 2;
    } else if (lastSegment === 'claims') {
      return 3;
    } else if (lastSegment === 'remits') {
      return 4;
    } else {
      return 0;
    }
  };

  const [value, setValue] = useState(returnIndex());

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate(`ready-for-billing`);
        break;
      case 1:
        navigate(`superbill`);
        break;
      case 2:
        navigate(`invoice`);
        break;
      case 3:
        navigate(`claims`);
        break;
      case 4:
        navigate(`remits`);
        break;
    }
    setValue(newValue);
  };

  return (
    <Box>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

        <Grid>
          {value === 1 && (
            <Grid size={12} mt={1}>
              <CustomButton startIcon={<AddIcon />} variant="filled" label="Create Superbill" 
              onClick={()=>{
                navigate('superbill/create-superbill')
              }}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
