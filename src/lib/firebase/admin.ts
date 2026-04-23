import * as admin from 'firebase-admin';

// Protect against multiple initializations in development
if (!admin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error: any) {
      console.error('Firebase admin initialization error', error.stack);
    }
  } else {
    console.warn('Firebase admin environment variables are missing. Admin SDK features will be unavailable.');
  }
}

export const adminAuth = admin.apps.length > 0 ? admin.auth() : null;
export default admin;
