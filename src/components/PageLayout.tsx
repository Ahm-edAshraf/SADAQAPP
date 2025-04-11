'use client';

import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from '@emotion/styled';

const ContentContainer = styled(Container)`
  padding-top: var(--spacing-8);
  padding-bottom: var(--spacing-8);
  min-height: calc(100vh - 64px - 300px); /* Navbar height is 64px, approximately 300px for footer */
`;

type PageLayoutProps = {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
};

export default function PageLayout({ children, maxWidth = 'lg' }: PageLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <ContentContainer maxWidth={maxWidth}>
        {children}
      </ContentContainer>
      <Footer />
    </Box>
  );
} 