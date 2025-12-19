'use client'
import AppLayout from "@/components/AppLayout";
import { getGraphQLClient } from "@/lib/graphqlClient";
import Link from "next/link";
import { useEffect, useState } from "react";

const query = `
  query {
    products {
      id
      name
      price
      imageUrl
    }
  }
`

export default function ProductsClient({ initialProducts }) {

  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    getGraphQLClient().request(query).then(data => {
      setProducts(data.products);
    });
  }, []);

  return (
    <AppLayout>
      <main className="flex flex-col w-full justify-between items-center">
        <h1 className="text-center text-xl">Produtos</h1>
        <ul className="flex items-center justify-center gap-10 flex-wrap mt-10">
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`} className="flex flex-col justify-center items-center">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} width={200} height={200}/>
              )}
                <p className="text-black">Nome: {product.name}</p>
                <p>R${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </AppLayout>
  );
}