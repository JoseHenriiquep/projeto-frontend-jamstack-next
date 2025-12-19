import AppLayout from "@/components/AppLayout";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <AppLayout>
      <main className="flex flex-col justify-center items-center gap-10 w-screen">
        <div className="flex justify-center items-center flex-col p-2">
          <h1 className="text-xl text-center">Seja bem-vindo, {user ? user.name : 'visitante'}.</h1>
          <p className="text-white text-center">Selecione algum botão para visualizar os produtos ou adicionar um novo produto.</p>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Link href="/products" className="home-buttons">Produtos</Link> 
          <Link href="/addProducts" className="home-buttons">Adicionar produto</Link>
        </div>
      </main>
    </AppLayout>
  )
}