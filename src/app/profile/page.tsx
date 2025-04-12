'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Grid,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Chip,
  TextField,
  IconButton,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  Edit as EditIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  History as HistoryIcon,
  Notifications as NotificationIcon,
  Security as SecurityIcon,
  VerifiedUser as VerifiedIcon,
  CheckCircle as CheckCircleIcon,
  Payment as PaymentIcon,
  MonetizationOn as DonationIcon,
  HelpOutline as RequestIcon,
  AddAPhoto as AddPhotoIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';

// Styled components
const ProfileHeader = styled(Box)`
  background: linear-gradient(135deg, #263238 0%, #455a64 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;

const MotionHeader = motion(ProfileHeader);

const ProfileCard = styled(Paper)`
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const AvatarWrapper = styled(Box)`
  position: relative;
  margin-bottom: 1rem;
  display: inline-block;
`;

const TransactionRow = styled(TableRow)`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const MotionContainer = motion(Container);
const MotionCard = motion(Card);

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

// Mock user data
const mockUser = {
  id: 'user123',
  firstName: 'Ahmed',
  lastName: 'Khan',
  phone: '+971 50 123 4567',
  location: 'Dubai, UAE',
  email: 'ahmed.khan@example.com',
  role: 'donor',
  joinDate: '2023-09-15',
  verified: true,
};

// Mock transaction data
const mockTransactions = [
  {
    id: 'tx001',
    date: '2023-11-18',
    type: 'donation',
    amount: 500,
    status: 'completed',
    details: 'Zakah donation to medical expense request'
  },
  {
    id: 'tx002',
    date: '2023-11-05',
    type: 'donation',
    amount: 200,
    status: 'completed',
    details: 'Sadaqah donation to education aid request'
  },
  {
    id: 'tx003',
    date: '2023-10-22',
    type: 'donation',
    amount: 350,
    status: 'completed',
    details: 'Zakah donation to housing assistance'
  },
  {
    id: 'tx004',
    date: '2023-10-10',
    type: 'donation',
    amount: 150,
    status: 'completed',
    details: 'Sadaqah donation to food & essentials'
  },
  {
    id: 'tx005',
    date: '2023-09-28',
    type: 'donation',
    amount: 750,
    status: 'completed',
    details: 'Zakah donation to medical expense request'
  }
];

export default function ProfilePage() {
  const { speak } = useVoice();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const [editedUserData, setEditedUserData] = useState(mockUser);
  
  useEffect(() => {
    speak('Welcome to your profile page. Here you can view and manage your personal information and transaction history.');
  }, [speak]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    
    const tabMessages = [
      'Showing your personal information.',
      'Showing your transaction history.',
      'Showing your notification settings.',
      'Showing your security settings.',
    ];
    
    speak(tabMessages[newValue]);
  };
  
  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      setUserData(editedUserData);
      speak('Your profile information has been updated successfully.');
    } else {
      speak('You can now edit your profile information.');
    }
    setEditMode(!editMode);
  };
  
  const handleInputChange = (field: string, value: string) => {
    setEditedUserData({
      ...editedUserData,
      [field]: value
    });
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <PageLayout>
      <MotionHeader 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <AvatarWrapper>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      width: 32,
                      height: 32,
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                    onClick={() => speak('Change profile photo clicked')}
                  >
                    <AddPhotoIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{ width: 120, height: 120, bgcolor: 'primary.main', fontSize: '3rem' }}
                >
                  {userData.firstName.charAt(0)}
                </Avatar>
              </Badge>
            </AvatarWrapper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {userData.firstName} {userData.lastName}
              </Typography>
              {userData.verified && (
                <VerifiedIcon color="primary" sx={{ ml: 1 }} />
              )}
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <Chip 
                icon={<PersonIcon />} 
                label={userData.role === 'donor' ? 'Donor' : 'Beneficiary'} 
                color={userData.role === 'donor' ? 'primary' : 'success'} 
              />
              <Chip 
                icon={<PhoneIcon />} 
                label={userData.phone} 
                variant="outlined" 
              />
              <Chip 
                icon={<LocationIcon />} 
                label={userData.location} 
                variant="outlined" 
              />
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Member since {formatDate(userData.joinDate)}
            </Typography>
          </Grid>
        </Grid>
      </MotionHeader>
      
      <MotionContainer 
        maxWidth="lg" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Paper sx={{ mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="profile tabs"
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              label="Personal Info" 
              icon={<PersonIcon />} 
              iconPosition="start" 
            />
            <Tab 
              label="Transactions" 
              icon={<HistoryIcon />} 
              iconPosition="start" 
            />
            <Tab 
              label="Notifications" 
              icon={<NotificationIcon />} 
              iconPosition="start" 
            />
            <Tab 
              label="Security" 
              icon={<SecurityIcon />} 
              iconPosition="start" 
            />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                  Personal Information
                </Typography>
                <Button 
                  variant={editMode ? "contained" : "outlined"}
                  color="primary"
                  startIcon={editMode ? <SaveIcon /> : <EditIcon />}
                  onClick={handleEditToggle}
                >
                  {editMode ? "Save Changes" : "Edit Profile"}
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={editMode ? editedUserData.firstName : userData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={editMode ? editedUserData.lastName : userData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={editMode ? editedUserData.phone : userData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={editMode ? editedUserData.email : userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={editMode ? editedUserData.location : userData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!editMode}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Your Role
                </Typography>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      {userData.role === 'donor' ? (
                        <DonationIcon color="primary" sx={{ fontSize: 48 }} />
                      ) : (
                        <RequestIcon color="success" sx={{ fontSize: 48 }} />
                      )}
                    </Grid>
                    <Grid item xs>
                      <Typography variant="subtitle1">
                        You are registered as a <strong>{userData.role === 'donor' ? 'Donor' : 'Beneficiary'}</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {userData.role === 'donor' 
                          ? 'You can browse aid requests and make donations to help those in need.'
                          : 'You can submit aid requests for Zakah/Sadaqah and receive financial assistance.'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h5" component="h2" gutterBottom>
                Transaction History
              </Typography>
              
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TransactionRow key={transaction.id} hover>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>
                          <Chip 
                            size="small" 
                            icon={transaction.type === 'donation' ? <DonationIcon /> : <PaymentIcon />}
                            label={transaction.type === 'donation' ? 'Donation' : 'Payment'} 
                            color={transaction.type === 'donation' ? 'primary' : 'secondary'} 
                          />
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="medium">
                            ${transaction.amount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="small" 
                            label={transaction.status} 
                            color={transaction.status === 'completed' ? 'success' : 'warning'} 
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{transaction.details}</TableCell>
                      </TransactionRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button variant="outlined" color="primary">
                  View All Transactions
                </Button>
              </Box>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h5" component="h2" gutterBottom>
                Notification Settings
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Transaction Confirmations" 
                    secondary="Receive notifications when your donations are processed or aid requests are fulfilled." 
                  />
                </ListItem>
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Status Updates" 
                    secondary="Get updates on the status of your aid requests or donation impact." 
                  />
                </ListItem>
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Educational Content" 
                    secondary="Receive notifications about new financial education resources and tutorials." 
                  />
                </ListItem>
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="News and Updates" 
                    secondary="Stay informed about SADAQAPP news, features, and improvements." 
                  />
                </ListItem>
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button variant="contained" color="primary">
                  Update Preferences
                </Button>
              </Box>
            </TabPanel>
            
            <TabPanel value={tabValue} index={3}>
              <Typography variant="h5" component="h2" gutterBottom>
                Security Settings
              </Typography>
              
              <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Phone Number Verification
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <VerifiedIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Your phone number is verified
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Your account is secured with phone verification. If you change your phone number, you'll need to verify the new number.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Change Phone Number
                </Button>
              </Paper>
              
              <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Privacy
                </Typography>
                <Typography variant="body2" paragraph>
                  Control how your information is shared with others on the platform.
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Hide my name from public donations" 
                      secondary="Your donations will appear as 'Anonymous'" 
                    />
                  </ListItem>
                  <Divider component="li" />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Hide my location" 
                      secondary="Your specific location will not be shown to others" 
                    />
                  </ListItem>
                </List>
                
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Update Privacy Settings
                </Button>
              </Paper>
              
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom color="error">
                  Delete Account
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Permanently delete your account and all associated data. This action cannot be undone.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="error"
                >
                  Delete My Account
                </Button>
              </Paper>
            </TabPanel>
          </Box>
        </Paper>
      </MotionContainer>
    </PageLayout>
  );
} 