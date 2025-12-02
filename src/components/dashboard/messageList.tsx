import { Box, Typography, Paper, Avatar, Badge } from '@mui/material';
import React from 'react';
import { dashboardConstants } from '../../constants/dashboard-constants';
import {messagesData} from '../../components/core/reusable/mock-data/all-mock-data'


const MessagesList: React.FC = () => {
  return (
    <Paper
      sx={{
        p: 2,
        boxShadow: 2,
        borderRadius: 0.5,
        width: '100%',
        maxWidth: { xl: 600 },
        mx: { md: 'auto' },
      }}
    >
      <Typography variant="bodyMedium3" sx={{ mb: 2 }}>{dashboardConstants.MESSAGES}</Typography>
      <Box>
        {messagesData.map((message) => (
          <Box key={message.id} sx={{ display: 'flex', alignItems: 'center', pb: 1.5, mb: 1.5, borderBottom: '1px solid #e0e0e0' }}>
            <Avatar src={message.avatar} sx={{ mr: 1.5 }} />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="bodyMedium5">{message.sender}</Typography>
              <Typography variant="bodyMedium5">{message.preview}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", ml: 2 }}>
              {message.unreadCount !== undefined && message.unreadCount > 0 && (
                <Badge 
                  badgeContent={message.unreadCount} 
                  sx={{
                    marginBottom: '4px',
                    '& .MuiBadge-badge': {
                      backgroundColor: 'Primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      minWidth: '18px',
                      height: '18px',
                      padding: '0 4px'
                    }
                  }}
                />
              )}
              <Typography variant="bodyMedium5" color="Neutral.60">{message.time}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default MessagesList; 