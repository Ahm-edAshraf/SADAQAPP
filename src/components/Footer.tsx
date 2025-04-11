'use client';

import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink, Divider } from '@mui/material';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useVoice } from '@/lib/VoiceContext';

const FooterContainer = styled(Box)`
  background-color: #ffffff;
  color: #171717;
  padding: 2rem 0;
  margin-top: 4rem;
`;

const FooterHeading = styled(Typography)`
  font-weight: 600;
  margin-bottom: var(--spacing-4);
`;

const StyledLink = styled(Link)`
  color: var(--card-foreground);
  display: block;
  margin-bottom: var(--spacing-2);
  text-decoration: none;
  
  &:hover {
    color: var(--primary-500);
    text-decoration: underline;
  }
`;

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <StyledLink href={href} passHref>
    <Typography component="span" variant="body2">
      {children}
    </Typography>
  </StyledLink>
);

const VoiceIndicator = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: var(--spacing-4);
  font-style: italic;
`;

export default function Footer() {
  const { voiceEnabled } = useVoice();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FooterHeading variant="h6">SADAQAPP</FooterHeading>
            <Typography variant="body2" paragraph>
              A Shariah-compliant fintech platform helping low-income users manage finances, request aid, and make donations with voice-first interactions.
            </Typography>
            {voiceEnabled && (
              <VoiceIndicator>
                <Typography variant="body2" color="text.secondary">
                  Voice commands are enabled
                </Typography>
              </VoiceIndicator>
            )}
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <FooterHeading variant="h6">Quick Links</FooterHeading>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/beneficiary">Request Aid</FooterLink>
            <FooterLink href="/donor">Make Donation</FooterLink>
            <FooterLink href="/blockchain">Blockchain Ledger</FooterLink>
            <FooterLink href="/education">Financial Education</FooterLink>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <FooterHeading variant="h6">Support</FooterHeading>
            <FooterLink href="/help">Help & FAQ</FooterLink>
            <FooterLink href="/settings">Accessibility Settings</FooterLink>
            <FooterLink href="/profile">Your Profile</FooterLink>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} SADAQAPP. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Link href="/privacy" passHref>
              <MuiLink color="inherit" sx={{ cursor: 'pointer' }}>Privacy Policy</MuiLink>
            </Link>
            {' '}•{' '}
            <Link href="/terms" passHref>
              <MuiLink color="inherit" sx={{ cursor: 'pointer' }}>Terms of Service</MuiLink>
            </Link>
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
} 