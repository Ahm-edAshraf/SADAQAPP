'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Card,
  CardContent,
  Chip,
  Divider,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Search as SearchIcon,
  Info as InfoIcon,
  LinkOutlined as LinkIcon,
  DataObjectOutlined as DataIcon,
  AccountCircleOutlined as UserIcon,
  AccessTimeOutlined as TimeIcon,
  CheckCircleOutline as VerifiedIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice } from '@/lib/VoiceContext';
import styled from '@emotion/styled';
import PageLayout from '@/components/PageLayout';

// Styled components
const BlockchainHeader = styled(Box)`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const MotionHeader = motion(BlockchainHeader);

const TransactionCard = styled(Card)`
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${(props: { type: string }) => 
      props.type === 'zakah' ? '#2e7d32' : '#ff9800'};
  }
`;

const HashCode = styled(Typography)`
  font-family: monospace;
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: nowrap;
`;

const BlockNumber = styled(Box)`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  border-radius: 50%;
  font-weight: bold;
  color: #424242;
  border: 2px solid white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const BlockLink = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #e0e0e0;
`;

const MotionBox = motion(Box);

// Mock blockchain transaction data
const mockTransactions = [
  {
    blockId: 12453,
    hash: '0x8f7a9e3d5b6c1a2b4c5d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    previousHash: '0x7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8',
    timestamp: new Date('2023-11-15T09:23:45').getTime(),
    donor: {
      id: 'don-458',
      name: 'Anonymous'
    },
    beneficiary: {
      id: 'ben-932',
      requestId: 'req-073'
    },
    amount: 500,
    type: 'zakah',
    purpose: 'Medical Expenses',
    status: 'confirmed',
    confirmations: 32
  },
  {
    blockId: 12452,
    hash: '0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
    previousHash: '0x1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
    timestamp: new Date('2023-11-15T08:56:12').getTime(),
    donor: {
      id: 'don-721',
      name: 'Muhammad Khan'
    },
    beneficiary: {
      id: 'ben-104',
      requestId: 'req-047'
    },
    amount: 1200,
    type: 'zakah',
    purpose: 'Education Fees',
    status: 'confirmed',
    confirmations: 38
  },
  {
    blockId: 12451,
    hash: '0x5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    previousHash: '0x9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    timestamp: new Date('2023-11-15T07:34:21').getTime(),
    donor: {
      id: 'don-367',
      name: 'Aisha Yusuf'
    },
    beneficiary: {
      id: 'ben-567',
      requestId: 'req-129'
    },
    amount: 350,
    type: 'sadaqah',
    purpose: 'Housing Assistance',
    status: 'confirmed',
    confirmations: 45
  },
  {
    blockId: 12450,
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    previousHash: '0xc5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5',
    timestamp: new Date('2023-11-14T22:17:03').getTime(),
    donor: {
      id: 'don-458',
      name: 'Anonymous'
    },
    beneficiary: {
      id: 'ben-783',
      requestId: 'req-182'
    },
    amount: 750,
    type: 'sadaqah',
    purpose: 'Food & Essentials',
    status: 'confirmed',
    confirmations: 67
  },
  {
    blockId: 12449,
    hash: '0xe4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',
    previousHash: '0x3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
    timestamp: new Date('2023-11-14T19:42:58').getTime(),
    donor: {
      id: 'don-196',
      name: 'Ibrahim Hassan'
    },
    beneficiary: {
      id: 'ben-392',
      requestId: 'req-075'
    },
    amount: 1000,
    type: 'zakah',
    purpose: 'Medical Expenses',
    status: 'confirmed',
    confirmations: 72
  }
];

export default function BlockchainPage() {
  const { speak } = useVoice();
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  
  useEffect(() => {
    speak('Welcome to the blockchain ledger page, where all transactions are transparently recorded and immutable.');
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      setTransactions(mockTransactions);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [speak]);
  
  const handleExpandBlock = (blockId: number) => {
    setExpandedBlock(expandedBlock === blockId ? null : blockId);
    speak('Block details expanded. You can view transaction hash, previous block hash, and other blockchain metadata.');
  };
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };
  
  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 18)}...${hash.substring(hash.length - 6)}`;
  };
  
  return (
    <PageLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MotionHeader initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Blockchain Ledger
          </Typography>
          <Typography variant="h6" gutterBottom>
            Transparent, Immutable Record of All Transactions
          </Typography>
          <Typography variant="body1">
            Every donation is securely recorded on our blockchain, ensuring complete transparency and trust.
            The ledger cannot be altered, providing assurance to donors and beneficiaries.
          </Typography>
        </MotionHeader>
        
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search transactions by block ID, hash, or donor/beneficiary ID..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              Recent Transactions
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label="Zakah" 
                color="success" 
                variant="outlined" 
                sx={{ borderWidth: 2 }}
                onClick={() => speak('Filtering to show only Zakah transactions')}
              />
              <Chip 
                label="Sadaqah" 
                color="warning" 
                variant="outlined" 
                sx={{ borderWidth: 2 }}
                onClick={() => speak('Filtering to show only Sadaqah transactions')}
              />
              <Chip 
                label="All Transactions" 
                color="primary" 
                sx={{ fontWeight: 'bold' }}
                onClick={() => speak('Showing all transactions')}
              />
            </Box>
          </Box>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" sx={{ mt: 3 }}>
              Loading Blockchain Data...
            </Typography>
          </Box>
        ) : (
          <AnimatePresence>
            {transactions.map((transaction, index) => (
              <MotionBox
                key={transaction.blockId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TransactionCard type={transaction.type} elevation={3}>
                  <BlockNumber>{transaction.blockId}</BlockNumber>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" component="h3">
                          {transaction.purpose}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <TimeIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {formatTimestamp(transaction.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip
                          label={transaction.type === 'zakah' ? 'Zakah' : 'Sadaqah'}
                          color={transaction.type === 'zakah' ? 'success' : 'warning'}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          icon={<VerifiedIcon />} 
                          label={`${transaction.confirmations} confirmations`} 
                          color="primary" 
                          variant="outlined" 
                          size="small" 
                        />
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Amount
                        </Typography>
                        <Typography variant="h5" color="primary.main" fontWeight="bold">
                          ${transaction.amount}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" align="right">
                          From
                        </Typography>
                        <Typography variant="body1">
                          {transaction.donor.name} ({transaction.donor.id})
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <DataIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="body2" fontWeight="medium">
                        Block Hash: 
                      </Typography>
                    </Box>
                    <HashCode variant="body2">
                      {truncateHash(transaction.hash)}
                    </HashCode>
                    
                    <Button
                      variant="text"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => handleExpandBlock(transaction.blockId)}
                    >
                      {expandedBlock === transaction.blockId ? 'Hide Details' : 'View Block Details'}
                    </Button>
                    
                    {expandedBlock === transaction.blockId && (
                      <MotionBox
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
                          <Typography variant="body2" fontWeight="medium" gutterBottom>
                            Block Information:
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                              Previous Hash:
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {truncateHash(transaction.previousHash)}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                              Beneficiary:
                            </Typography>
                            <Typography variant="body2">
                              {transaction.beneficiary.id} (Request: {transaction.beneficiary.requestId})
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                              Status:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                              {transaction.status.toUpperCase()}
                            </Typography>
                          </Box>
                          
                          <BlockLink>
                            <LinkIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography variant="body2" color="primary">
                              Connected to block #{transaction.blockId - 1} via hash reference
                            </Typography>
                          </BlockLink>
                        </Box>
                      </MotionBox>
                    )}
                  </CardContent>
                </TransactionCard>
              </MotionBox>
            ))}
          </AnimatePresence>
        )}
        
        <Alert severity="info" sx={{ mt: 4 }}>
          <Typography variant="body2">
            This blockchain ledger ensures full transparency without revealing sensitive personal information.
            Each transaction is verified by multiple validators before being permanently recorded.
          </Typography>
        </Alert>
      </Container>
    </PageLayout>
  );
} 