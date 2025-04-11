'use client';

import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent,
  Paper,
  Button
} from '@mui/material';
import { 
  HandshakeOutlined, 
  FavoriteBorder, 
  ArrowForward
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useVoice } from '@/lib/VoiceContext';
import { useAuth } from '@/lib/AuthContext';
import { setUserRole } from '@/lib/auth';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const RoleContainer = styled(Container)`
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

const RoleCard = styled(Paper)<{ active?: boolean }>`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  
  ${props => props.active && `
    border-color: #2c87f0;
    transform: translateY(-8px);
    box-shadow: 0 12px 20px -10px rgba(44, 135, 240, 0.3);
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
`;

const BeneficiaryIconContainer = styled(IconContainer)`
  background-color: rgba(44, 135, 240, 0.1);
  color: #2c87f0;
  
  ${RoleCard}:hover & {
    background-color: rgba(44, 135, 240, 0.2);
  }
  
  ${RoleCard}[active="true"] & {
    background-color: rgba(44, 135, 240, 0.2);
  }
`;

const DonorIconContainer = styled(IconContainer)`
  background-color: rgba(162, 137, 88, 0.1);
  color: #a28958;
  
  ${RoleCard}:hover & {
    background-color: rgba(162, 137, 88, 0.2);
  }
  
  ${RoleCard}[active="true"] & {
    background-color: rgba(162, 137, 88, 0.2);
  }
`;

const MotionContainer = motion(Box);

export default function RoleSelectionPage() {
  const router = useRouter();
  const { speak } = useVoice();
  const { user, updateUserRole } = useAuth();
  const [selectedRole, setSelectedRole] = React.useState<'beneficiary' | 'donor' | null>(user?.role || null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  useEffect(() => {
    speak('Please select your role. Are you looking to request financial aid, or would you like to make a donation?');
  }, [speak]);
  
  const handleRoleSelect = (role: 'beneficiary' | 'donor') => {
    setSelectedRole(role);
    
    if (role === 'beneficiary') {
      speak('You selected beneficiary. You will be able to request financial aid.');
    } else {
      speak('You selected donor. You will be able to make donations to help others.');
    }
  };
  
  const handleContinue = async () => {
    if (!selectedRole || !user) return;
    
    setIsSubmitting(true);
    try {
      // Update role in the database via the server action
      const result = await setUserRole(user.id, selectedRole);
      
      if (result.success) {
        // Update client-side auth context
        updateUserRole(selectedRole);
        
        // Navigate to the appropriate dashboard
        if (selectedRole === 'beneficiary') {
          router.push('/beneficiary');
        } else if (selectedRole === 'donor') {
          router.push('/donor');
        }
      } else {
        console.error(result.message);
        speak('Sorry, there was a problem setting your role. Please try again.');
      }
    } catch (error) {
      console.error('Error setting user role:', error);
      speak('Sorry, there was a problem setting your role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <RoleContainer>
      <LogoContainer>
        <Link href="/" passHref>
          <Box sx={{ cursor: 'pointer' }}>
            <Image src="/logo.svg" alt="SADAQAPP Logo" width={60} height={60} />
          </Box>
        </Link>
        <Typography variant="h5" component="h1" sx={{ mt: 1, fontWeight: 'bold' }}>
          Select Your Role
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: '600px', mt: 1 }}>
          Choose how you'd like to use SADAQAPP. You can always change your role later.
        </Typography>
      </LogoContainer>
      
      <MotionContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ width: '100%', maxWidth: '900px' }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          <Box sx={{ flex: 1, width: '100%' }}>
            <RoleCard 
              elevation={selectedRole === 'beneficiary' ? 8 : 2} 
              active={selectedRole === 'beneficiary'}
              onClick={() => handleRoleSelect('beneficiary')}
            >
              <BeneficiaryIconContainer>
                <HandshakeOutlined sx={{ fontSize: 40 }} />
              </BeneficiaryIconContainer>
              <Typography variant="h5" component="h2" gutterBottom>
                I Need Help
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Request financial aid through Zakah or Sadaqah. Our platform will connect you with donors.
              </Typography>
              <Typography variant="body2" sx={{ mt: 'auto', fontWeight: '500', color: '#2c87f0' }}>
                Select to request financial aid
              </Typography>
            </RoleCard>
          </Box>
          
          <Box sx={{ flex: 1, width: '100%' }}>
            <RoleCard 
              elevation={selectedRole === 'donor' ? 8 : 2} 
              active={selectedRole === 'donor'}
              onClick={() => handleRoleSelect('donor')}
            >
              <DonorIconContainer>
                <FavoriteBorder sx={{ fontSize: 40 }} />
              </DonorIconContainer>
              <Typography variant="h5" component="h2" gutterBottom>
                I Want to Donate
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Make a difference by donating to those in need through our transparent, Shariah-compliant platform.
              </Typography>
              <Typography variant="body2" sx={{ mt: 'auto', fontWeight: '500', color: '#a28958' }}>
                Select to make donations
              </Typography>
            </RoleCard>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            disabled={!selectedRole || isSubmitting}
            onClick={handleContinue}
            endIcon={<ArrowForward />}
            sx={{ px: 4, py: 1.5, borderRadius: '28px' }}
          >
            {isSubmitting 
              ? 'Saving...' 
              : `Continue as ${selectedRole === 'beneficiary' ? 'Beneficiary' : selectedRole === 'donor' ? 'Donor' : '...'}`
            }
          </Button>
        </Box>
      </MotionContainer>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Not sure? You can change your role anytime from your profile settings.
        </Typography>
      </Box>
    </RoleContainer>
  );
} 