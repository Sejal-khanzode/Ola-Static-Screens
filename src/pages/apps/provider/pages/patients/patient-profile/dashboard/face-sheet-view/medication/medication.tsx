import { Grid } from '@mui/material';
import CustomisedTable from 'src/components/core/reusable/custom-table/custom-table';
import { medicationHeader } from 'src/components/core/reusable/headers/all-headers';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import { useState } from 'react';
import { formsConstants, patientDashboardConstants } from 'src/constants/patients-constants';
import AddMedication from './add-medication';

export default function Medication() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [tableData] = useState<any[]>([]);

  const handleEdit = (rowData: any) => {
    console.log(rowData);
  };
  const handleArchive = (rowData: any) => {
    console.log(rowData);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        size={12}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <CustomButton
          variant="filled"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenDialog(true);
            setIsEdit(false);
          }}
          label={patientDashboardConstants.ADD_MEDICATION}
        />
      </Grid>
      <Grid size={12}>
        <CustomisedTable
          headCells={medicationHeader}
          tableData={tableData || []}
          handleEdit={handleEdit}
          handleArchive={handleArchive}
        />
      </Grid>
      <Grid>
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          title={
            isEdit
              ? patientDashboardConstants.EDIT_MEDICATION
              : patientDashboardConstants.ADD_MEDICATION
          }
          buttonName={[formsConstants.CANCEL, formsConstants.SAVE]}
          children={<AddMedication />}
        />
      </Grid>
    </Grid>
  );
}
