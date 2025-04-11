'use client';

import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Typography, Box, Container, Paper } from '@mui/material';
import { useAuth } from '@/lib/AuthContext';

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  
  return (
    <PageLayout>
      <Container sx={{ py: 4 }}>
        <Paper 
          elevation={2}
          sx={{ p: 3, mb: 4, borderRadius: 2, position: 'relative', overflow: 'hidden' }}
        >
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '5px', height: '100%', bgcolor: 'secondary.main' }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Donor Portal
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome{user?.name ? `, ${user.name}` : ''} to your donor dashboard. Here you can browse aid requests and make donations.
          </Typography>
        </Paper>
        
        {children}
      </Container>
    </PageLayout>
  );
} 