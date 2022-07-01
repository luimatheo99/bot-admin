import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { Orders } from "./pages/orders/Orders";

import { useAuth } from './hooks/auth';
import { useEffect } from "react";
import { SignIn } from "./pages/SignIn";
import { ListCategories } from "./pages/categories/index";
import { CreateCategory } from "./pages/categories/create";
import { EditCategory } from "./pages/categories/edit";
import { ListAdditional } from "./pages/additional";
import { CreateAdditional } from "./pages/additional/create";
import { EditAdditional } from "./pages/additional/edit";
import { Settings } from "./pages/Settings";
import { ListMenus } from "./pages/menu";
import { CreateMenu } from "./pages/menu/create";
import { EditMenu } from "./pages/menu/edit";

export function Router() {
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/')
    } else {
      if (pathname === '/') {
        navigate('/orders')
      } else {
        navigate(pathname)
      }
      
    }
  }, [user])

  return (
    <Routes>
      <Route path="*" element={<Orders />} />
      {user ? (
        <>
          <Route path="/orders" element={<Orders />} />

          <Route path="/categories" element={<ListCategories />} />
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />

          <Route path="/additional" element={<ListAdditional />} />
          <Route path="/additional/create" element={<CreateAdditional />} />
          <Route path="/additional/edit/:id" element={<EditAdditional />} />

          <Route path="/menus" element={<ListMenus />} />
          <Route path="/menus/create" element={<CreateMenu />} />
          <Route path="/menus/edit/:name" element={<EditMenu />} />

          <Route path="/settings" element={<Settings />} />
        </>
      ) : (
        <>
          <Route path="/" element={<SignIn />} />
        </>
      )}
    </Routes>
  );
}
