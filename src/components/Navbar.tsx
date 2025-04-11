'use client';

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Switch,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Person as PersonIcon, 
  Settings as SettingsIcon, 
  Help as HelpIcon,
  Mic as MicIcon,
  AccessibilityNew as AccessibilityIcon,
  VolumeUp as VolumeUpIcon,
  VolumeMute as VolumeMuteIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';
import { useVoice } from '@/lib/VoiceContext';
import { useAuth } from '@/lib/AuthContext';
import { signOut } from '@/lib/auth';
import styled from '@emotion/styled';

// Styled components
const NavLinkButton = styled(Button)`
  color: var(--foreground);
  margin-left: 16px;
  font-weight: 500;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const StyledLogoBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const MicButton = styled(IconButton)<{ $isListening: boolean }>`
  background-color: ${props => props.$isListening ? '#1866d0' : '#2c87f0'};
  color: white;
  margin-left: 8px;
  
  &:hover {
    background-color: #1866d0;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  animation: ${props => props.$isListening ? 'pulse 1.5s infinite' : 'none'};
`;

// Navigation items - we'll conditionally add user-specific items
const publicNavItems = [
  { text: 'Home', href: '/', icon: <HomeIcon /> },
  { text: 'Help', href: '/help', icon: <HelpIcon /> },
];

const userNavItems = [
  { text: 'Profile', href: '/profile', icon: <PersonIcon /> },
  { text: 'Settings', href: '/settings', icon: <SettingsIcon /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAccessibilityMode, toggleAccessibilityMode } = useTheme();
  const { isListening, voiceEnabled, toggleVoice, startListening, stopListening } = useVoice();
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  // For the user menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleLogout = async () => {
    handleUserMenuClose();
    
    try {
      // Call the server-side logout function
      await signOut();
      
      // Update the client state
      logout();
      
      // Speak confirmation
      speak('You have been logged out');
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  const { speak } = useVoice();

  // Get all navigation items based on auth state
  const allNavItems = [...publicNavItems, ...(isAuthenticated ? userNavItems : [])];

  // Drawer content (mobile menu)
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <Image src="/logo.svg" alt="SADAQAPP Logo" width={40} height={40} />
        <Typography variant="h6" sx={{ ml: 1 }}>
          SADAQAPP
        </Typography>
      </Box>
      
      {isAuthenticated && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, px: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1 }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : user?.phoneNumber.charAt(1)}
          </Avatar>
          <Typography variant="body2" noWrap sx={{ maxWidth: '180px' }}>
            {user?.name || user?.phoneNumber}
          </Typography>
        </Box>
      )}
      
      <Divider sx={{ mb: 1 }} />
      
      <List>
        {allNavItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        
        {!isAuthenticated ? (
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/auth/login">
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Log In" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
        
        <Divider sx={{ my: 1 }} />
        
        {/* Accessibility Toggle in Mobile Menu */}
        <ListItem disablePadding>
          <ListItemButton onClick={toggleAccessibilityMode}>
            <ListItemIcon>
              <AccessibilityIcon color={isAccessibilityMode ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary="Accessibility Mode" />
            <Switch checked={isAccessibilityMode} onChange={toggleAccessibilityMode} />
          </ListItemButton>
        </ListItem>
        
        {/* Voice Toggle in Mobile Menu */}
        <ListItem disablePadding>
          <ListItemButton onClick={toggleVoice}>
            <ListItemIcon>
              {voiceEnabled ? <VolumeUpIcon color="primary" /> : <VolumeMuteIcon />}
            </ListItemIcon>
            <ListItemText primary="Voice Commands" />
            <Switch checked={voiceEnabled} onChange={toggleVoice} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#171717' }}>
        <Toolbar>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Logo */}
          <Link href="/" passHref>
            <StyledLogoBox>
              <Image src="/logo.svg" alt="SADAQAPP Logo" width={40} height={40} />
              <Typography
                variant="h6"
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, ml: 1 }}
              >
                SADAQAPP
              </Typography>
            </StyledLogoBox>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {allNavItems.map((item) => (
              <Link key={item.text} href={item.href} passHref>
                <NavLinkButton>
                  {item.text}
                </NavLinkButton>
              </Link>
            ))}
            
            {!isAuthenticated ? (
              <Link href="/auth/login" passHref>
                <Button 
                  variant="contained" 
                  sx={{ ml: 2 }}
                  startIcon={<LoginIcon />}
                >
                  Log In
                </Button>
              </Link>
            ) : (
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleUserMenuOpen}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  sx={{ ml: 2 }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : user?.phoneNumber.charAt(1)}
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
          </Box>
          
          {/* Accessibility Toggle */}
          <Tooltip title={isAccessibilityMode ? "Disable Accessibility Mode" : "Enable Accessibility Mode"}>
            <IconButton 
              color="inherit" 
              onClick={toggleAccessibilityMode}
              aria-label="Toggle accessibility mode"
              sx={{ ml: 1 }}
            >
              <AccessibilityIcon color={isAccessibilityMode ? "primary" : "inherit"} />
            </IconButton>
          </Tooltip>
          
          {/* Voice Toggle */}
          <Tooltip title={voiceEnabled ? "Disable Voice Commands" : "Enable Voice Commands"}>
            <IconButton 
              color="inherit" 
              onClick={toggleVoice}
              aria-label="Toggle voice commands"
            >
              {voiceEnabled ? <VolumeUpIcon /> : <VolumeMuteIcon />}
            </IconButton>
          </Tooltip>
          
          {/* Mic Button for Voice Commands */}
          {voiceEnabled && (
            <Tooltip title={isListening ? "Stop Listening" : "Start Voice Command"}>
              <MicButton 
                onClick={handleMicClick} 
                $isListening={isListening}
                aria-label={isListening ? "Stop listening" : "Start voice command"}
              >
                <MicIcon />
              </MicButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      
      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} href="/profile">
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        
        <MenuItem component={Link} href="/settings">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
} 