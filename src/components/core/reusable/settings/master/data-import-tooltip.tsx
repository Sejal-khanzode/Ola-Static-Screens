import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Popper,
  ClickAwayListener,
  IconButton,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface DataImportTooltipProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  data: {
    totalRecords?: number;
    passedRecords?: number;
    failedRecords?: number;
    fileUrl?: string;
  } | null;
}

const DataImportTooltip: React.FC<DataImportTooltipProps> = ({
  open,
  anchorEl,
  onClose,
  data,
}) => {
  if (!data) return null;

  const handleDownload = () => {
    if (data.fileUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = data.fileUrl;
      link.download = 'failed-records.csv'; // You can customize the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    onClose();
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      sx={{ zIndex: 1300 }}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          elevation={8}
          sx={{
            p: 2,
            minWidth: 200,
            maxWidth: 250,
            border: '1px solid #e0e0e0',
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Total Records */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Total:
              </Typography>
              <Typography variant="body2" fontWeight="medium" color="#1976d2">
                {data.totalRecords || 0}
              </Typography>
            </Box>

            {/* Passed Records */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Passed:
              </Typography>
              <Typography variant="body2" fontWeight="medium" color="#388e3c">
                {data.passedRecords || 0}
              </Typography>
            </Box>

            {/* Failed Records with Download */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Failed:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" fontWeight="medium" color="#d32f2f">
                  {data.failedRecords || 0}
                </Typography>
                {data.failedRecords && data.failedRecords > 0 && data.fileUrl && (
                  <IconButton
                    size="small"
                    onClick={handleDownload}
                    sx={{
                      color: '#d32f2f',
                      padding: '2px',
                      '&:hover': {
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                      },
                    }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default DataImportTooltip; 