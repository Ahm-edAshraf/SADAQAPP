'use client';

import React from 'react';
import { 
  Typography, 
  Card, 
  CardContent,
  Button,
  Box,
  Chip,
  LinearProgress
} from '@mui/material';
import { 
  AddCircleOutline as AddIcon,
  History as HistoryIcon,
  CheckCircleOutline as ApprovedIcon,
  HourglassEmpty as PendingIcon,
  Cancel as RejectedIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';

const MotionBox = motion(Box);

export default function BeneficiaryDashboard() {
  const { speak } = useVoice();
  
  React.useEffect(() => {
    speak('Welcome to your beneficiary dashboard. Here you can create new aid requests and track existing ones.');
  }, [speak]);
  
  // Mock data for demonstration
  const aidRequests = [
    { 
      id: 'req001', 
      type: 'Zakah', 
      amount: 350, 
      purpose: 'Medical expenses', 
      status: 'approved', 
      createdAt: '2023-10-15',
      fulfilledAmount: 250
    },
    { 
      id: 'req002', 
      type: 'Sadaqah', 
      amount: 500, 
      purpose: 'Educational fees', 
      status: 'pending', 
      createdAt: '2023-11-02',
      fulfilledAmount: 0
    },
    { 
      id: 'req003', 
      type: 'Zakah', 
      amount: 200, 
      purpose: 'Food and essentials', 
      status: 'rejected', 
      createdAt: '2023-09-20',
      fulfilledAmount: 0
    }
  ];
  
  const renderStatusChip = (status: string) => {
    switch(status) {
      case 'approved':
        return (
          <Chip 
            label="Approved"
            color="success"
            size="small"
            icon={<ApprovedIcon fontSize="small" />}
          />
        );
      case 'pending':
        return (
          <Chip 
            label="Pending"
            color="warning"
            size="small"
            icon={<PendingIcon fontSize="small" />}
          />
        );
      case 'rejected':
        return (
          <Chip 
            label="Rejected"
            color="error"
            size="small"
            icon={<RejectedIcon fontSize="small" />}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2">
            Your Aid Requests
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => speak('This would open the form to create a new financial aid request.')}
          >
            New Request
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {aidRequests.map((request) => (
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 24px)', lg: '1 1 calc(33.333% - 24px)' }, minWidth: '250px' }} key={request.id}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {request.purpose}
                    </Typography>
                    {renderStatusChip(request.status)}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Type:</strong> {request.type}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Amount:</strong> ${request.amount}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Date:</strong> {request.createdAt}
                  </Typography>
                  
                  {request.status === 'approved' && (
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Funding Progress</Typography>
                        <Typography variant="body2" fontWeight="medium">
                          ${request.fulfilledAmount} of ${request.amount}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(request.fulfilledAmount / request.amount) * 100} 
                        color="success"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  )}
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      size="small" 
                      startIcon={<HistoryIcon />}
                      onClick={() => speak(`This would show details for the ${request.purpose} request.`)}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </MotionBox>
    </>
  );
} 