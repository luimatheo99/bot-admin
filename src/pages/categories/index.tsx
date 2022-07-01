import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Spinner } from "../../components/Spinner";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface ICategories {
  id: string;
  description: string;
  order?: number;
}

export function ListCategories() {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  const [categories, setCategories] = useState<ICategories[]>([])

  useEffect(() => {
    async function init() {
      const { data } = await api.get(`/restaurants/${user.idRestaurant}/categories`)
      setCategories(data)
      setIsLoading(false)
    }
    
    init()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 m-12">
        <div className="grid grid-cols-2 gap-2">
          <text className="text-2xl text-left">Categorias</text>
          <div className="text-right">
            <button onClick={() => navigate('/categories/create')} type="button" className="focus:outline-none text-white font-medium rounded-md text-sm px-5 py-2.5 mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-blue-300">
              Cadastrar
            </button>
          </div>
        </div>          
        {isLoading ? (<Spinner />) : (
          <>
            <div className="relative overflow-x-auto shadow-sm rounded-md my-2">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-900 uppercase bg-white border-b border-gray-100">
                  <tr>
                    <th scope="col" className="text-center">Ações</th>
                    <th scope="col" className="px-6 py-3">Descrição</th>
                    <th scope="col" className="px-6 py-3">Ordem</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr className="bg-white hover:bg-gray-100 border-b border-gray-100">
                      <td className="text-center">
                        <button onClick={() => navigate(`/categories/edit/${category.id}`)} type="button" className="p-1 text-sm text-gray-500 focus:outline-none rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                          <svg className="w-6 h-6 inline indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {category.description}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {category.order}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
