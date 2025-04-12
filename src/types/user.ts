export interface AidRequest {
  id: string;
  amount: number;
  purpose: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  // Fields for Shariah-based categorization
  needType: 'essential' | 'education' | 'medical' | 'housing' | 'debt' | 'business' | 'other';
  isUrgent: boolean;
  monthlyIncome?: number;
  dependents?: number;
  hasAssets?: boolean;
  // The eligibility type will be determined by the system
  eligibility?: 'zakah' | 'sadaqah' | 'both';
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  amount: number;
  // Donors can specify the type of donation
  type: 'zakah' | 'sadaqah';
  recipientId: string;
  recipientName: string;
  purpose: string;
  createdAt: string;
}

export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  role?: 'beneficiary' | 'donor';
  isVerified: boolean;
  createdAt: string;
  aidRequests?: AidRequest[];
  donations?: Donation[];
} 