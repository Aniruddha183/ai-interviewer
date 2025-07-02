import { NextResponse } from 'next/server';

export async function GET() {
  // Mock session check - replace with actual session validation
  return NextResponse.json({ user: null });
}