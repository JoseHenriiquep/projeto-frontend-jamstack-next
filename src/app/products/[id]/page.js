import ProductClient from '@/components/ProductClient'
import { getProductByIdFromDb } from '@/lib/products';

export default async function Products({ params }) {
  const resolvedParams = await params;
  const product = await getProductByIdFromDb(resolvedParams.id); 
  return <ProductClient initialProduct={product}/>;
}
