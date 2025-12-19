'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import AppLayout from "@/components/AppLayout";

export default function AddProduct() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  })

  async function handleAddProduct(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/addProduct', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
   if (response.ok) {
      router.push('/products');
      setLoading(false)
    } else {
      const data = await response.json();
      setError(data.error);
      setLoading(false);
    }
  }

  return(
    <AppLayout>
      <div className="flex justify-center items-center flex-col w-screen h-screen">
        <form className="flex flex-col gap-4 w-full max-w-[320px] sm:max-w-[375px] md:max-w-[420px] bg-purple-500 rounded-xl p-10 border-2" onSubmit={handleAddProduct}>
          <h1 className="text-center">Adicione um novo produto</h1>
          <label htmlFor='name'>Nome:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            type="text"
            name="name" 
            id="name"
            placeholder="Ex: Iphone"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor='price'>Preço:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            type="number" 
            name="price" 
            id="price"
            placeholder="Ex: 1590"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <label htmlFor='description'>Description:</label>
          <textarea 
            className="border-2 border-solid rounded-lg p-1"
            name="description" 
            id="description"
            placeholder="Descreva sobre o produto"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <label htmlFor='imageUrl'>URL da imagem:</label>
          <input 
            className="border-2 border-solid rounded-lg p-1"
            name="imageUrl" 
            id="imageUrl"    
            placeholder="Ex: https://imagem-teste.com/images?q=testeteste"
            required        
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          {error && <span className="text-gray-950 text-sm">{error}</span>}
          <button 
            className="sign border-2 border-solid rounded-lg p-2"
          >
            {loading ? <Spinner/> : 'Cadastrar'}
          </button>
        </form>
      </div>
    </AppLayout>
  )
}