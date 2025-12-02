import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { customLabelStyles } from './widgets/customLabelstyles';

interface CustomFormLabelProps {
  label: string;
  isRequired?: boolean;
  isAuth?: boolean;
}

function CustomLabel(props: CustomFormLabelProps) {
  const { label, isRequired, isAuth } = props;
  const classes = customLabelStyles();

  return (
    <Box mb={1}>
      <Typography
        sx={{
          color: 'var(--Grey-60, var(--Grey-60, #595F63)) !important',
          fontFamily: 'Roboto !important',
          fontSize: isAuth ? '14px !important' : '12px !important',
          fontStyle: 'normal !important',
          fontWeight: 500,
          lineHeight: '120% !important',
          letterSpacing: '0.024',
        }}
        className={isAuth ? classes.authLabel : classes.headerLabel}
      >
        {label}
        {isRequired && (
          <span
            className={classes.required}
            style={{
              color: 'red',
              marginLeft: '0.2rem',
            }}
          >
            *
          </span>
        )}
      </Typography>
    </Box>
  );
}

CustomLabel.propTypes = {
  label: PropTypes.string,
};

export default CustomLabel;
