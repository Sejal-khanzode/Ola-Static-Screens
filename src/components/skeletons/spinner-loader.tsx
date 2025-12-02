import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  message?: string;
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  fullScreen = false,
  message = 'Loading...'
}) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: fullScreen ? '100vh' : '100%',
    width: fullScreen ? '100vw' : '100%',
    backgroundColor: fullScreen ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
    position: fullScreen ? 'fixed' as const : 'relative' as const,
    top: 0,
    left: 0,
    zIndex: fullScreen ? 9999 : 'auto'
  };

  const spinnerStyles = {
    animation: `${pulseAnimation} 2s ease-in-out infinite`,
    color: 'primary.main'
  };

  return (
    <Fade in={true}>
      <Box sx={containerStyles}>
        <CircularProgress 
          size={sizeMap[size]} 
          thickness={4}
          sx={spinnerStyles}
        />
        {message && (
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2,
              color: 'text.secondary',
              animation: `${pulseAnimation} 2s ease-in-out infinite`
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Fade>
  );
};

export default LoadingSpinner; 