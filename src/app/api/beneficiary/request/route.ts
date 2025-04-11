import { NextRequest, NextResponse } from 'next/server';

// Mock database of aid requests
const aidRequests = [
  {
    id: 'req-001',
    userId: 'user-ben-123',
    amount: 350,
    purpose: 'Medical expenses',
    description: 'Need assistance with hospital bills for emergency surgery',
    category: 'medical',
    isUrgent: true,
    needType: 'essential',
    createdAt: '2023-10-15',
    status: 'approved',
    eligibility: 'zakah'
  },
  {
    id: 'req-002',
    userId: 'user-ben-789',
    amount: 500,
    purpose: 'Educational fees',
    description: 'Seeking help with university tuition fees for the new semester',
    category: 'education',
    isUrgent: false,
    needType: 'education',
    createdAt: '2023-11-02',
    status: 'pending',
    eligibility: 'both'
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId, 
      amount, 
      purpose, 
      description, 
      category, 
      isUrgent, 
      needType, 
      monthlyIncome, 
      dependents, 
      hasAssets 
    } = body;
    
    // Validate required fields
    if (!userId || !amount || !purpose || !description || !category || isUrgent === undefined || !needType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Determine eligibility based on inputs
    // This is a simplified version - in a real app, this would be more complex
    let eligibility = 'both';
    if (monthlyIncome > 1500 || hasAssets) {
      eligibility = 'sadaqah';
    } else if (needType === 'essential' && (dependents > 2 || monthlyIncome < 800)) {
      eligibility = 'zakah';
    }
    
    // Generate a unique ID
    const id = `req-${Math.floor(100 + Math.random() * 900)}`;
    
    // Create a new request
    const newRequest = {
      id,
      userId,
      amount,
      purpose,
      description,
      category,
      isUrgent,
      needType,
      monthlyIncome,
      dependents,
      hasAssets,
      createdAt: new Date().toISOString(),
      status: 'pending',
      eligibility
    };
    
    // In a real app, we would save this to a database
    aidRequests.push(newRequest);
    
    return NextResponse.json({
      success: true,
      message: 'Aid request submitted successfully',
      request: {
        id: newRequest.id,
        status: newRequest.status,
        eligibility: newRequest.eligibility
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Aid request submission error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during aid request submission' },
      { status: 500 }
    );
  }
}

// Get all aid requests for a user
export async function GET(request: NextRequest) {
  try {
    // Get userId from query parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Filter requests by userId
    const userRequests = aidRequests.filter(req => req.userId === userId);
    
    return NextResponse.json({
      success: true,
      requests: userRequests
    }, { status: 200 });
    
  } catch (error) {
    console.error('Get aid requests error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching aid requests' },
      { status: 500 }
    );
  }
} 