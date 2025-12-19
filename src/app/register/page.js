'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function Register() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
   if (response.ok) {
      router.refresh();
      router.push('/login');
      setLoading(false)
    } else {
      const data = await response.json();
      setError(data.error);
      setLoading(false);
    }
  }

  return(
    <div>
      <div className="flex justify-center items-center flex-col h-screen">
        <form className="flex flex-col gap-4 w-full max-w-[320px] sm:max-w-[375px] md:max-w-[420px] bg-purple-500 rounded-xl p-10 border-2" onSubmit={handleRegister}>
          <h1 className="text-center">Registre-se</h1>
          <label htmlFor='name'>Nome:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            type="text"
            name="name" 
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor='email'>Email:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            type="email" 
            name="email" 
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <label htmlFor='password'>Senha:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            type="password" 
            name="password" 
            id="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <label htmlFor='confirmPassword'>Confirmar senha:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            type="password" 
            name="confirmPassword" 
            id="confirmPassword"    
            required        
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {error && <span className="text-gray-950 text-sm">{error}</span>}
          <p>Já tem uma conta? <Link href='/login'>Entrar</Link></p>
          <button 
            className="sign border-2 border-solid rounded-lg p-2"
          >
            {loading ? <Spinner/> : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  )
}