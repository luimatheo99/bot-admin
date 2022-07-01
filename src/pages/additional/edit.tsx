import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Spinner } from "../../components/Spinner";
import { SpinnerButton } from "../../components/SpinnerButton";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";  

export function EditAdditional() {
    const { user } = useAuth();
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function init() {
            const { data } = await api.get(`/restaurants/${user.idRestaurant}/additional/${id}`)
            setDescription(data.description)
            setPrice(data?.price)
            setIsLoading(false)
        }
        
        init()
    }, [])

    async function handleEditAdditional(event: FormEvent) {
        try {
            setIsLoading(true)
            event.preventDefault();
    
            await api.put(`/restaurants/${user.idRestaurant}/additional/${id}`, {
                description,
                price: Number(price?.toString().replace(',', '.')),
            });
            alert('Adicional salvo')
            navigate('/additional')
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            alert('Erro ao editar o adicional')
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 m-12">
            {isLoading ? (<Spinner />) : (
                <>
                    <text className="text-2xl">Editar Adicional</text>
                    <form onSubmit={handleEditAdditional}>
                        <div className="grid gap-6 mb-3 lg:grid-cols-2 bg-white border-b border-gray-100 p-6 shadow-sm rounded-md my-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                                <input
                                    className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                                    type="text"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Ordem</label>
                                <input
                                    className="rounded-lg px-5 h-12 w-full border border-gray-300 focus:outline-none focus:border-indigo-500" 
                                    type="text"
                                    value={price}
                                    onChange={event => setPrice(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full text-right">
                            <button onClick={() => navigate('/additional')} type="button" className="text-gray-900 bg-white bg-white hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm sm:w-auto px-7 py-2.5 mr-0.5">Voltar</button>
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
                </>
            )}
        </main>
        </div>
    );
}
