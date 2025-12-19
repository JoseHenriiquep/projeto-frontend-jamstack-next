import { db } from "./firebaseAdmin";

export async function getProductsFromDB() {
  const products = await db.collection('products').get();
  return products.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getProductByIdFromDb() {
  const product = await db.collection("products").doc(id).get();
  if (!product.exists) return null;
  return {
    id: product.id,
    ...product.data(),
  };
}