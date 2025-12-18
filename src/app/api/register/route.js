import { db } from "@/lib/firebaseAdmin";
import { transformFirebaseError } from "@/lib/firebaseErrors";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    if (name.trim().length < 3) {
      return NextResponse.json(
        { error: "O nome deve conter no mínimo 3 caracteres" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter no mínimo 6 caracteres" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "As senhas não conferem" },
        { status: 400 }
      );
    }

    const apiKey = process.env.FIREBASE_API_KEY;
    const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    const res = await fetch(authUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.error?.message);
      return NextResponse.json({ error: transformFirebaseError(data.error?.message) || 'Erro ao fazer cadastro' }, { status: 401 });
    }

    const userId = data.localId;

    await db.collection('users').doc(userId).set({
      name,
      email,
      password
    })

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}