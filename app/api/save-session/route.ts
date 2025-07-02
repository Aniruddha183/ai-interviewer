import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      sessionId, 
      userId, 
      transcript, 
      videoUrl, 
      scores, 
      feedback,
      duration 
    } = await request.json();
    
    // Mock session save - replace with actual database save
    const savedSession = {
      id: sessionId,
      userId,
      completedAt: new Date().toISOString(),
      transcript,
      videoUrl,
      scores,
      feedback,
      duration,
      overallScore: scores.reduce((acc: number, score: number) => acc + score, 0) / scores.length
    };

    return NextResponse.json({ session: savedSession });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
  }
}