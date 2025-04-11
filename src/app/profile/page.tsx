'use client';

import React, { useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  Divider, 
  Chip,
  Button,
  TextField,
  Container,
  CircularProgress
} from '@mui/material';
import { 
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import PageLayout from '@/components/PageLayout';
import { useVoice } from '@/lib/VoiceContext';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function ProfilePage() {
  const { speak } = useVoice();
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  
  useEffect(() => {
    speak('Welcome to your profile page. Here you can view and update your information.');
    
    if (user?.name) {
      setName(user.name);
    }
  }, [speak, user?.name]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login?callbackUrl=/profile');
    }
  }, [loading, isAuthenticated, router]);
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
      speak('Your profile has been updated successfully.');
      
      // In a real app, we would update the user's name in the database
    }, 1500);
  };
  
  // Show loading state
  if (loading) {
    return (
      <PageLayout>
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading your profile...
          </Typography>
        </Container>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'primary.main',
                    fontSize: '2.5rem',
                    mr: 3
                  }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : (user?.phoneNumber?.charAt(1) || 'U')}
                </Avatar>
                
                <Box sx={{ flexGrow: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ mb: 2 }}
                      autoFocus
                    />
                  ) : (
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {user?.name || 'User'}
                    </Typography>
                  )}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1" color="text.secondary">
                      {user?.phoneNumber || '-'}
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  {isEditing ? (
                    <Button
                      variant="contained"
                      startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                      onClick={handleSave}
                      disabled={saving}
                      sx={{ ml: 2 }}
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Account Type
                    </Typography>
                    <Typography variant="body1">
                      {user?.role ? (
                        <Chip 
                          label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                          color={user.role === 'beneficiary' ? 'primary' : 'secondary'}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      ) : (
                        'Not set'
                      )}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Joined
                    </Typography>
                    <Typography variant="body1">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>
                  Activity Summary
                </Typography>
                
                <Grid container spacing={2}>
                  {user?.role === 'beneficiary' ? (
                    <>
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="h5" color="primary">3</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Aid Requests
                          </Typography>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="h5" color="success.main">$750</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Aid Received
                          </Typography>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="h5">2</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Active Requests
                          </Typography>
                        </Card>
                      </Grid>
                    </>
                  ) : user?.role === 'donor' ? (
                    <>
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="h5" color="secondary.main">7</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Donations Made
                          </Typography>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="h5" color="success.main">$1,250</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Donated
                          </Typography>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="h5">5</Typography>
                          <Typography variant="body2" color="text.secondary">
                            People Helped
                          </Typography>
                        </Card>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Please select a role to see your activity summary
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => router.push('/auth/role-selection')}
                          sx={{ mt: 2 }}
                        >
                          Select Role
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </MotionBox>
    </PageLayout>
  );
} 