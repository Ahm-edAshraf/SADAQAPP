export interface AidRequest {
  id: string;
  type: string;
  amount: number;
  purpose: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  amount: number;
  type: string;
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