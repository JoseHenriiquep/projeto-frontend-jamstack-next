import Link from "next/link";

export default function Layout({ children }) {
  return (
    <main>
      <div>
        <h3>Estudos JamStack - Next</h3>
        <nav>
          &nbsp;<Link href="/">Inicio</Link>&nbsp; | 
          &nbsp;<Link href="/pagina1">Página 1</Link>
        </nav>
      </div>
      <div>
        {children}
      </div>
    </main>
  )
}