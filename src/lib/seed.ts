import { User } from '@/types/user';

// Hardcoded test accounts for development and testing purposes
export const seedUsers: User[] = [
  // Beneficiary accounts
  {
    id: 'ben-1',
    phoneNumber: '+1234567890',
    name: 'Ahmed Ali',
    role: 'beneficiary',
    isVerified: true,
    createdAt: new Date('2023-08-15').toISOString(),
    aidRequests: [
      {
        id: 'req-1',
        type: 'Zakah',
        amount: 500,
        purpose: 'Medical treatment',
        description: 'Need help with medical bills for my daughter',
        status: 'approved',
        createdAt: new Date('2023-09-20').toISOString(),
        updatedAt: new Date('2023-09-25').toISOString(),
      },
      {
        id: 'req-2',
        type: 'Sadaqah',
        amount: 300,
        purpose: 'Rent assistance',
        description: 'Need help with rent payment for this month',
        status: 'pending',
        createdAt: new Date('2023-10-15').toISOString(),
        updatedAt: new Date('2023-10-15').toISOString(),
      }
    ]
  },
  {
    id: 'ben-2',
    phoneNumber: '+2345678901',
    name: 'Fatima Rahman',
    role: 'beneficiary',
    isVerified: true,
    createdAt: new Date('2023-07-05').toISOString(),
    aidRequests: [
      {
        id: 'req-3',
        type: 'Zakah',
        amount: 1200,
        purpose: 'Education expenses',
        description: 'Need help with university tuition fees',
        status: 'approved',
        createdAt: new Date('2023-08-10').toISOString(),
        updatedAt: new Date('2023-08-15').toISOString(),
      },
      {
        id: 'req-4',
        type: 'Sadaqah',
        amount: 250,
        purpose: 'Food assistance',
        description: 'Need help with groceries for my family',
        status: 'rejected',
        createdAt: new Date('2023-09-05').toISOString(),
        updatedAt: new Date('2023-09-10').toISOString(),
      },
      {
        id: 'req-5',
        type: 'Sadaqah',
        amount: 400,
        purpose: 'Utility bills',
        description: 'Need help with electricity and water bills',
        status: 'pending',
        createdAt: new Date('2023-10-01').toISOString(),
        updatedAt: new Date('2023-10-01').toISOString(),
      }
    ]
  },
  
  // Donor accounts
  {
    id: 'don-1',
    phoneNumber: '+3456789012',
    name: 'Muhammad Khan',
    role: 'donor',
    isVerified: true,
    createdAt: new Date('2023-06-20').toISOString(),
    donations: [
      {
        id: 'don-1',
        amount: 500,
        type: 'Zakah',
        recipientId: 'ben-1',
        recipientName: 'Ahmed Ali',
        purpose: 'Medical treatment',
        createdAt: new Date('2023-09-25').toISOString(),
      },
      {
        id: 'don-2',
        amount: 1200,
        type: 'Zakah',
        recipientId: 'ben-2',
        recipientName: 'Fatima Rahman',
        purpose: 'Education expenses',
        createdAt: new Date('2023-08-15').toISOString(),
      },
      {
        id: 'don-3',
        amount: 300,
        type: 'Sadaqah',
        recipientId: 'ben-3',
        recipientName: 'Ibrahim Hassan',
        purpose: 'Food assistance',
        createdAt: new Date('2023-10-05').toISOString(),
      }
    ]
  },
  {
    id: 'don-2',
    phoneNumber: '+4567890123',
    name: 'Aisha Yusuf',
    role: 'donor',
    isVerified: true,
    createdAt: new Date('2023-05-10').toISOString(),
    donations: [
      {
        id: 'don-4',
        amount: 750,
        type: 'Zakah',
        recipientId: 'ben-4',
        recipientName: 'Layla Mahmoud',
        purpose: 'Winter clothing',
        createdAt: new Date('2023-07-20').toISOString(),
      },
      {
        id: 'don-5',
        amount: 1000,
        type: 'Sadaqah',
        recipientId: 'ben-5',
        recipientName: 'Yusef Abbas',
        purpose: 'Home repair',
        createdAt: new Date('2023-09-15').toISOString(),
      }
    ]
  }
];

// Login credentials for demo accounts
export const demoAccounts = [
  {
    phoneNumber: '+1234567890',
    name: 'Ahmed Ali',
    role: 'beneficiary',
    description: 'Beneficiary with approved and pending requests'
  },
  {
    phoneNumber: '+2345678901',
    name: 'Fatima Rahman',
    role: 'beneficiary',
    description: 'Beneficiary with multiple request types'
  },
  {
    phoneNumber: '+3456789012',
    name: 'Muhammad Khan',
    role: 'donor',
    description: 'Donor with multiple donations'
  },
  {
    phoneNumber: '+4567890123',
    name: 'Aisha Yusuf',
    role: 'donor',
    description: 'Donor with larger donations'
  }
];

// This function would be used in a real app to seed the database
// In our prototype, we can use the seedUsers directly from memory
export function seedDatabase() {
  // In a real app, this would write to a database
  console.log('Seeding database with test users...');
  return { success: true, count: seedUsers.length };
}

// Function to get a user by phone number (simulating database lookup)
export function getUserByPhone(phoneNumber: string): User | undefined {
  return seedUsers.find(user => user.phoneNumber === phoneNumber);
}

// Function to get a demo verification code - always '123456' for testing
export function getDemoVerificationCode(): string {
  return '123456';
} 