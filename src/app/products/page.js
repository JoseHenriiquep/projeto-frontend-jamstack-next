import ProductsClient from '@/components/ProductsClient'
import { getProductsFromDB } from '@/lib/products';

export default async function Products() {
  const products = await getProductsFromDB(); 
  return <ProductsClient initialProducts={products}/>;
}
