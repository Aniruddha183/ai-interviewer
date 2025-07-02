import { NextResponse } from 'next/server';

export async function POST() {
  // Mock sign out - replace with actual session cleanup
  return NextResponse.json({ success: true });
}