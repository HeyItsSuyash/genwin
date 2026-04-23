import { NextResponse } from 'next/server';
import { verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(req: Request) {
  try {
    const { token, action } = await req.json();

    if (!token || !action) {
      return NextResponse.json({ error: 'Token and action are required' }, { status: 400 });
    }

    const score = await verifyRecaptcha(token, action);

    if (score === null) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 403 });
    }

    // You can set a threshold for the score (e.g., 0.5)
    if (score < 0.5) {
      return NextResponse.json({ error: 'High risk detected. Please try again later.' }, { status: 403 });
    }

    return NextResponse.json({ success: true, score });
  } catch (error: any) {
    console.error('reCAPTCHA API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
