'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { useVoice } from '@/lib/VoiceContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enable voice guidance for the entire auth flow
  const { speak } = useVoice();
  
  return (
    <Box 
      component="main" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default'
      }}
    >
      {children}
    </Box>
  );
} 