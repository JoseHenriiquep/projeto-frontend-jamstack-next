import Layout from '@/components/Layout';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {

  return (
    <Layout>
        <Head>
          <title>Home</title>
        </Head>
        <main>
          <h1>Hello NextJS World!</h1>
        </main>
    </Layout>
  );
}
