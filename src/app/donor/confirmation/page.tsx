'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  CheckCircle as SuccessIcon,
  Receipt as ReceiptIcon,
  AccessTime as TimeIcon,
  Verified as VerifiedIcon,
  Share as ShareIcon,
  ArrowForward as ArrowIcon,
  HomeOutlined as HomeIcon,
  VisibilityOutlined as ViewIcon,
  FavoriteBorder as FavoriteIcon,
  AssignmentTurnedIn as TaskIcon,
  PriorityHigh as PriorityIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import confetti from 'canvas-confetti';

// Styled components
const ConfirmationContainer = styled(Box)`
  text-align: center;
  padding: 2rem 0;
`;

const SuccessCircle = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 8px 16px rgba(76, 175, 80, 0.3);
`;

const TransactionCard = styled(Card)`
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #4caf50;
  }
`;

const DetailsRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const NextStepsCard = styled(Card)`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f0 100%);
  margin-top: 2rem;
`;

const MotionContainer = motion(Container);

// Mock transaction data
const mockTransaction = {
  id: 'tx-7891234',
  amount: 500,
  date: new Date().toISOString(),
  type: 'zakah',
  paymentMethod: 'Credit Card',
  beneficiary: {
    requestId: 'req-567',
    purpose: 'Medical Expenses',
    location: 'Riyadh, Saudi Arabia'
  },
  blockchain: {
    blockId: '12458',
    hash: '0x3a9f7b2c1d8e4f5a6b7c8d9e0f1a2b3c4d5e6f7a'
  }
};

export default function DonationConfirmationPage() {
  const { speak } = useVoice();
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    speak('Congratulations! Your donation has been successfully processed. Thank you for your generosity.');
    
    // Trigger confetti animation
    setTimeout(() => {
      setShowConfetti(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Second confetti burst after a small delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.6 }
        });
        
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.6 }
        });
      }, 500);
      
    }, 800);
  }, [speak]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <PageLayout>
      <MotionContainer 
        maxWidth="md" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ConfirmationContainer>
          <SuccessCircle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
          >
            <SuccessIcon sx={{ fontSize: 60 }} />
          </SuccessCircle>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              Donation Successful!
            </Typography>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Thank you for your generosity and support
            </Typography>
            <Chip 
              icon={<VerifiedIcon />} 
              label="Verified Transaction" 
              color="success" 
              sx={{ mb: 4, px: 2, py: 3, fontSize: '1rem' }} 
            />
          </motion.div>
        </ConfirmationContainer>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Paper elevation={3} sx={{ mb: 4, p: 3, position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Transaction Details
            </Typography>
            
            <DetailsRow>
              <Typography variant="body1" color="text.secondary">Transaction ID</Typography>
              <Typography variant="body1" fontWeight="medium">{mockTransaction.id}</Typography>
            </DetailsRow>
            
            <DetailsRow>
              <Typography variant="body1" color="text.secondary">Date & Time</Typography>
              <Typography variant="body1">{formatDate(mockTransaction.date)}</Typography>
            </DetailsRow>
            
            <DetailsRow>
              <Typography variant="body1" color="text.secondary">Amount</Typography>
              <Typography variant="h6" color="primary.main" fontWeight="bold">${mockTransaction.amount}</Typography>
            </DetailsRow>
            
            <DetailsRow>
              <Typography variant="body1" color="text.secondary">Payment Method</Typography>
              <Typography variant="body1">{mockTransaction.paymentMethod}</Typography>
            </DetailsRow>
            
            <DetailsRow>
              <Typography variant="body1" color="text.secondary">Donation Type</Typography>
              <Chip 
                label={mockTransaction.type === 'zakah' ? 'Zakah' : 'Sadaqah'} 
                color={mockTransaction.type === 'zakah' ? 'success' : 'secondary'}
                size="small"
              />
            </DetailsRow>
            
            <DetailsRow>
              <Typography variant="body1" color="text.secondary">Purpose</Typography>
              <Typography variant="body1">{mockTransaction.beneficiary.purpose}</Typography>
            </DetailsRow>
            
            <DetailsRow>
              <Typography variant="body1" color="text.secondary">Recipient Location</Typography>
              <Typography variant="body1">{mockTransaction.beneficiary.location}</Typography>
            </DetailsRow>
            
            <DetailsRow>
              <Typography variant="body1" color="text.secondary">Blockchain Reference</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mr: 1 }}>
                  Block {mockTransaction.blockchain.blockId}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  component={Link}
                  href="/blockchain"
                >
                  View
                </Button>
              </Box>
            </DetailsRow>
          </Paper>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Your Impact
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FavoriteIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Making a Difference
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Your donation will directly help someone in need with their {mockTransaction.beneficiary.purpose.toLowerCase()}.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    100% of your donation goes to the beneficiary, with all platform costs covered separately.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TaskIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Shariah Compliance
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Your {mockTransaction.type === 'zakah' ? 'Zakah' : 'Sadaqah'} donation has been processed according to Islamic principles.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The transaction is recorded on our transparent blockchain ledger for accountability.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <NextStepsCard elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Next Steps
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ReceiptIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Receipt Sent" 
                    secondary="A receipt has been sent to your email for your records." 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <TimeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Track Progress" 
                    secondary="You can track the impact of your donation in your donor dashboard." 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <ViewIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="View Blockchain Record" 
                    secondary="Your donation is permanently recorded on our blockchain ledger for transparency." 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PriorityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Explore More Requests" 
                    secondary="Continue browsing other aid requests that need support." 
                  />
                </ListItem>
              </List>
            </CardContent>
          </NextStepsCard>
        </motion.div>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, mb: 6 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<HomeIcon />}
            component={Link}
            href="/donor"
          >
            Return to Dashboard
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            startIcon={<ShareIcon />}
          >
            Share Your Impact
          </Button>
        </Box>
      </MotionContainer>
    </PageLayout>
  );
} 