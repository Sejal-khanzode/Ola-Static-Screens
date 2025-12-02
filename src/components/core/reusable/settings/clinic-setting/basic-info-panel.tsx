import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { EditIcon } from '../../../../../assets/icons/editIcon';

interface BasicInfoItem {
  label: string;
  value: string | object | null;
}

interface BasicInfoPanelProps {
  title: string;
  data: BasicInfoItem[];
  onEdit?: () => void;
  editButtonText?: string;
}

const BasicInfoPanel: React.FC<BasicInfoPanelProps> = ({
  title,
  data,
  onEdit,
  editButtonText = 'Edit'
}) => {
  return (
    <Paper
      sx={{
        borderRadius: 1,
        p: 3,
        minHeight: 'auto',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="titleSemiBold2" color="Primary.main">
          {title}
        </Typography>
        {onEdit && (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={onEdit}
            sx={{ bgcolor: 'Primary.main' }}
          >
            {editButtonText}
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="flex-start" gap={2} mb={1}>
              <Typography
                variant="titleMedium4"
                color="Neutral.70"
                sx={{ minWidth: 200, maxWidth: 250 }}
              >
                {item.label}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {typeof item.value === 'object' && item.value !== null ? (
                  Object.values(item.value).map((val, idx) => (
                    <Typography key={idx} variant="titleMedium4">
                      {idx + 1} . {val as string}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="titleMedium4">{item.value}</Typography>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default BasicInfoPanel; 