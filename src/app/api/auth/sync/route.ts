import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import dbConnect from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the token with Firebase Admin
    if (!adminAuth) {
        return NextResponse.json({ error: 'Firebase Admin not initialized properly on server' }, { status: 500 });
    }
    
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    if (!decodedToken || !decodedToken.uid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const { firebaseId, email, name, provider } = body;

    // Connect to MongoDB
    await dbConnect();

    // Upsert User
    const user = await User.findOneAndUpdate(
      { firebaseId: decodedToken.uid },
      { 
        firebaseId: decodedToken.uid,
        email: email || decodedToken.email,
        name: name || decodedToken.name || 'User',
        provider: provider || 'google',
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('API Sync Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
