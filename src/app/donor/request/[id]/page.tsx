'use client';

import React, { useState, useEffect } from 'react';
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
  TextField,
  InputAdornment,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import { 
  Favorite as HeartIcon,
  LocalHospital as MedicalIcon,
  School as EducationIcon,
  Home as HousingIcon,
  RestaurantMenu as FoodIcon,
  BusinessCenter as BusinessIcon,
  PriorityHigh as UrgentIcon,
  Verified as VerifiedIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Check as CheckIcon,
  MonetizationOn as DonationIcon,
  CreditCard as CardIcon,
  AccountBalance as BankIcon,
  Article as DocumentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Styled components
const DetailHeader = styled(Box)`
  background: linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;

const MotionHeader = motion(DetailHeader);

const PaymentMethodButton = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    border-color: #7b1fa2;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
  
  &.selected {
    border-color: #7b1fa2;
    background-color: rgba(123, 31, 162, 0.05);
    box-shadow: 0 4px 10px rgba(123, 31, 162, 0.1);
  }
`;

const DocumentCard = styled(Paper)`
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CategoryBadge = styled(Box)`
  position: absolute;
  top: -15px;
  left: 20px;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);

interface RequestDetailProps {
  params: {
    id: string;
  };
}

// Mock data for demonstration
const mockRequestDetail = {
  id: 'req-073',
  beneficiaryId: 'ben-932',
  beneficiaryInitial: 'A',
  location: 'Riyadh, Saudi Arabia',
  amount: 500,
  fulfilledAmount: 250,
  purpose: 'Medical Expenses',
  description: 'Need assistance with hospital bills for emergency surgery. I have been diagnosed with a condition that requires immediate medical attention, but I cannot afford the full cost of the procedure. Any help is greatly appreciated during this difficult time.',
  category: 'medical',
  createdAt: '2023-10-15',
  urgency: 'high',
  status: 'active',
  eligibility: 'zakah',
  verificationStatus: 'verified',
  verifiedBy: 'Local Imam',
  documents: [
    { name: 'Medical_Report.pdf', type: 'application/pdf', size: '1.2 MB' },
    { name: 'Hospital_Bill.pdf', type: 'application/pdf', size: '352 KB' }
  ],
  additionalDetails: {
    familySize: 4,
    employment: 'Unemployed due to medical condition',
    monthlyIncome: 'Currently without income',
    previousAid: 'No previous aid received'
  }
};

