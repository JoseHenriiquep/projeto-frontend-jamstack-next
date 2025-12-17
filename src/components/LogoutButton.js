'use client'
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    router.refresh();
    router.push('/login');
  }

  return (
    <button className="cursor-pointer" onClick={logout}>Sair</button>
  )
}