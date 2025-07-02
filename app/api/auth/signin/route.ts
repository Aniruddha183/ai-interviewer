import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Mock authentication - replace with actual auth logic
    if (email && password) {
      const user = {
        id: '1',
        email,
        name: email.split('@')[0],
      };

      return NextResponse.json({ user });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}