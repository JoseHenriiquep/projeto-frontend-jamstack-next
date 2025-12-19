import 'server-only';
import { cookies } from 'next/headers';
import { admin } from './firebaseAdmin';

export async function createSession(idToken) {
  const expiresIn = 30 * 60 * 1000;

  const sessionCookie = await admin
    .auth()
    .createSessionCookie(idToken, { expiresIn });

  const cookieStore = await cookies();
  cookieStore.set('session', sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function verifySession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!cookieStore) return null;

  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;

  try {
    const decoded = await admin.auth().verifySessionCookie(session, true);
    const user = await admin.firestore()
      .collection('users')
      .doc(decoded.uid)
      .get();
    
    if (!user.exists) return null 
  
    return {
      uid: decoded.uid,
      ...user.data(),
    };
    
  } catch (error) {
    return null;
  }
}