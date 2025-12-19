import AppLayout from "@/components/AppLayout";
import { GraphQLClient } from "graphql-request";
import { unstable_cache } from "next/cache";
import Link from "next/link";

export const client = new GraphQLClient("http://localhost:3000/api/products")

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
const getProducts = unstable_cache(
  async () => {
    const data = await client.request(query);
    return data.products;
  },
  ["products"],
  { revalidate: 60 }
);

const data = await getProducts();

export default async function Products() {

  return (
    <AppLayout>
      <main className="flex flex-col w-full justify-between items-center">
        <h1 className="text-center text-xl">Produtos</h1>
        <ul className="flex items-center justify-center gap-10 flex-wrap mt-10">
          {data.map((product) => (
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
