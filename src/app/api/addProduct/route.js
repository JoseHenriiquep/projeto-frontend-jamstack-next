import { db } from "@/lib/firebaseAdmin";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, price, description, imageUrl } = await req.json();

    if (!name || !price || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    if (name.trim().length < 3) {
      return NextResponse.json(
        { error: "O nome deve conter no mínimo 3 caracteres" },
        { status: 400 }
      );
    }

    if (price <= 0){
      return NextResponse.json(
        { error: "Preço inválido" },
        { status: 400 }
      );
    }

    if (description.length < 10) {
      return NextResponse.json(
        { error: "A descrição deve ter no mínimo 10 caracteres" },
        { status: 400 }
      );
    }

    try {
      new URL(imageUrl)
    } catch (error) {
      return NextResponse.json(
        { error: "URL da imagem inválida" },
        { status: 400 }
      );
    }

    await db.collection('products').add({
      name,
      price,
      description,
      imageUrl
    });

    revalidatePath('/products');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}