import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Define types for our data
interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  requestId: string;
  beneficiaryId: string;
  amount: number;
  donationType: string;
  purpose: string;
  isAnonymous: boolean;
  timestamp: string;
  status: string;
}

interface BlockchainRecord {
  blockId: number;
  hash: string;
  previousHash: string;
  timestamp: number;
  donor: {
    id: string;
    name: string;
  };
  beneficiary: {
    id: string;
    requestId: string;
  };
  amount: number;
  type: string;
  purpose: string;
  status: string;
  confirmations: number;
}

// Mock database of donations
const donations: Donation[] = [];

// Mock blockchain data
const blockchainData: BlockchainRecord[] = [
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
  }
];

// Helper function to generate blockchain hash
function generateHash(data: Record<string, any>): string {
  const stringData = JSON.stringify(data);
  return '0x' + crypto.createHash('sha256').update(stringData).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      donorId,
      donorName,
      requestId,
      beneficiaryId,
      amount,
      donationType,
      purpose,
      isAnonymous
    } = body;
    
    // Validate required fields
    if (!donorId || !requestId || !beneficiaryId || !amount || !donationType || !purpose) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real app, we would process payment here
    
    // Generate a unique donation ID
    const donationId = `don-${Math.floor(100 + Math.random() * 900)}`;
    
    // Create donation record
    const donation: Donation = {
      id: donationId,
      donorId,
      donorName: isAnonymous ? 'Anonymous' : donorName,
      requestId,
      beneficiaryId,
      amount,
      donationType,
      purpose,
      isAnonymous: !!isAnonymous,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    // Save donation (in a real app, this would go to a database)
    donations.push(donation);
    
    // Create blockchain record
    const lastBlock = blockchainData[blockchainData.length - 1];
    const newBlockId = lastBlock.blockId + 1;
    
    const blockchainRecord: BlockchainRecord = {
      blockId: newBlockId,
      hash: generateHash({ 
        blockId: newBlockId, 
        donationId, 
        timestamp: new Date().getTime(),
        previousHash: lastBlock.hash
      }),
      previousHash: lastBlock.hash,
      timestamp: new Date().getTime(),
      donor: {
        id: donorId,
        name: isAnonymous ? 'Anonymous' : donorName
      },
      beneficiary: {
        id: beneficiaryId,
        requestId
      },
      amount,
      type: donationType,
      purpose,
      status: 'confirmed',
      confirmations: 1
    };
    
    // Add to blockchain (in a real app, this would be a proper blockchain)
    blockchainData.push(blockchainRecord);
    
    return NextResponse.json({
      success: true,
      message: 'Donation processed successfully',
      donation: {
        id: donation.id,
        amount: donation.amount,
        timestamp: donation.timestamp,
        status: donation.status
      },
      blockchain: {
        blockId: blockchainRecord.blockId,
        hash: blockchainRecord.hash
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Donation processing error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during donation processing' },
      { status: 500 }
    );
  }
}

// Get all donations for a user
export async function GET(request: NextRequest) {
  try {
    // Get donorId from query parameter
    const { searchParams } = new URL(request.url);
    const donorId = searchParams.get('userId');
    
    if (!donorId) {
      return NextResponse.json(
        { success: false, message: 'Donor ID is required' },
        { status: 400 }
      );
    }
    
    // Filter donations by donorId
    const userDonations = donations.filter(donation => donation.donorId === donorId);
    
    return NextResponse.json({
      success: true,
      donations: userDonations
    }, { status: 200 });
    
  } catch (error) {
    console.error('Get donations error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching donations' },
      { status: 500 }
    );
  }
} 