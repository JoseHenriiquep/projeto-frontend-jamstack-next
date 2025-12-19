import Link from "next/link";
import LogoutButton from '../components/LogoutButton'

export default function Header() {

  return (
    <header className="bg-purple-500 w-screen p-3 flex justify-between items-center">
      <h1 className="text-2xl">ShopCell</h1>
      <nav className="flex gap-5">
        <Link href="/">Inicio</Link>
        <LogoutButton/>
      </nav>
    </header>
  )
}