import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error: 'unsupported_grant_type',
      error_description: 'The public catalog is currently readable without OAuth tokens.',
    },
    { status: 400 },
  );
}
