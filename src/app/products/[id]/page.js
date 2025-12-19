import AppLayout from "@/components/AppLayout";
import { GraphQLClient } from "graphql-request";
import { unstable_cache } from "next/cache";

const client = new GraphQLClient("http://localhost:3000/api/products");

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


export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  
  const getProduct = unstable_cache(
    async () => {
      const data = await client.request(query, {
        id: resolvedParams.id,
      });
      return data.product;
    },
    ["product"],
    { revalidate: 60 }
  );

  const product = await getProduct();

  return (
    <AppLayout>
      <main className="flex flex-col justify-between items-center gap-5">
        <h1 className="text-center text-xl">Página do produto</h1>
        <div className="flex flex-col justify-between items-center border-2 bg-white p-5 rounded-[10px]">
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