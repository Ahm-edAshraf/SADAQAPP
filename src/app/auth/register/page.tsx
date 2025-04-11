'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Card, 
  CardContent,
  CircularProgress,
  InputAdornment,
  Alert
} from '@mui/material';
import { 
  Phone as PhoneIcon, 
  Sms as SmsIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useVoice } from '@/lib/VoiceContext';
import { useAuth } from '@/lib/AuthContext';
import { signUp, verifySignUp } from '@/lib/auth';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { getDemoVerificationCode } from '@/lib/seed';

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

// Demo verification info component to handle the demo code
const DemoVerificationInfo = ({ onCodeReady }: { onCodeReady: (code: string) => void }) => {
  const code = getDemoVerificationCode();
  
  return (
    <Box 
      sx={{ 
        mb: 2, 
        p: 1.5, 
        bgcolor: 'rgba(25, 118, 210, 0.08)', 
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <SmsIcon fontSize="small" color="primary" />
      <Typography variant="body2">
        Demo code: <strong>{code}</strong>
      </Typography>
      <Button 
        size="small" 
        variant="outlined" 
        onClick={() => onCodeReady(code)}
        sx={{ ml: 'auto' }}
      >
        Autofill
      </Button>
    </Box>
  );
};

export default function RegisterPage() {
  const router = useRouter();
  const { speak } = useVoice();
  const { setUser } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    // Voice guidance on page load
    if (step === 0) {
      speak('Please enter your details to create a new account.');
    } else if (step === 1) {
      speak('Please enter the 6-digit verification code sent to your phone.');
    }
  }, [step, speak]);
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (phoneError) setPhoneError('');
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameError) setNameError('');
  };
  
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only allow digits, max 6
    setOtp(value);
    if (otpError) setOtpError('');
  };
  
  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setPhoneError('Please enter a valid phone number');
      speak('Please enter a valid phone number with at least 10 digits.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call the registration server action
      const formData = new FormData();
      formData.append('phoneNumber', phoneNumber);
      
      const result = await signUp(formData);
      
      if (result.success) {
        // Move to OTP verification step
        setStep(1);
        setSuccessMessage(result.message || `Verification code sent to ${phoneNumber}`);
        speak(`Verification code sent to your phone number. Please check your messages.`);
      } else {
        setPhoneError(result.message || 'Failed to send verification code');
        speak(result.message || 'Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setPhoneError('An unexpected error occurred. Please try again.');
      speak('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter all 6 digits of the verification code');
      speak('Please enter all 6 digits of the verification code.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call the verification server action
      const formData = new FormData();
      formData.append('phoneNumber', phoneNumber);
      formData.append('otp', otp);
      
      const result = await verifySignUp(formData);
      
      if (result.success && result.user) {
        setSuccessMessage('Registration successful!');
        speak('Registration successful! Redirecting to role selection.');
        
        // Update auth context with the user
        setUser(result.user);
        
        // Redirect to role selection
        setTimeout(() => {
          router.push('/auth/role-selection');
        }, 1500);
      } else {
        setOtpError(result.message || 'Invalid verification code');
        speak(result.message || 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setOtpError('An unexpected error occurred. Please try again.');
      speak('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContainer>
      <LogoContainer>
        <Link href="/" passHref>
          <Box sx={{ cursor: 'pointer' }}>
            <Image src="/logo.svg" alt="SADAQAPP Logo" width={60} height={60} />
          </Box>
        </Link>
        <Typography variant="h5" component="h1" sx={{ mt: 1, fontWeight: 'bold' }}>
          Create SADAQAPP Account
        </Typography>
      </LogoContainer>
      
      <AuthCard elevation={4}>
        <CardContent sx={{ p: 4 }}>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          
          {step === 0 ? (
            <MotionContainer
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" gutterBottom>
                Your Information
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please enter your details to create an account.
              </Typography>
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your Name"
                value={name}
                onChange={handleNameChange}
                error={!!nameError}
                helperText={nameError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mt: 2, mb: 2 }}
                autoFocus
              />
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Phone Number (e.g., +1234567890)"
                value={phoneNumber}
                onChange={handlePhoneChange}
                error={!!phoneError}
                helperText={phoneError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSendOtp}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SmsIcon />}
                sx={{ mt: 2 }}
              >
                {loading ? 'Sending Code...' : 'Send Verification Code'}
              </Button>
            </MotionContainer>
          ) : (
            <MotionContainer
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Button 
                  startIcon={<ArrowBackIcon />} 
                  onClick={() => {
                    setStep(0);
                    setOtp('');
                    setOtpError('');
                    setSuccessMessage('');
                  }}
                >
                  Back
                </Button>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Verify Your Phone
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Enter the 6-digit code sent to {phoneNumber}
              </Typography>
              
              <DemoVerificationInfo onCodeReady={setOtp} />
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder="6-digit code"
                value={otp}
                onChange={handleOtpChange}
                error={!!otpError}
                helperText={otpError}
                type="text"
                inputProps={{
                  maxLength: 6,
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SmsIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mt: 2 }}
                autoFocus
              />
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleVerifyOtp}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{ mt: 3 }}
              >
                {loading ? 'Verifying...' : 'Verify & Complete Registration'}
              </Button>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                  variant="text"
                  disabled={loading}
                  onClick={() => {
                    setOtp('');
                    setOtpError('');
                    handleSendOtp();
                  }}
                >
                  Resend Code
                </Button>
              </Box>
            </MotionContainer>
          )}
        </CardContent>
      </AuthCard>
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Link href="/auth/login" passHref>
            <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 500 }}>
              Log In
            </Box>
          </Link>
        </Typography>
      </Box>
    </AuthContainer>
  );
} 