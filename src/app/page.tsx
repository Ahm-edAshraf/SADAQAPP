'use client';

import React, { useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { 
  Handshake as HandshakeIcon, 
  Favorite as DonationIcon, 
  School as SchoolIcon,
  AccountBalance as AccountBalanceIcon 
} from '@mui/icons-material';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import { useVoice } from '@/lib/VoiceContext';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const HeroSection = styled(Box)`
  background: linear-gradient(135deg, #1866d0 0%, #183c73 100%);
  color: white;
  padding: 4rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const FeatureCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

// Create a styled component that wraps a Next.js Link
const StyledLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: block;
`;

const MotionBox = motion(Box);

export default function HomePage() {
  const { speak } = useVoice();
  
  useEffect(() => {
    // Welcome message when the page loads
    speak('Welcome to SADAQAPP - Your Voice-First, Inclusive Financial Aid Platform.');
  }, [speak]);
  
  const features = [
    {
      title: 'Request Financial Aid',
      description: 'Submit Zakah or Sadaqah requests easily with voice guidance and accessibility options.',
      icon: <HandshakeIcon fontSize="large" color="primary" />,
      link: '/beneficiary'
    },
    {
      title: 'Make a Donation',
      description: 'Browse verified aid requests and contribute directly to those in need.',
      icon: <DonationIcon fontSize="large" color="primary" />,
      link: '/donor'
    },
    {
      title: 'Blockchain Transparency',
      description: 'View all transactions on our immutable blockchain ledger for complete transparency.',
      icon: <AccountBalanceIcon fontSize="large" color="primary" />,
      link: '/blockchain'
    },
    {
      title: 'Financial Education',
      description: 'Access educational resources on Islamic finance and basic financial literacy.',
      icon: <SchoolIcon fontSize="large" color="primary" />,
      link: '/education'
    }
  ];
  
  return (
    <PageLayout>
      <HeroSection>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            SADAQAPP
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Voice-First, Inclusive Financial Aid Platform
          </Typography>
          <Typography variant="h6" component="h3" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            A Shariah-compliant fintech platform helping low-income users 
            manage finances, request aid, and make donations with voice-first interactions.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              href="/beneficiary"
              component="a"
              sx={{ borderRadius: '0.375rem' }}
            >
              Request Aid
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              href="/donor"
              component="a"
              sx={{ borderRadius: '0.375rem' }}
            >
              Make a Donation
            </Button>
          </Box>
        </MotionBox>
      </HeroSection>
      
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        How SADAQAPP Works
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
        Our platform connects those in need with generous donors, all through a secure,
        voice-guided interface that prioritizes accessibility and transparency.
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledLink href={feature.link}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{ height: '100%' }}
              >
                <FeatureCard>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </MotionBox>
            </StyledLink>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ bgcolor: '#f8f7f2', p: 4, borderRadius: '0.5rem', mb: 6 }}>
        <Typography variant="h3" component="h3" gutterBottom align="center">
          Voice-First Experience
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Our platform is designed to be fully accessible through voice commands.
          Try saying "Go to dashboard", "Make a donation", or "Request aid" to navigate.
        </Typography>
      </Box>
    </PageLayout>
  );
}
