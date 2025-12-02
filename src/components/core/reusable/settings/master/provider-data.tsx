import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CustomisedTable from '../../custom-table/custom-table';
import { providerDataHeader } from '../../headers/all-headers';
import { useMedicalCodeControllerServiceGetApiMasterMedicalCodes } from 'src/sdk/queries';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from 'src/redux/reducers/loaderReducer';
import { MedicalCode } from 'src/sdk/requests';

const ProviderDataSetting = () => {
  const [page] = useState(0);
  const [size] = useState(10);
  const [searchString] = useState('');
  const dispatch = useDispatch();

  const { data: medicalCodesData, isLoading } =
    useMedicalCodeControllerServiceGetApiMasterMedicalCodes({
      type: 'PROVIDER',
      page,
      size,
      searchString,
      active: true,
      archive: false,
    });
  const medicalCodeData = medicalCodesData?.data?.content || [];

  const tableData = Array.isArray(medicalCodeData)
    ? medicalCodeData?.map((medical: MedicalCode) => ({
        ...medical,
        code: medical?.code,
        description: medical?.description,
        status: medical?.active ?? false,
        uuid: medical?.uuid,
      }))
    : [];

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading, dispatch]);
  return (
    <Box paddingTop={2}>
      <CustomisedTable
        headCells={providerDataHeader}
        tableData={tableData}
        setHeight="75vh"
        removeRadius={false}
      />
    </Box>
  );
};

export default ProviderDataSetting;
