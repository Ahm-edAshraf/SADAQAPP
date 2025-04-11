'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
  Button,
  Card,
  CardContent,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  Stack,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Accessibility as AccessibilityIcon,
  VolumeUp as VolumeIcon,
  Contrast as ContrastIcon,
  TextFields as TextIcon,
  Palette as ThemeIcon,
  Language as LanguageIcon,
  Check as CheckIcon,
  Settings as SettingsIcon,
  Save as SaveIcon,
  Notifications as NotificationIcon,
  FormatSize as FontSizeIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';

// Styled components
const SettingsHeader = styled(Box)`
  background: linear-gradient(135deg, #512da8 0%, #7c4dff 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const MotionHeader = motion(SettingsHeader);

const SettingCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const MotionContainer = motion(Container);
const MotionCard = motion(SettingCard);

export default function SettingsPage() {
  const { speak, voiceEnabled, toggleVoice } = useVoice();
  const [savedMessage, setSavedMessage] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: true,
    autoRead: true,
    notifications: true,
    textSize: 16,
    language: 'english'
  });
  
  useEffect(() => {
    speak('Welcome to the settings page. Here you can customize your accessibility preferences and application settings.');
  }, [speak]);
  
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    
    // Voice feedback on setting change
    const messages = {
      highContrast: `High contrast mode ${value ? 'enabled' : 'disabled'}`,
      largeText: `Large text mode ${value ? 'enabled' : 'disabled'}`,
      reducedMotion: `Reduced motion ${value ? 'enabled' : 'disabled'}`,
      screenReader: `Screen reader compatibility ${value ? 'enabled' : 'disabled'}`,
      autoRead: `Automatic reading ${value ? 'enabled' : 'disabled'}`,
      notifications: `Notifications ${value ? 'enabled' : 'disabled'}`,
    };
    
    if (messages[setting]) {
      speak(messages[setting]);
    }
  };
  
  const handleTextSizeChange = (event, newValue) => {
    setSettings({
      ...settings,
      textSize: newValue
    });
  };
  
  const handleLanguageChange = (event) => {
    setSettings({
      ...settings,
      language: event.target.value
    });
    speak(`Language changed to ${event.target.value}`);
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save settings to backend or localStorage
    setSavedMessage(true);
    speak('Your settings have been saved successfully');
    setTimeout(() => setSavedMessage(false), 3000);
  };
  
  return (
    <PageLayout>
      <MotionHeader initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Settings & Accessibility
        </Typography>
        <Typography variant="h6" gutterBottom>
          Customize Your Experience
        </Typography>
        <Typography variant="body1">
          Adjust accessibility settings, voice preferences, and other options to make SADAQAPP work best for you.
        </Typography>
      </MotionHeader>
      
      <MotionContainer 
        maxWidth="lg" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AccessibilityIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
            <Typography variant="h4" component="h2">
              Accessibility Options
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MotionCard 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                elevation={3}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ContrastIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h3">
                      Visual Settings
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={settings.highContrast}
                          onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="High Contrast Mode"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={settings.largeText}
                          onChange={(e) => handleSettingChange('largeText', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Large Text Mode"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={settings.reducedMotion}
                          onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Reduced Motion"
                    />
                    
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <FontSizeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography id="text-size-slider" gutterBottom>
                          Text Size: {settings.textSize}px
                        </Typography>
                      </Box>
                      <Slider
                        value={settings.textSize}
                        onChange={handleTextSizeChange}
                        aria-labelledby="text-size-slider"
                        step={1}
                        marks
                        min={12}
                        max={24}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </MotionCard>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <MotionCard 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                elevation={3}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <VolumeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h3">
                      Voice & Audio
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={voiceEnabled}
                          onChange={toggleVoice}
                          color="primary"
                        />
                      }
                      label="Voice Commands & Feedback"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={settings.screenReader}
                          onChange={(e) => handleSettingChange('screenReader', e.target.checked)}
                          color="primary"
                          disabled={!voiceEnabled}
                        />
                      }
                      label="Screen Reader Compatibility"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={settings.autoRead}
                          onChange={(e) => handleSettingChange('autoRead', e.target.checked)}
                          color="primary"
                          disabled={!voiceEnabled}
                        />
                      }
                      label="Auto-Read Important Content"
                    />
                    
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                      <InputLabel id="voice-language-label">Voice Language</InputLabel>
                      <Select
                        labelId="voice-language-label"
                        value={settings.language}
                        onChange={handleLanguageChange}
                        label="Voice Language"
                        disabled={!voiceEnabled}
                      >
                        <MenuItem value="english">English</MenuItem>
                        <MenuItem value="arabic">Arabic</MenuItem>
                        <MenuItem value="urdu">Urdu</MenuItem>
                        <MenuItem value="malay">Malay</MenuItem>
                        <MenuItem value="indonesian">Indonesian</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SettingsIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
            <Typography variant="h4" component="h2">
              General Settings
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MotionCard 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                elevation={3}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <NotificationIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h3">
                      Notifications
                    </Typography>
                  </Box>
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={settings.notifications}
                        onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Enable Notifications"
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Choose which notifications you'd like to receive:
                    </Typography>
                    
                    <FormControlLabel
                      control={<Switch defaultChecked color="primary" />}
                      label="Donation confirmations"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked color="primary" />}
                      label="Aid request status updates"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked color="primary" />}
                      label="New educational resources"
                    />
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <MotionCard 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                elevation={3}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ThemeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h3">
                      Theme & Display
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" gutterBottom>
                    Select your preferred theme:
                  </Typography>
                  
                  <RadioGroup
                    defaultValue="system"
                    name="theme-options"
                    sx={{ mb: 2 }}
                  >
                    <FormControlLabel value="light" control={<Radio />} label="Light Theme" />
                    <FormControlLabel value="dark" control={<Radio />} label="Dark Theme" />
                    <FormControlLabel value="system" control={<Radio />} label="Follow System Preference" />
                  </RadioGroup>
                  
                  <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                    <InputLabel id="language-label">Application Language</InputLabel>
                    <Select
                      labelId="language-label"
                      defaultValue="english"
                      label="Application Language"
                    >
                      <MenuItem value="english">English</MenuItem>
                      <MenuItem value="arabic">Arabic</MenuItem>
                      <MenuItem value="urdu">Urdu</MenuItem>
                      <MenuItem value="malay">Malay</MenuItem>
                      <MenuItem value="indonesian">Indonesian</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
            sx={{ px: 4, py: 1.5 }}
          >
            Save All Settings
          </Button>
        </Box>
        
        <Snackbar 
          open={savedMessage} 
          autoHideDuration={3000} 
          onClose={() => setSavedMessage(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" variant="filled" icon={<CheckIcon />}>
            Settings saved successfully!
          </Alert>
        </Snackbar>
      </MotionContainer>
    </PageLayout>
  );
} 