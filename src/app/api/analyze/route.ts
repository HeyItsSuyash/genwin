import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import dbConnect from '@/lib/db/mongodb';
import { Analysis } from '@/lib/models/Analysis';
import { analyzeTrust } from '@/lib/ai/groq';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    if (!adminAuth) {
        return NextResponse.json({ error: 'Firebase Admin not initialized properly on server' }, { status: 500 });
    }
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    if (!decodedToken || !decodedToken.uid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const { inputText } = body;

    if (!inputText || inputText.trim() === '') {
      return NextResponse.json({ error: 'Input text is required' }, { status: 400 });
    }

    // Call AI
    const result = await analyzeTrust(inputText);

    // Save to Database
    await dbConnect();
    const analysis = new Analysis({
      userId: decodedToken.uid,
      inputText,
      claim: result.claim,
      trustScore: result.trustScore,
      verdict: result.verdict,
      sourceCredibility: result.sourceCredibility,
      supportingEvidence: result.supportingEvidence,
      contradictions: result.contradictions,
      missingContext: result.missingContext,
    });
    
    await analysis.save();

    return NextResponse.json({ success: true, data: analysis });
  } catch (error: any) {
    console.error('API Analyze Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
