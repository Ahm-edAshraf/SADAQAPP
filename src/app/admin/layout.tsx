import React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'SADAQAPP - Admin Dashboard',
  description: 'SADAQAPP Admin Dashboard for managing users, requests, and donations',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1,
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      {children}
    </Box>
  );
} 