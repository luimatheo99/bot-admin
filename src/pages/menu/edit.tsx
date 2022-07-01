import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Spinner } from "../../components/Spinner";
import { SpinnerButton } from "../../components/SpinnerButton";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface ICategories {
    id: string;
    description: string;
    order?: number;
  }

export function EditMenu() {
  const { user } = useAuth();
  const navigate = useNavigate()
  const { name: nameRoute } = useParams<{ name: string }>()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [active, setActive] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [categories, setCategories] = useState<ICategories[]>([])

  useEffect(() => {
    
    async function init() {
        const responseMenu = await api.get(`/restaurants/${user.idRestaurant}/menu/${nameRoute}`)
        setName(responseMenu.data.name)
        setDescription(responseMenu.data.description)
        setCategory(responseMenu.data.category)
        setPrice(responseMenu.data.price)
        setActive(responseMenu.data.active)
        
        const responseCategories = await api.get(`/restaurants/${user.idRestaurant}/categories`)
        setCategories(responseCategories.data)
        setIsLoading(false)
    }
    
    init()
  }, [])

  async function handleEditMenu(event: FormEvent) {
    try {
        setIsLoadingButton(true)
        event.preventDefault();

        await api.put(`/restaurants/${user.idRestaurant}/menu/${nameRoute}`, {
            name,
            category,
            description,
            active,
            price: Number(price?.toString().replace(',', '.')),
            additional: []
        });
        alert('Item salvo')
        navigate('/menus')
        setIsLoadingButton(false)
      } catch (error) {
        console.error(error)
        alert('Erro ao salvar o item')
        setIsLoadingButton(false)
      }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 m-12">
        {isLoading ? (<Spinner />) : (
            <>
                    <text className="text-2xl">Editar Cardápio</text>
                    <form onSubmit={handleEditMenu}>
                        <div className="bg-white border-b border-gray-100 p-6 shadow-sm rounded-md my-2">
                            <div className="grid gap-6 mb-3 lg:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                                    <input
                                        className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                                        type="text"
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                                    <input
                                        className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                                        type="text"
                                        value={description}
                                        onChange={event => setDescription(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-6 mb-3 lg:grid-cols-7">
                                <div className="col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Categoria</label>
                                    <select onChange={(event) => setCategory(event.target.value)} value={category} className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500">
                                        {categories.map((category) => (
                                            <>
                                                <option value={category.description}>{category.description}</option>
                                            </>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Preço</label>
                                    <input
                                        className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500"
                                        type="text"
                                        value={price}
                                        onChange={event => setPrice(event.target.value)}
                                    />
                                </div>
                                <div className="col-span-1 text-center">
                                    <label className="block text-sm font-medium text-gray-900">Ativo</label>
                                    <input
                                        onChange={() => {setActive(!active)}}
                                        checked={active} id="red-checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500focus:ring-2"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-right">
                            <button onClick={() => navigate('/menus')} type="button" className="text-gray-900 bg-white bg-white hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm sm:w-auto px-7 py-2.5 mr-0.5">Voltar</button>
                            <button disabled={isLoadingButton} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-7 py-2.5 ml-0.5">
                                {isLoadingButton ? (
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
                </>
            )}
      </main>
    </div>
  );
}
