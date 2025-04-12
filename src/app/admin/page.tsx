'use client';

import React from 'react';
import { 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  Box, 
  Stack,
  Divider
} from '@mui/material';
import { 
  VerifiedUser as VerifiedIcon,
  MedicalServices as MedicalIcon,
  PendingActions as PendingIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
  MonetizationOn as DonationIcon,
  Payments as PaymentIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';

const MotionBox = motion(Box);

const StatsCard = ({ title, value, icon, color }: { 
  title: string; 
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card elevation={2} sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2
      }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Box sx={{ 
          p: 1, 
          borderRadius: '50%', 
          bgcolor: `${color}.light`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: `${color}.main`
        }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default function AdminDashboard() {
  const { speak } = useVoice();

  React.useEffect(() => {
    speak('Welcome to the administrator dashboard. Here you can manage aid requests, monitor donations, and view system analytics.');
  }, [speak]);

  // Hardcoded statistics for prototype
  const stats = [
    { title: 'Pending Requests', value: 12, icon: <PendingIcon />, color: 'warning' },
    { title: 'Approved Requests', value: 28, icon: <ApprovedIcon />, color: 'success' },
    { title: 'Rejected Requests', value: 5, icon: <RejectedIcon />, color: 'error' },
    { title: 'Verified Users', value: 56, icon: <VerifiedIcon />, color: 'info' },
    { title: 'Total Donations', value: '$10,250', icon: <DonationIcon />, color: 'primary' },
    { title: 'Disbursed', value: '$8,125', icon: <PaymentIcon />, color: 'secondary' },
  ];

  const adminMenuItems = [
    { title: 'Review Aid Requests', description: 'Approve or reject pending aid requests', link: '/admin/review' },
    { title: 'User Management', description: 'Manage users and verify identities', link: '/admin/users' },
    { title: 'Donation Analytics', description: 'View reports and metrics on donations', link: '/admin/analytics' },
    { title: 'System Settings', description: 'Configure system parameters and categories', link: '/admin/settings' },
  ];

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Administrator Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage all aspects of the SADAQAPP platform.
        </Typography>
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>
        Platform Overview
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatsCard 
              title={stat.title} 
              value={stat.value} 
              icon={stat.icon} 
              color={stat.color} 
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        {adminMenuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Link href={item.link} passHref style={{ textDecoration: 'none' }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer', 
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </MotionBox>
  );
} 