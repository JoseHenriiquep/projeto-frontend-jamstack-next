import Head from "next/head";
import Layout from "../src/components/Layout";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export default function Pagina1() {
  return (
    <Layout>
      <Head>
        <title>Página 1</title>
      </Head>
      <Header />
      <h1>Página 1</h1>
      <Footer />
    </Layout>
  )
}