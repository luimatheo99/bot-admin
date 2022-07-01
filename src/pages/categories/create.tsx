import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { SpinnerButton } from "../../components/SpinnerButton";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

export function CreateCategory() {
  const { user } = useAuth();
  const navigate = useNavigate()

  const [description, setDescription] = useState('')
  const [order, setOrder] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateCategory(event: FormEvent) {
    try {
        setIsLoading(true)
        event.preventDefault();
  
        await api.post(`/restaurants/${user.idRestaurant}/categories`, {
            description,
            order,
        });
        alert('Categoria salva')
        navigate('/categories')
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        alert('Erro ao salvar a categoria')
        setIsLoading(false)
      }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 m-12">
        <text className="text-2xl">Cadastrar Categoria</text>
        <form onSubmit={handleCreateCategory}>
            <div className="grid gap-6 mb-3 lg:grid-cols-2 bg-white border-b border-gray-100 p-6 shadow-sm rounded-md my-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                    <input
                        className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                        type="text"
                        onChange={event => setDescription(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Ordem</label>
                    <input
                        className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                        type="number"
                        onChange={event => setOrder(Number(event.target.value))}
                    />
                </div>
            </div>
            <div className="w-full text-right">
                <button onClick={() => navigate('/categories')} type="button" className="text-gray-900 bg-white bg-white hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm sm:w-auto px-7 py-2.5 mr-0.5">Voltar</button>
                <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-7 py-2.5 ml-0.5">
                    {isLoading ? (
                        <>
                            <SpinnerButton />
                            Salvando...
                        </>
                    ) : (
                        'Salvar'
                    )}
                </button>
            </div>
        </form>
      </main>
    </div>
  );
}
