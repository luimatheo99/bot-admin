import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export function Header() {
  const { pathname } = useLocation();
  const { signOut } = useAuth()

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/orders" className="group">
                    <span className={`${pathname === '/orders' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Pedidos</span>
                  </Link>

                  <Link to="/categories" className="group">
                    <span className={`${pathname === '/categories' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Categorias</span>
                  </Link>

                  <Link to="/additional" className="group">
                    <span className={`${pathname === '/additional' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Adicionais</span>
                  </Link>

                  <Link to="/menus" className="group">
                    <span className={`${pathname === '/menus' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Cardápio</span>
                  </Link>

                  <Link to="/settings" className="group">
                    <span className={`${pathname === '/settings' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Configurações</span>
                  </Link>

                  <Link to="/" onClick={() => signOut()} className="group">
                    <span className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Sair</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/orders" className="group">
              <span className={`${pathname === '/orders' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Pedidos</span>
            </Link>

            <Link to="/categories" className="group">
              <span className={`${pathname === '/categories' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Categorias</span>
            </Link>

            <Link to="/additional" className="group">
              <span className={`${pathname === '/additional' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Adicionais</span>
            </Link>

            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Menu</a>

            <Link to="/settings" className="group">
              <span className={`${pathname === '/settings' ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}`}>Configurações</span>
            </Link>
          </div>
        </div>
      </nav>

    </div>
  );
}
