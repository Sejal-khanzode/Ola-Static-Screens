import React from 'react';
import { Grid, Typography } from '@mui/material';
import { TextMacro } from 'src/sdk/requests';
import { templateConstants } from 'src/constants/setting-constants';

interface ViewMacroProps {
  onClose: () => void;
  macroData: TextMacro;
}

const ViewMacro: React.FC<ViewMacroProps> = ({ macroData }) => {
  return (
    <Grid container spacing={3}>
      <Grid container spacing={2} alignItems="start">
        <Grid size={{ xs: 4 }}>
          <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
            {templateConstants.TITLE}:
          </Typography>
        </Grid>
        <Grid size={{ xs: 8 }}>
          <Typography variant="titleMedium4" >
            {macroData.title || '-'}
          </Typography>
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
            {templateConstants.DESCRIPTION}:
          </Typography>
        </Grid>
        <Grid size={{ xs: 8 }}>
          <Typography variant="titleMedium4" >
            {macroData.expansionText || '-'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewMacro;
