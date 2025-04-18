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
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartOutlineIcon,
  LocalHospital as MedicalIcon,
  School as EducationIcon,
  Restaurant as FoodIcon,
  Home as HousingIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';

const MotionBox = motion(Box);

export default function DonorDashboard() {
  const { speak } = useVoice();
  
  React.useEffect(() => {
    speak('Welcome to your donor dashboard. Here you can browse aid requests and make donations to help those in need.');
  }, [speak]);
  
  // Mock data for demonstration
  const aidRequests = [
    { 
      id: 'req001', 
      type: 'Zakah', 
      amount: 350, 
      purpose: 'Medical expenses',
      category: 'medical',
      description: 'Need assistance with hospital bills for emergency surgery',
      createdAt: '2023-10-15',
      fulfilledAmount: 250,
      urgency: 'high',
      user: {
        id: 'user1',
        firstNameInitial: 'A',
        location: 'Riyadh, Saudi Arabia'
      }
    },
    { 
      id: 'req002', 
      type: 'Sadaqah', 
      amount: 500, 
      purpose: 'Educational fees',
      category: 'education',
      description: 'Seeking help with university tuition fees for the new semester',
      createdAt: '2023-11-02',
      fulfilledAmount: 150,
      urgency: 'medium',
      user: {
        id: 'user2',
        firstNameInitial: 'M',
        location: 'Dubai, UAE'
      }
    },
    { 
      id: 'req003', 
      type: 'Zakah', 
      amount: 200, 
      purpose: 'Food and essentials',
      category: 'food',
      description: 'Need help with groceries and basic necessities for family of four',
      createdAt: '2023-09-20',
      fulfilledAmount: 120,
      urgency: 'medium',
      user: {
        id: 'user3',
        firstNameInitial: 'F',
        location: 'Jakarta, Indonesia'
      }
    },
    { 
      id: 'req004', 
      type: 'Sadaqah', 
      amount: 800, 
      purpose: 'Housing rent',
      category: 'housing',
      description: 'Unable to pay housing rent due to loss of job, seeking assistance',
      createdAt: '2023-11-10',
      fulfilledAmount: 300,
      urgency: 'high',
      user: {
        id: 'user4',
        firstNameInitial: 'S',
        location: 'Cairo, Egypt'
      }
    }
  ];
  
  const [savedRequests, setSavedRequests] = React.useState<string[]>([]);
  const [donationDialogOpen, setDonationDialogOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState<any>(null);
  const [donationAmount, setDonationAmount] = React.useState<string>('');
  const [donationType, setDonationType] = React.useState<string>('zakah');
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const [showSuccess, setShowSuccess] = React.useState(false);
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'medical': return <MedicalIcon />;
      case 'education': return <EducationIcon />;
      case 'food': return <FoodIcon />;
      case 'housing': return <HousingIcon />;
      default: return null;
    }
  };
  
  const getUrgencyColor = (urgency: string): "success" | "warning" | "error" | "default" => {
    switch(urgency) {
      case 'high': return "error";
      case 'medium': return "warning";
      case 'low': return "success";
      default: return "default";
    }
  };
  
  const toggleSaveRequest = (requestId: string) => {
    setSavedRequests(prev => 
      prev.includes(requestId) 
      ? prev.filter(id => id !== requestId) 
      : [...prev, requestId]
    );
  };
  
  const handleDonateClick = (request: any) => {
    setSelectedRequest(request);
    setDonationDialogOpen(true);
    speak(`Donation form for ${request.purpose}. Enter amount and select donation type.`);
  };

  const handleCloseDonationDialog = () => {
    setDonationDialogOpen(false);
    setSelectedRequest(null);
    setDonationAmount('');
  };

  const handleDonationSubmit = () => {
    // In a real app, we would submit the donation to a payment gateway
    // For our prototype, we'll just show a success message
    const amountValue = parseFloat(donationAmount);
    
    if (!amountValue || amountValue <= 0) {
      speak('Please enter a valid donation amount.');
      return;
    }
    
    speak(`Thank you for your ${donationType} donation of $${donationAmount} for ${selectedRequest.purpose}.`);
    
    // Close the dialog
    setDonationDialogOpen(false);
    
    // Show success message
    setSuccessMessage(`Thank you for your ${donationType} donation of $${donationAmount}!`);
    setShowSuccess(true);
    
    // Reset form fields
    setDonationAmount('');
    setSelectedRequest(null);
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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Financial Aid Requests
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse through verified financial aid requests and donate to those in need.
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Search requests..."
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              variant="outlined" 
              startIcon={<FilterIcon />}
              onClick={() => speak('This would open the filter options for aid requests.')}
            >
              Filter
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {aidRequests.map((request) => (
            <Box sx={{ flex: '1 1 calc(50% - 24px)', minWidth: '280px' }} key={request.id}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: request.category === 'medical' ? 'error.main' : 
                                   request.category === 'education' ? 'info.main' : 
                                   request.category === 'food' ? 'success.main' : 'secondary.main' }}>
                        {getCategoryIcon(request.category)}
                      </Avatar>
                      <Typography variant="h6" component="h3">
                        {request.purpose}
                      </Typography>
                    </Box>
                    <Button 
                      onClick={() => toggleSaveRequest(request.id)}
                      color="secondary"
                      sx={{ minWidth: 'auto', p: 1 }}
                    >
                      {savedRequests.includes(request.id) ? <HeartIcon /> : <HeartOutlineIcon />}
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip 
                      label={request.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip 
                      label={`Urgency: ${request.urgency}`}
                      size="small"
                      color={getUrgencyColor(request.urgency)}
                    />
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {request.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">Funding Progress</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        ${request.fulfilledAmount} of ${request.amount}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(request.fulfilledAmount / request.amount) * 100} 
                      color="primary"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 28, height: 28, fontSize: '0.875rem', bgcolor: 'primary.main' }}>
                        {request.user.firstNameInitial}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        {request.user.location}
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      color="secondary"
                      onClick={() => handleDonateClick(request)}
                    >
                      Donate
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </MotionBox>

      {/* Donation Dialog */}
      <Dialog 
        open={donationDialogOpen} 
        onClose={handleCloseDonationDialog}
        aria-labelledby="donation-dialog-title"
      >
        <DialogTitle id="donation-dialog-title">
          Make a Donation
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedRequest.purpose}
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedRequest.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" paragraph>
                <strong>Requested:</strong> ${selectedRequest.amount}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Still needed:</strong> ${selectedRequest.amount - selectedRequest.fulfilledAmount}
              </Typography>
              <Box sx={{ my: 3 }}>
                <TextField
                  label="Donation Amount"
                  variant="outlined"
                  fullWidth
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  autoFocus
                  margin="dense"
                />
              </Box>
              <FormControl fullWidth margin="dense">
                <InputLabel id="donation-type-label">Donation Type</InputLabel>
                <Select
                  labelId="donation-type-label"
                  value={donationType}
                  label="Donation Type"
                  onChange={(e) => setDonationType(e.target.value)}
                >
                  <MenuItem value="zakah">Zakah</MenuItem>
                  <MenuItem value="sadaqah">Sadaqah</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDonationDialog}>Cancel</Button>
          <Button 
            onClick={handleDonationSubmit} 
            variant="contained" 
            color="primary"
          >
            Donate Now
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