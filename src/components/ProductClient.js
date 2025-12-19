'use client'
import { getGraphQLClient } from "@/lib/graphqlClient";
import { useEffect, useState } from "react";
import AppLayout from "./AppLayout";

const query = `
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      price
      description
      imageUrl
    }
  }
`;

export default function ProductPage({ initialProduct }) {
  
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    if (!initialProduct?.id) return
    getGraphQLClient().request(query, { id: initialProduct.id }).then(data => {
      if (data?.product) {
        setProduct(data.product);
      }
    });
  }, [initialProduct?.id]);


  return (
    <AppLayout>
      <main className="flex flex-col justify-between items-center gap-5">
        <h1 className="text-center text-xl">Página do produto</h1>
        <div className="flex flex-col justify-between items-center border-2 bg-white p-5 rounded-[10px]">
          {product.name}
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} width={200} height={200}/>
          )}
          <p>R$ {product.price}</p>
        </div>
        <p className="text-lg text-white">Descrição: {product.description}</p>    
      </main>
    </AppLayout>
  );
}