import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { SpinnerButton } from "../../components/SpinnerButton";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface ICategories {
    id: string;
    description: string;
    order?: number;
  }

export function CreateMenu() {
  const { user } = useAuth();
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState<ICategories[]>([])

  useEffect(() => {
    async function init() {
      const { data } = await api.get(`/restaurants/${user.idRestaurant}/categories`)
      setCategories(data)
      setIsLoading(false)
    }
    
    init()
  }, [])

  async function handleCreateMenu(event: FormEvent) {
    try {
        setIsLoading(true)
        event.preventDefault();

        await api.post(`/restaurants/${user.idRestaurant}/menu`, {
            name,
            category,
            description,
            price: Number(price?.toString().replace(',', '.')),
            additional: []
        });
        alert('Item salvo')
        navigate('/menus')
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        alert('Erro ao salvar o item')
        setIsLoading(false)
      }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 m-12">
        <text className="text-2xl">Cadastrar Cardápio</text>
        <form onSubmit={handleCreateMenu}>
            <div className="grid gap-6 mb-3 lg:grid-cols-2 bg-white border-b border-gray-100 p-6 shadow-sm rounded-md my-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                    <input
                        className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                        type="text"
                        onChange={event => setName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                    <input
                        className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                        type="text"
                        onChange={event => setDescription(event.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Categoria</label>
                    <select onChange={(event) => setCategory(event.target.value)} className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500">
                        {categories.map((category) => (
                            <>
                                <option value={category.description}>{category.description}</option>
                            </>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Preço</label>
                    <input
                        className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="text"
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                    />
                </div>
            </div>
            <div className="w-full text-right">
                <button onClick={() => navigate('/menus')} type="button" className="text-gray-900 bg-white bg-white hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm sm:w-auto px-7 py-2.5 mr-0.5">Voltar</button>
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
