import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import { transformFirebaseError } from "@/lib/firebaseErrors";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const apiKey = process.env.FIREBASE_API_KEY;
    const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const res = await fetch(authUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: transformFirebaseError(data.error?.message) || 'Erro ao fazer login' }, { status: 401 });
    }

    await createSession(data.idToken);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}