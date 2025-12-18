'use client'

import { signInWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Login() {
  
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      router.refresh();
      router.push('/');
      setLoading(false)
    } else {
      const data = await response.json();
      setError(data.error);
      setLoading(false);
    }
  }

  return(
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex justify-center items-center flex-col h-screen">
        <form className="flex flex-col gap-4 w-full max-w-[320px] sm:max-w-[375px] md:max-w-[420px] bg-purple-500 rounded-xl p-10 border-2" onSubmit={handleLogin}>
          <h1 className="text-center">Login</h1>
          <label htmlFor='email'>Email:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            type="email" 
            name="email" 
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <label htmlFor='password'>Senha:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            type="password" 
            name="password" 
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {error && <span className="text-gray-950 text-sm">{error}</span>}
          <p>Não tem uma conta? <Link href='/register'>Cadastre-se</Link></p>
          <button
            disabled={loading}
            className="sign border-2 border-solid rounded-lg p-2"
          >
            {loading ? <Spinner/> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}