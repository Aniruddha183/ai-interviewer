import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, interviewType } = await request.json();
    
    // Mock interview session creation
    const session = {
      id: Date.now().toString(),
      userId,
      interviewType,
      startTime: new Date().toISOString(),
      status: 'active',
      questions: [
        {
          id: '1',
          text: 'Tell me about yourself and your professional background.',
          category: 'General',
          difficulty: 'Easy'
        },
        {
          id: '2',
          text: 'Describe a challenging project you worked on and how you overcame the obstacles.',
          category: 'Behavioral',
          difficulty: 'Medium'
        }
      ]
    };

    return NextResponse.json({ session });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to start interview' }, { status: 500 });
  }
}