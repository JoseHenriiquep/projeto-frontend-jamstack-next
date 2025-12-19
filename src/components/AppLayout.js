import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  return (
    <main className="flex flex-col items-center justify-between h-screen gap-5">
      <Header/>
      {children}
      <Footer/>
    </main>
  )
}