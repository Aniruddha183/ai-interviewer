import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Mock transcription - replace with actual Whisper API integration
    const mockTranscripts = [
      "I have over 5 years of experience in software development, specializing in full-stack web applications.",
      "In my previous role, I led a team of developers to create a customer portal that increased user engagement by 40%.",
      "I'm passionate about clean code and user experience design.",
      "One of my biggest challenges was implementing a real-time chat feature under a tight deadline."
    ];
    
    const transcript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];

    return NextResponse.json({ transcript });
  } catch (error) {
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}