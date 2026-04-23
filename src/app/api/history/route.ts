import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import dbConnect from '@/lib/db/mongodb';
import { Analysis } from '@/lib/models/Analysis';

export async function GET(req: Request) {
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

    // Connect to Database
    await dbConnect();
    
    // Fetch History
    const history = await Analysis.find({ userId: decodedToken.uid })
                                  .sort({ createdAt: -1 })
                                  .limit(50); // Get latest 50 for MVP

    return NextResponse.json({ success: true, data: history });
  } catch (error: any) {
    console.error('API History Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
