'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Card, 
  CardContent,
  Container 
} from '@mui/material';
import { motion } from 'framer-motion';
import { Lock as LockIcon, Phone as PhoneIcon } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useVoice } from '@/lib/VoiceContext';
import styled from '@emotion/styled';

const AuthContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const LogoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  margin-bottom: 2rem;
  overflow: visible;
`;

const MotionContainer = motion(Box);

export default function AuthPage() {
  const { speak } = useVoice();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      speak('Welcome to SADAQAPP. Please register or log in to continue.');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [speak]);
  
  if (loading) {
    return (
      <AuthContainer>
        <MotionContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image 
            src="/logo.svg" 
            alt="SADAQAPP Logo" 
            width={180} 
            height={180}
            className="pulse"
          />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              mt: 4, 
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #2c87f0, #a28958)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SADAQAPP
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, opacity: 0.7 }}>
            Loading your secure financial platform...
          </Typography>
        </MotionContainer>
      </AuthContainer>
    );
  }
  
  return (
    <AuthContainer>
      <LogoContainer>
        <Image src="/logo.svg" alt="SADAQAPP Logo" width={100} height={100} />
        <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: 'bold' }}>
          SADAQAPP
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Voice-First, Inclusive Financial Aid Platform
        </Typography>
      </LogoContainer>
      
      <MotionContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AuthCard elevation={4}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Access your Shariah-compliant financial aid platform
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PhoneIcon />}
                component={Link}
                href="/auth/register"
                sx={{ py: 1.5 }}
              >
                Register with Phone Number
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<LockIcon />}
                component={Link}
                href="/auth/login"
                sx={{ py: 1.5 }}
              >
                Log In
              </Button>
            </Box>
          </CardContent>
        </AuthCard>
      </MotionContainer>
      
      <Typography variant="body2" color="text.secondary" align="center">
        By continuing, you agree to our{' '}
        <Link href="/terms" passHref>
          <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
            Terms of Service
          </Box>
        </Link>{' '}
        and{' '}
        <Link href="/privacy" passHref>
          <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
            Privacy Policy
          </Box>
        </Link>
      </Typography>
    </AuthContainer>
  );
} 