'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  QuestionAnswer as FAQIcon,
  HelpOutline as HelpIcon,
  Search as SearchIcon,
  Mosque as ZakahIcon,
  Payments as DonationIcon,
  AccountCircle as ProfileIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Headset as SupportIcon,
  LiveHelp as LiveHelpIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';

// Styled components
const HelpHeader = styled(Box)`
  background: linear-gradient(135deg, #1565c0 0%, #0288d1 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const MotionHeader = motion(HelpHeader);

const CategoryCard = styled(Paper)`
  padding: 1.5rem;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const FAQAccordion = styled(Accordion)`
  margin-bottom: 1rem;
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.08);
  
  &::before {
    display: none;
  }
  
  &.Mui-expanded {
    margin-bottom: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

const MotionContainer = motion(Container);
const MotionAccordion = motion(FAQAccordion);

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
      id={`faq-tabpanel-${index}`}
      aria-labelledby={`faq-tab-${index}`}
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

// Mock FAQ data
const generalFAQs = [
  {
    question: "What is SADAQAPP?",
    answer: "SADAQAPP is a Shariah-compliant fintech platform designed to help users manage finances, request financial aid through Zakah/Sadaqah, and make donations to those in need. We focus on accessibility with voice-first interactions for users with limited digital literacy."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes. SADAQAPP uses end-to-end encryption and never stores sensitive financial information. Your personal data is protected according to international data protection standards, and we only collect information necessary for the functioning of our platform."
  },
  {
    question: "How can I enable or disable voice features?",
    answer: "You can toggle voice features on or off in the Settings section. Navigate to Settings > Voice & Audio and use the switch for 'Voice Commands & Feedback' to enable or disable all voice features."
  },
  {
    question: "What makes SADAQAPP Shariah-compliant?",
    answer: "SADAQAPP adheres to Islamic financial principles by ensuring all transactions are free from Riba (interest), avoiding prohibited industries, implementing proper Zakah calculation methods, and having our processes reviewed by qualified Islamic scholars."
  },
  {
    question: "Which languages does SADAQAPP support?",
    answer: "Currently, SADAQAPP supports English, Arabic, Urdu, Malay, and Indonesian languages. You can change your language preference in the Settings page."
  }
];

const beneficiaryFAQs = [
  {
    question: "How do I request financial aid?",
    answer: "From your dashboard, click on the 'Request Aid' button. Fill out the form with your needs, required amount, and purpose of the request. You can also upload supporting documents to verify your situation. Submit the form, and our team will review your request."
  },
  {
    question: "What types of financial aid can I request?",
    answer: "You can request Zakah (if you meet eligibility criteria) or Sadaqah (general charity). The system will help determine which type is appropriate based on your situation and Islamic principles."
  },
  {
    question: "How long does it take to get my request approved?",
    answer: "Most requests are reviewed within 48-72 hours. Once approved, they become visible to donors. The time to receive funding depends on donor contributions. Urgent cases are prioritized for faster review and highlighted to donors."
  },
  {
    question: "Can I request aid for educational expenses?",
    answer: "Yes, educational expenses are valid reasons for requesting aid. This includes tuition fees, educational materials, and other learning-related costs. Please provide relevant details when submitting your request."
  },
  {
    question: "How will I receive the funds if my request is fulfilled?",
    answer: "Once your request is funded, you'll receive a notification. Funds will be transferred to your registered bank account or mobile wallet. You can track the status of your request and disbursement in your dashboard."
  }
];

const donorFAQs = [
  {
    question: "How do I make a donation?",
    answer: "Browse aid requests on your donor dashboard, where you can filter by type (Zakah/Sadaqah) and category. Select a request to view details, and click 'Donate' to specify your contribution amount and complete the payment."
  },
  {
    question: "Is my donation Zakah-compliant?",
    answer: "Yes, all Zakah donations are distributed according to Islamic principles. We ensure recipients meet Zakah eligibility criteria and that funds are used for approved purposes. You can choose to donate specifically to Zakah-eligible causes."
  },
  {
    question: "Can I donate anonymously?",
    answer: "Yes, you can choose to make anonymous donations. During the donation process, you'll find an option to hide your identity from the beneficiary. Your information will still be securely stored in our system but not shared with recipients."
  },
  {
    question: "How can I track where my donations go?",
    answer: "Every donation is recorded on our transparent blockchain ledger. You can view transaction details including amount, timestamp, and purpose, while personal information remains private. Navigate to the Blockchain Ledger page to track all transactions."
  },
  {
    question: "Can I set up recurring donations?",
    answer: "Yes, you can set up monthly recurring donations for both Zakah and Sadaqah. Go to your donor dashboard, select 'Recurring Donation', choose an amount and frequency, and your donation will be automatically processed on your chosen schedule."
  }
];

export default function HelpPage() {
  const { speak } = useVoice();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    speak('Welcome to the help and FAQ page. Here you can find answers to common questions and get support.');
  }, [speak]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    
    const tabMessages = [
      'Showing general frequently asked questions.',
      'Showing frequently asked questions for beneficiaries.',
      'Showing frequently asked questions for donors.',
    ];
    
    speak(tabMessages[newValue]);
  };
  
  const handleAccordionClick = (question: string) => {
    speak(`Question: ${question}`);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  // Filter FAQs based on search term
  const filteredFAQs = (faqs: any[]) => {
    if (!searchTerm) return faqs;
    
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  return (
    <PageLayout>
      <MotionHeader initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Help & FAQ
        </Typography>
        <Typography variant="h6" gutterBottom>
          Find Answers & Support
        </Typography>
        <Typography variant="body1">
          Browse through frequently asked questions or contact our support team for assistance.
        </Typography>
      </MotionHeader>
      
      <MotionContainer 
        maxWidth="lg" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          
          <Paper sx={{ mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="faq tabs"
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab 
                label="General" 
                icon={<FAQIcon />} 
                iconPosition="start" 
              />
              <Tab 
                label="For Beneficiaries" 
                icon={<HelpIcon />} 
                iconPosition="start" 
              />
              <Tab 
                label="For Donors" 
                icon={<DonationIcon />} 
                iconPosition="start" 
              />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              <TabPanel value={tabValue} index={0}>
                {filteredFAQs(generalFAQs).map((faq, index) => (
                  <MotionAccordion 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleAccordionClick(faq.question)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`general-faq-content-${index}`}
                      id={`general-faq-header-${index}`}
                    >
                      <Typography fontWeight="medium">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </MotionAccordion>
                ))}
                
                {filteredFAQs(generalFAQs).length === 0 && (
                  <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                    No results found for "{searchTerm}". Try a different search term.
                  </Typography>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                {filteredFAQs(beneficiaryFAQs).map((faq, index) => (
                  <MotionAccordion 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleAccordionClick(faq.question)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`beneficiary-faq-content-${index}`}
                      id={`beneficiary-faq-header-${index}`}
                    >
                      <Typography fontWeight="medium">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </MotionAccordion>
                ))}
                
                {filteredFAQs(beneficiaryFAQs).length === 0 && (
                  <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                    No results found for "{searchTerm}". Try a different search term.
                  </Typography>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                {filteredFAQs(donorFAQs).map((faq, index) => (
                  <MotionAccordion 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleAccordionClick(faq.question)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`donor-faq-content-${index}`}
                      id={`donor-faq-header-${index}`}
                    >
                      <Typography fontWeight="medium">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </MotionAccordion>
                ))}
                
                {filteredFAQs(donorFAQs).length === 0 && (
                  <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                    No results found for "{searchTerm}". Try a different search term.
                  </Typography>
                )}
              </TabPanel>
            </Box>
          </Paper>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Help Categories
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <CategoryCard elevation={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <ZakahIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Islamic Finance
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Learn about Zakah, Sadaqah, and Shariah-compliant financial principles.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    href="/education"
                  >
                    View Guides
                  </Button>
                </Box>
              </CategoryCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <CategoryCard elevation={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <SettingsIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Accessibility
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Configure voice commands, text size, and other accessibility features.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    href="/settings"
                  >
                    Go to Settings
                  </Button>
                </Box>
              </CategoryCard>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <CategoryCard elevation={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <SupportIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Contact Support
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Get help from our customer support team via chat, email, or phone.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    href="/contact"
                  >
                    Contact Us
                  </Button>
                </Box>
              </CategoryCard>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ mb: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LiveHelpIcon color="primary" sx={{ fontSize: 36, mr: 2 }} />
              <Typography variant="h5" component="h2">
                Can't find what you're looking for?
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph>
              Our support team is available to help you with any questions or issues you may have.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="Email" color="primary" variant="outlined" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="support@sadaqapp.org" 
                      secondary="24-48 hour response time"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="Phone" color="primary" variant="outlined" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="+1 (555) 123-4567" 
                      secondary="Available 9 AM - 5 PM, Sunday-Thursday"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<SupportIcon />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Start Live Chat
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </MotionContainer>
    </PageLayout>
  );
}