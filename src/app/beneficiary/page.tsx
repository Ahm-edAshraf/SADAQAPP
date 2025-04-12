'use client';

import React from 'react';
import { 
  Typography, 
  Card, 
  CardContent,
  Button,
  Box,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Snackbar,
  Alert,
  InputAdornment,
  FormLabel
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
  
  // State for the new request dialog
  const [openRequestDialog, setOpenRequestDialog] = React.useState(false);
  const [requestFormData, setRequestFormData] = React.useState({
    needType: 'medical',
    amount: '',
    purpose: '',
    description: '',
    isUrgent: false,
    monthlyIncome: '',
    dependents: '',
    hasAssets: false
  });
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  
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
  
  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
    speak('Create a new financial aid request. Please fill in all required fields.');
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value, checked } = e.target as HTMLInputElement;
    
    setRequestFormData(prev => ({
      ...prev,
      [name!]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitRequest = () => {
    // Validation
    if (!requestFormData.purpose || !requestFormData.amount || !requestFormData.description) {
      speak('Please fill in all required fields.');
      return;
    }

    // In a real app, we would submit this to a database
    speak('Your aid request has been submitted and is pending review. We will notify you when it is approved.');
    
    // Show success message
    setSuccessMessage('Your aid request has been submitted successfully!');
    setShowSuccess(true);
    
    // Close dialog
    setOpenRequestDialog(false);
    
    // Reset form
    setRequestFormData({
      needType: 'medical',
      amount: '',
      purpose: '',
      description: '',
      isUrgent: false,
      monthlyIncome: '',
      dependents: '',
      hasAssets: false
    });
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
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
            onClick={handleOpenRequestDialog}
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

      {/* New Aid Request Dialog */}
      <Dialog
        open={openRequestDialog}
        onClose={handleCloseRequestDialog}
        aria-labelledby="aid-request-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="aid-request-dialog-title">
          New Financial Aid Request
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="need-type-label">Type of Need</InputLabel>
              <Select
                labelId="need-type-label"
                name="needType"
                value={requestFormData.needType}
                label="Type of Need"
                onChange={handleFormChange}
              >
                <MenuItem value="medical">Medical Expenses</MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="housing">Housing/Rent</MenuItem>
                <MenuItem value="essential">Food & Essential Items</MenuItem>
                <MenuItem value="debt">Debt Relief</MenuItem>
                <MenuItem value="other">Other (Specify in Description)</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="purpose"
              label="Purpose"
              name="purpose"
              value={requestFormData.purpose}
              onChange={handleFormChange}
              placeholder="Brief title for your request"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount Needed"
              type="number"
              id="amount"
              value={requestFormData.amount}
              onChange={handleFormChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              id="description"
              multiline
              rows={4}
              value={requestFormData.description}
              onChange={handleFormChange}
              placeholder="Please provide details about your situation and how this aid will help"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={requestFormData.isUrgent}
                  onChange={handleFormChange}
                  name="isUrgent"
                  color="primary"
                />
              }
              label="This is an urgent need"
            />

            <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
              Financial Information
            </Typography>

            <TextField
              margin="normal"
              fullWidth
              name="monthlyIncome"
              label="Monthly Income"
              type="number"
              id="monthlyIncome"
              value={requestFormData.monthlyIncome}
              onChange={handleFormChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              name="dependents"
              label="Number of Dependents"
              type="number"
              id="dependents"
              value={requestFormData.dependents}
              onChange={handleFormChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={requestFormData.hasAssets}
                  onChange={handleFormChange}
                  name="hasAssets"
                  color="primary"
                />
              }
              label="I have assets that exceed my basic needs"
              sx={{ mt: 1 }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Note: This information helps us determine eligibility for different types of aid. Your request
              will be automatically categorized as Zakah, Sadaqah, or both based on your situation.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRequestDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmitRequest} 
            variant="contained" 
            color="primary"
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
} 