export default function RequestDetailPage() {
  const params = useParams();
  const requestId = params.id as string;
  const router = useRouter();
  const { speak } = useVoice();
  const [requestDetail, setRequestDetail] = useState(mockRequestDetail);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch the request details from API
    // For now, we'll use the mock data
    setTimeout(() => {
      setLoading(false);
      speak(`Aid request details loaded. This is a ${requestDetail.eligibility} request for ${requestDetail.purpose}. The beneficiary needs ${requestDetail.amount} dollars with ${requestDetail.fulfilledAmount} dollars already funded.`);
    }, 1000);
  }, [speak, requestDetail.amount, requestDetail.eligibility, requestDetail.fulfilledAmount, requestDetail.purpose]);
  
  const getProgressPercentage = () => {
    return (requestDetail.fulfilledAmount / requestDetail.amount) * 100;
  };
  
  const getCategoryIcon = () => {
    switch (requestDetail.category) {
      case 'medical':
        return <MedicalIcon fontSize="large" />;
      case 'education':
        return <EducationIcon fontSize="large" />;
      case 'housing':
        return <HousingIcon fontSize="large" />;
      case 'food':
        return <FoodIcon fontSize="large" />;
      case 'business':
        return <BusinessIcon fontSize="large" />;
      default:
        return <HeartIcon fontSize="large" />;
    }
  };
  
  const getCategoryColor = () => {
    switch (requestDetail.category) {
      case 'medical':
        return '#e91e63';
      case 'education':
        return '#2196f3';
      case 'housing':
        return '#4caf50';
      case 'food':
        return '#ff9800';
      case 'business':
        return '#9c27b0';
      default:
        return '#607d8b';
    }
  };
  
  const handleDonationAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setDonationAmount(value);
  };
  
  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    speak(`Selected ${method} as payment method`);
  };
  
  const handleNext = () => {
    if (activeStep === 0 && (!donationAmount || parseFloat(donationAmount) <= 0)) {
      speak('Please enter a valid donation amount');
      return;
    }
    
    if (activeStep === 1 && !selectedPaymentMethod) {
      speak('Please select a payment method');
      return;
    }
    
    if (activeStep === 2) {
      // Process payment
      setProcessingPayment(true);
      speak('Processing your donation payment');
      
      // Simulate processing time
      setTimeout(() => {
        setProcessingPayment(false);
        router.push('/donor/confirmation');
      }, 2000);
      return;
    }
    
    setActiveStep((prevStep) => prevStep + 1);
    
    // Voice feedback for each step
    if (activeStep === 0) {
      speak(`Donation amount set to ${donationAmount} dollars. Please select a payment method.`);
    } else if (activeStep === 1) {
      speak('Please review your donation details and confirm your payment.');
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const steps = ['Donation Amount', 'Payment Method', 'Review & Confirm'];
  
  if (loading) {
    return (
      <PageLayout>
        <Container sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Loading Request Details...
          </Typography>
        </Container>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <MotionHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Aid Request
          </Typography>
          <Chip 
            icon={requestDetail.urgency === 'high' ? <UrgentIcon /> : undefined}
            label={requestDetail.urgency === 'high' ? 'Urgent Need' : 'Regular Need'} 
            color={requestDetail.urgency === 'high' ? 'error' : 'default'} 
            variant="filled" 
            sx={{ fontWeight: 'bold', px: 1 }}
          />
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Request ID: {requestDetail.id}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <LocationIcon fontSize="small" />
          <Typography variant="body2">
            {requestDetail.location}
          </Typography>
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <TimeIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">
              Posted on {new Date(requestDetail.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </MotionHeader>
      
      <MotionContainer 
        maxWidth="lg" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Grid container spacing={4}>
          {/* Request details section */}
          <Grid item xs={12} md={7}>
            <MotionPaper 
              elevation={3} 
              sx={{ p: 3, mb: 4, position: 'relative', overflow: 'hidden', borderRadius: 2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CategoryBadge sx={{ bgcolor: getCategoryColor() }}>
                {requestDetail.category.charAt(0).toUpperCase() + requestDetail.category.slice(1)}
              </CategoryBadge>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3, mb: 3 }}>
                <Avatar sx={{ bgcolor: getCategoryColor(), width: 60, height: 60 }}>
                  {getCategoryIcon()}
                </Avatar>
              </Box>
              
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                {requestDetail.purpose}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                <Chip 
                  icon={<VerifiedIcon />} 
                  label="Verified" 
                  color="success" 
                  variant="outlined" 
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={requestDetail.eligibility === 'zakah' ? 'Zakah Eligible' : 'Sadaqah'} 
                  color={requestDetail.eligibility === 'zakah' ? 'primary' : 'secondary'} 
                  variant="outlined" 
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body1" paragraph>
                {requestDetail.description}
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Supporting Documents
                </Typography>
                
                {requestDetail.documents.map((doc, index) => (
                  <DocumentCard key={index} elevation={1}>
                    <DocumentIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {doc.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {doc.size} • {doc.type}
                      </Typography>
                    </Box>
                  </DocumentCard>
                ))}
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Additional Information
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Family Size" 
                      secondary={requestDetail.additionalDetails.familySize} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Employment Status" 
                      secondary={requestDetail.additionalDetails.employment} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Monthly Income" 
                      secondary={requestDetail.additionalDetails.monthlyIncome} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Previous Aid" 
                      secondary={requestDetail.additionalDetails.previousAid} 
                    />
                  </ListItem>
                </List>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Verification Status
                </Typography>
                
                <Alert 
                  icon={<VerifiedIcon />}
                  severity="success"
                  sx={{ mb: 2 }}
                >
                  This request has been verified by {requestDetail.verifiedBy}
                </Alert>
              </Box>
            </MotionPaper>
          </Grid>
          
          {/* Donation section */}
          <Grid item xs={12} md={5}>
            <MotionPaper 
              elevation={3} 
              sx={{ p: 3, mb: 4, borderRadius: 2, position: 'sticky', top: 100 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Donation Details
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Total Amount Needed
                </Typography>
                <Typography variant="h5" color="primary.main" fontWeight="bold">
                  ${requestDetail.amount}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Funded so far: ${requestDetail.fulfilledAmount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getProgressPercentage().toFixed(0)}%
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, height: 10, overflow: 'hidden' }}>
                  <Box 
                    sx={{ 
                      width: `${getProgressPercentage()}%`, 
                      bgcolor: 'primary.main', 
                      height: '100%',
                      transition: 'width 1s ease-in-out'
                    }} 
                  />
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              
              <Box sx={{ mt: 3 }}>
                {activeStep === 0 && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      How much would you like to donate?
                    </Typography>
                    <TextField
                      fullWidth
                      label="Amount"
                      variant="outlined"
                      value={donationAmount}
                      onChange={handleDonationAmountChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      helperText={`Remaining need: $${requestDetail.amount - requestDetail.fulfilledAmount}`}
                      sx={{ mb: 3 }}
                    />
                    
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Donation Type
                      </Typography>
                      <RadioGroup
                        defaultValue={requestDetail.eligibility}
                        name="donation-type-group"
                      >
                        <FormControlLabel 
                          value="zakah" 
                          control={<Radio />} 
                          label="Count as Zakah" 
                          disabled={requestDetail.eligibility === 'sadaqah'}
                        />
                        <FormControlLabel 
                          value="sadaqah" 
                          control={<Radio />} 
                          label="Count as Sadaqah" 
                        />
                      </RadioGroup>
                    </FormControl>
                  </>
                )}
                
                {activeStep === 1 && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Select a payment method
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12}>
                        <PaymentMethodButton 
                          className={selectedPaymentMethod === 'credit_card' ? 'selected' : ''}
                          onClick={() => handlePaymentMethodSelect('credit_card')}
                        >
                          <CardIcon sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              Credit / Debit Card
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Visa, Mastercard, Amex
                            </Typography>
                          </Box>
                        </PaymentMethodButton>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <PaymentMethodButton 
                          className={selectedPaymentMethod === 'bank_transfer' ? 'selected' : ''}
                          onClick={() => handlePaymentMethodSelect('bank_transfer')}
                        >
                          <BankIcon sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              Bank Transfer
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Direct bank to bank transfer
                            </Typography>
                          </Box>
                        </PaymentMethodButton>
                      </Grid>
                    </Grid>
                  </>
                )}
                
                {activeStep === 2 && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Review Donation
                    </Typography>
                    
                    <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2, mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Donation Amount
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          ${donationAmount}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Donation Type
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {requestDetail.eligibility === 'zakah' ? 'Zakah' : 'Sadaqah'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Method
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedPaymentMethod === 'credit_card' ? 'Credit/Debit Card' : 'Bank Transfer'}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <FormControlLabel
                      control={<Radio checked={true} />}
                      label="I agree to share my donation data on the blockchain ledger for transparency"
                    />
                  </>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0 || processingPayment}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={processingPayment}
                    startIcon={processingPayment ? <CircularProgress size={20} /> : null}
                  >
                    {processingPayment ? 'Processing...' : 
                     activeStep === steps.length - 1 ? 'Confirm Donation' : 'Continue'}
                  </Button>
                </Box>
              </Box>
            </MotionPaper>
          </Grid>
        </Grid>
      </MotionContainer>
    </PageLayout>
  );
} 