'use client'

import { signInWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function Register() {
  
  const router = useRouter();

  const [error, setError] = useState('')
  const [user, setUser] = useState({  
    id: "",
    email: "",
    password: ""
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const userLogin = () => {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (credentials) => {
        setUser((obj) => {
          const result = {
            ...obj,
            ["id"]: credentials.user.uid,
            ["email"]: credentials.user.email
          }
          return result;
        })
      })
      .catch((err) => {
        console.log(`${err.code} = ${err.message}`);
        setError("Login inválido");
      })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    userLogin();
  }

  useEffect(() => {
    if (user.id.length && user.email) {
      alert("Login Efetuado com Sucesso!");
      setUser({ id: "", email: "", password: "" });
      router.replace("/");
    }
    if (error) {
      alert(error);
      setError('');
      return;
    }
  }, [user, error]);

  return(
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex justify-center items-center flex-col h-screen">
        <form className="flex flex-col gap-4 w-100 bg-purple-500 rounded-xl p-10 border-2" onSubmit={handleLogin}>
          <h1 className="text-center">Registre-se</h1>
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
          <p>Não tem uma conta? <Link href="/register">Cadastre-se</Link></p>
          <button
            className="border-2 border-solid rounded-lg p-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}