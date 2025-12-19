import ProductsClient from '@/components/ProductsClient'
import { getProductsFromDB } from '@/lib/products';

export const revalidate = 60;

export default async function Products() {
  const products = await getProductsFromDB(); 
  console.log(products); 
  return <ProductsClient initialProducts={products}/>;
}
