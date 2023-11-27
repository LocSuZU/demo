import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || "default";

  const body = request.body as ReadableStream<Uint8Array>;
 
  const blob = await put(filename, body , {
    access: 'public',
  });
 
  return NextResponse.json(blob);
}