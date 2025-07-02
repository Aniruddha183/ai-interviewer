import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    
    // Mock user creation - replace with actual user creation logic
    if (name && email && password) {
      const user = {
        id: Date.now().toString(),
        name,
        email,
      };

      return NextResponse.json({ user });
    }

    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}