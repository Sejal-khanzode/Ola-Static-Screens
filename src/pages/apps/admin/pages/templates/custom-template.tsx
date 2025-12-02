import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTable from 'src/components/core/reusable/custom-table/custom-table';
import { customTemplatesHeader } from 'src/components/core/reusable/headers/all-headers';
import { templateConstants } from 'src/constants/setting-constants';

const CustomTemplates = () => {
  const navigate = useNavigate();

  const TemplateData = [
    {
      templateName: templateConstants.INTAKE_FORM,
    },
    {
      templateName: templateConstants.CONSENT_FORM,
    },
  ];

  const handleView = (row: any) => {
    if (row.templateName === templateConstants.INTAKE_FORM) {
      navigate('/admin/templates/custom-template/intake-form');
    } else if (row.templateName === templateConstants.CONSENT_FORM) {
      navigate('/admin/templates/custom-template/consent-form');
    }
  };

  return (
    <Grid container>
      <Grid pt={2} size={3.6}>
        <CustomTable
          headCells={customTemplatesHeader}
          tableData={TemplateData}
          handleView={handleView}
        />
      </Grid>
    </Grid>
  );
};

export default CustomTemplates;
