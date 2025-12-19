import { db } from "./firebaseAdmin";

export async function getProductsFromDB() {
  try {
    const snapshot = await db.collection('products').get();

    return snapshot.docs.map((product) => ({
      id: product.id,
      ...product.data()
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export async function getProductByIdFromDb(id) {
  if (!id) return null;
  try {
    const product = await db.collection("products").doc(id).get();
    if (!product.exists) return null;

    const data = product.data()

    return {
      id: data.id,
      name: data.name ?? "",
      price: Number(data.price) ?? 0,
      description: data.description ?? "",
      imageUrl: data.imageUrl ?? "",
    };
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    return null;
  }
}