export const customDialogStyles = {
  dialog: {
    '& .MuiDialogContent-root': {
      padding: 10,
      backgroundColor: '#FFFFFF',
    },
    '& .MuiDialogActions-root': {
      padding: 10,
      backgroundColor: '#FFFFFF',
    },
  },
  dialogTitle: {
    color: '000000',
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
  },

  closeIcon: {
    color: '000000',
  },
};

export const cancelButtonStyles = {
  borderRadius: 'var(--1, 8px)',
  border: '1px solid var(--Grey-07, #727272)',
  color: 'var(--Grey-07, #727272)',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '120%',
  letterSpacing: '0.056px',
  width: '100%',
  textTransform: 'inherit',
  padding: '8px 16px',
};

export const saveButtonStyles = {
  borderRadius: 'var(--1, 8px)',
  border: '1px solid var(--Error-60, #F04438)',
  background: 'var(--Error-07, #D92D20)',
  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  color: 'var(--Solid-White, #FFF)',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '120%',
  letterSpacing: '0.056px',
  width: '100%',
  textTransform: 'inherit',
  padding: '8px 16px',
  '&:hover': {
    color: 'var(--Solid-White, #FFF)',
    background: 'var(--Error-07, #D92D20)',
  },
  '&.Mui-disabled': {
    color: 'var(--Solid-White, #FFF) !important',
    pointerEvents: 'fill',
    cursor: 'pointer',
  },
};

export const headerStyles = {
  color: 'var(--Grey-09, #393939)',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '120%',
  letterSpacing: '0.09px',
};

export const labelContent = {
  color: 'var(--Grey-06, #8F8F8F)',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: '0.035px',
};

export const subLabelContent = {
  color: 'var(--Grey-06, #565656)',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: '0.035px',
};
