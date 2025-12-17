import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <main className="flex flex-col items-center justify-between h-screen">
      <Header/>
      {children}
      <Footer/>
    </main>
  )
}