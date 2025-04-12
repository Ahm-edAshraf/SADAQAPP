'use client';

import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Grid,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  ArrowBack as BackIcon,
  InfoOutlined as InfoIcon,
  Assignment as RequestIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useVoice } from '@/lib/VoiceContext';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Mock data for pending requests
const pendingRequests = [
  {
    id: 'req-p1',
    userId: 'user-123',
    userName: 'Khalid Mohammed',
    needType: 'medical',
    amount: 750,
    purpose: 'Emergency Surgery',
    description: 'Need assistance with upcoming surgery costs. Currently unemployed and supporting elderly parents.',
    isUrgent: true,
    monthlyIncome: 600,
    dependents: 2,
    hasAssets: false,
    createdAt: '2023-11-05',
    suggestedEligibility: 'zakah'
  },
  {
    id: 'req-p2',
    userId: 'user-456',
    userName: 'Aisha Abdulrahman',
    needType: 'education',
    amount: 1200,
    purpose: 'University Tuition',
    description: 'Seeking help with final semester university fees. Working part-time but not enough to cover educational expenses.',
    isUrgent: false,
    monthlyIncome: 950,
    dependents: 0,
    hasAssets: false,
    createdAt: '2023-11-08',
    suggestedEligibility: 'both'
  },
  {
    id: 'req-p3',
    userId: 'user-789',
    userName: 'Omar Hassan',
    needType: 'housing',
    amount: 500,
    purpose: 'Rent Assistance',
    description: 'Need help with rent payment for this month. Lost job due to company downsizing.',
    isUrgent: true,
    monthlyIncome: 400,
    dependents: 3,
    hasAssets: false,
    createdAt: '2023-11-12',
    suggestedEligibility: 'zakah'
  }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AdminReviewPage() {
  const { speak } = useVoice();
  const [tabValue, setTabValue] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewDecision, setReviewDecision] = useState('approve');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  React.useEffect(() => {
    speak('Welcome to the aid request review page. Here you can review and approve or reject pending requests.');
  }, [speak]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenReviewDialog = (request: any) => {
    setSelectedRequest(request);
    setReviewDialogOpen(true);
    setReviewDecision('approve');
    setRejectionReason('');
  };

  const handleCloseReviewDialog = () => {
    setReviewDialogOpen(false);
  };

  const handleReviewDecisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewDecision(event.target.value);
  };

  const handleRejectionReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRejectionReason(event.target.value);
  };

  const handleSubmitReview = () => {
    // In a real app, we would submit this to a database
    const action = reviewDecision === 'approve' ? 'approved' : 'rejected';
    
    speak(`Request ${action} successfully.`);
    
    // Show success message
    setSuccessMessage(`Request has been ${action} successfully.`);
    setShowSuccess(true);
    
    // Close dialog
    setReviewDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const renderRequestCard = (request: any) => (
    <Card sx={{ mb: 3 }} elevation={3} key={request.id}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h3">
              {request.purpose}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {request.userName} • {new Date(request.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Chip 
            label={request.isUrgent ? 'Urgent' : 'Regular'} 
            color={request.isUrgent ? 'error' : 'primary'} 
            size="small"
          />
        </Box>
        
        <Typography variant="body1" paragraph>
          {request.description}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              <strong>Type:</strong> {request.needType.charAt(0).toUpperCase() + request.needType.slice(1)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              <strong>Amount:</strong> ${request.amount}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              <strong>Monthly Income:</strong> ${request.monthlyIncome}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              <strong>Dependents:</strong> {request.dependents}
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2">
            System suggested eligibility: <strong>{request.suggestedEligibility.toUpperCase()}</strong>
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<ApproveIcon />}
            onClick={() => handleOpenReviewDialog(request)}
          >
            Review
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button 
          component={Link} 
          href="/admin" 
          startIcon={<BackIcon />}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          Review Aid Requests
        </Typography>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tab label="Pending Requests" icon={<RequestIcon />} iconPosition="start" />
        <Tab label="Approved" icon={<ApproveIcon />} iconPosition="start" />
        <Tab label="Rejected" icon={<RejectIcon />} iconPosition="start" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        {pendingRequests.length === 0 ? (
          <Alert severity="info">No pending requests to review.</Alert>
        ) : (
          pendingRequests.map(request => renderRequestCard(request))
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Alert severity="info">For this prototype, approved requests are not displayed.</Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Alert severity="info">For this prototype, rejected requests are not displayed.</Alert>
      </TabPanel>

      {/* Review Dialog */}
      <Dialog 
        open={reviewDialogOpen} 
        onClose={handleCloseReviewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Review Request
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6">
                {selectedRequest.purpose}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Submitted by {selectedRequest.userName} on {new Date(selectedRequest.createdAt).toLocaleDateString()}
              </Typography>
              
              <Alert severity="info" sx={{ my: 2 }}>
                System has categorized this request as eligible for <strong>{selectedRequest.suggestedEligibility.toUpperCase()}</strong> based on the beneficiary's circumstances.
              </Alert>
              
              <Divider sx={{ my: 2 }} />
              
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Decision</FormLabel>
                <RadioGroup
                  name="review-decision"
                  value={reviewDecision}
                  onChange={handleReviewDecisionChange}
                >
                  <FormControlLabel value="approve" control={<Radio />} label="Approve" />
                  <FormControlLabel value="reject" control={<Radio />} label="Reject" />
                </RadioGroup>
              </FormControl>
              
              {reviewDecision === 'reject' && (
                <TextField
                  margin="normal"
                  fullWidth
                  multiline
                  rows={3}
                  label="Rejection Reason"
                  placeholder="Please provide a reason for rejecting this request"
                  value={rejectionReason}
                  onChange={handleRejectionReasonChange}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmitReview}
            variant="contained" 
            color={reviewDecision === 'approve' ? 'success' : 'error'}
            startIcon={reviewDecision === 'approve' ? <ApproveIcon /> : <RejectIcon />}
          >
            {reviewDecision === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </MotionBox>
  );
} 