'use client';

import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Grid, 
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip
} from '@mui/material';
import { 
  School as SchoolIcon,
  AccountBalance as BankIcon,
  CreditCard as CardIcon,
  Calculate as CalculateIcon,
  ArrowForward as ArrowIcon,
  CheckCircle as CheckIcon,
  PlayCircleOutline as PlayIcon,
  MenuBook as BookIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import Image from 'next/image';
import Link from 'next/link';

// Styled components
const EducationHeader = styled(Box)`
  background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const MotionHeader = motion(EducationHeader);

const ModuleCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const ProgressBar = styled(Box)`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress || '0%'};
    background-color: #4caf50;
    border-radius: 4px;
  }
`;

const ResourceItem = styled(ListItem)`
  transition: background-color 0.2s ease;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const MotionContainer = motion(Container);
const MotionCard = motion(ModuleCard);

// Mock education modules
const educationModules = [
  {
    id: 'basics',
    title: 'Islamic Finance Basics',
    description: 'Learn the fundamentals of Islamic finance principles including Riba prohibition and ethical investments.',
    icon: <SchoolIcon fontSize="large" />,
    progress: '85%',
    level: 'Beginner',
    duration: '2 hours',
    lessons: 8
  },
  {
    id: 'banking',
    title: 'Bank Accounts & E-Wallets',
    description: 'Understanding Shariah-compliant banking options and how to use digital wallets securely.',
    icon: <BankIcon fontSize="large" />,
    progress: '60%',
    level: 'Beginner',
    duration: '1.5 hours',
    lessons: 6
  },
  {
    id: 'budgeting',
    title: 'Basic Budgeting',
    description: 'Create a sustainable household budget that aligns with Islamic principles of moderation.',
    icon: <CalculateIcon fontSize="large" />,
    progress: '40%',
    level: 'Intermediate',
    duration: '3 hours',
    lessons: 10
  },
  {
    id: 'zakah',
    title: 'Understanding Zakah & Sadaqah',
    description: 'Learn how to calculate Zakah, when to pay it, and the spiritual significance of charity in Islam.',
    icon: <CardIcon fontSize="large" />,
    progress: '75%',
    level: 'All levels',
    duration: '2.5 hours',
    lessons: 7
  }
];

export default function EducationPage() {
  const { speak } = useVoice();
  
  useEffect(() => {
    speak('Welcome to the financial education page. Here you can learn about Islamic finance, banking, budgeting, and charity principles.');
  }, [speak]);
  
  return (
    <PageLayout>
      <MotionHeader initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Financial Education
        </Typography>
        <Typography variant="h6" gutterBottom>
          Learn Islamic Finance & Basic Financial Literacy
        </Typography>
        <Typography variant="body1">
          Explore our educational resources to understand Shariah-compliant financial concepts, 
          manage your money wisely, and make informed financial decisions.
        </Typography>
      </MotionHeader>
      
      <MotionContainer 
        maxWidth="lg" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Learning Modules
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Select a module to start learning. Your progress is saved automatically.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {educationModules.map((module, index) => (
              <Grid item xs={12} md={6} key={module.id}>
                <MotionCard 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  elevation={3}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        color: 'primary.main', 
                        bgcolor: 'primary.light', 
                        p: 1.5, 
                        borderRadius: '50%',
                        display: 'flex',
                        mr: 2
                      }}>
                        {module.icon}
                      </Box>
                      <Box>
                        <Typography variant="h5" component="h3">
                          {module.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip size="small" label={module.level} />
                          <Chip size="small" label={`${module.lessons} lessons`} />
                          <Chip size="small" label={module.duration} />
                        </Box>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" paragraph>
                      {module.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress: {module.progress}
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        endIcon={<ArrowIcon />}
                        component={Link}
                        href={`/education/${module.id}`}
                      >
                        Continue Learning
                      </Button>
                    </Box>
                    
                    <ProgressBar progress={module.progress} />
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Lesson
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 3, position: 'relative', overflow: 'hidden' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Introduction to Islamic Banking
                </Typography>
                <Typography variant="body1" paragraph>
                  This lesson explains how Islamic banking differs from conventional banking systems, 
                  the principles of risk-sharing, and how profit is generated without interest (Riba).
                </Typography>
                <List>
                  <ResourceItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Understanding Mudarabah and Musharakah contracts" />
                  </ResourceItem>
                  <ResourceItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="How Islamic banks generate profit without interest" />
                  </ResourceItem>
                  <ResourceItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Evaluating Shariah-compliant investment options" />
                  </ResourceItem>
                </List>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<PlayIcon />}
                  sx={{ mt: 2 }}
                >
                  Start Lesson
                </Button>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: 250, 
                    position: 'relative',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                >
                  {/* Replace with actual image in production */}
                  <Paper 
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      bgcolor: 'primary.light',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <PlayIcon sx={{ fontSize: 64, color: 'white' }} />
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Educational Resources
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <BookIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Articles & Guides
                  </Typography>
                  <List>
                    <ResourceItem button component="a" href="#">
                      <ListItemIcon>
                        <AssignmentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Calculating Zakah: A Step-by-Step Guide" 
                        secondary="Updated 2 months ago • 10 min read"
                      />
                    </ResourceItem>
                    <ResourceItem button component="a" href="#">
                      <ListItemIcon>
                        <AssignmentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Setting Up a Family Budget: Islamic Perspective" 
                        secondary="Updated 3 weeks ago • 15 min read"
                      />
                    </ResourceItem>
                    <ResourceItem button component="a" href="#">
                      <ListItemIcon>
                        <AssignmentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Understanding Digital Wallets & Mobile Banking" 
                        secondary="Updated 1 month ago • 8 min read"
                      />
                    </ResourceItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <PlayIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Video Tutorials
                  </Typography>
                  <List>
                    <ResourceItem button component="a" href="#">
                      <ListItemIcon>
                        <PlayIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="How to Open a Shariah-Compliant Bank Account" 
                        secondary="Posted 2 weeks ago • 7 min video"
                      />
                    </ResourceItem>
                    <ResourceItem button component="a" href="#">
                      <ListItemIcon>
                        <PlayIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Sadaqah vs Zakah: Understanding the Difference" 
                        secondary="Posted 1 month ago • 12 min video"
                      />
                    </ResourceItem>
                    <ResourceItem button component="a" href="#">
                      <ListItemIcon>
                        <PlayIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Avoiding Riba in Modern Financial Transactions" 
                        secondary="Posted 2 months ago • 15 min video"
                      />
                    </ResourceItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </MotionContainer>
    </PageLayout>
  );
} 