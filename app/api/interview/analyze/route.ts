import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, questionId, transcript } = await request.json();
    
    // Mock AI analysis - replace with actual OpenAI integration
    const analysis = {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      feedback: "Great response! You provided specific details and showed enthusiasm. Consider adding more quantifiable achievements to strengthen your answer.",
      strengths: ["Clear communication", "Specific examples", "Enthusiasm"],
      improvements: ["Add quantifiable results", "Structure answer better"],
      duration: Math.floor(Math.random() * 60) + 30 // 30-90 seconds
    };

    return NextResponse.json({ analysis });
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}