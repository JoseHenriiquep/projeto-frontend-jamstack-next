import { createUserWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { auth } from "../firebase";

export default function Register() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if(!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if(formData.name.length < 3) newErrors.name = "O nome deve conter no minimo 3 caracteres"
    if(!formData.email.includes("@")) newErrors.email = "Email Inválido";
    if (formData.password.length < 6) newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "As senhas não conferem";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Usuário cadastrado com sucesso!')
      setFormData({ name: '', email: '', password: '', confirmPassword: ''})
      router.replace("/login");
    }
  }

  return(
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex justify-center items-center flex-col h-screen">
        <form className="flex flex-col gap-4 w-100 bg-purple-500 rounded-xl p-10 border-2" onSubmit={handleSubmit}>
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
          {errors.name && <span className="text-red-500">{errors.name}</span>}
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
          {errors.email && <span className="text-red-500">{errors.email}</span>}
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
          {errors.password && <span className="text-red-500">{errors.password}</span>}
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
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
          <p>Já tem uma conta? <Link href="/login">Entrar</Link></p>
          <button 
            className="border-2 border-solid rounded-lg p-2"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  )
}