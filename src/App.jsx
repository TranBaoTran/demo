import Layout from "./pages/Layout"
import ProductList from "./components/ProductList/ProductList"
import ProductDetails from "./components/ProductDetails/ProductDetails"
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import React, {Suspense} from "react";
const CartPage = React.lazy(() => import ("./components/CartPage/CartPage"))
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthGuard from "./utils/authGuard";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import AdminLayout from "./pages/AdminLayout,";


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProductList  />,
        },
        {
          path: "products",
          element: <ProductList  />, 
        },
        {
          path: "product/detail/:id",
          element: <ProductDetails />, 
        },
        {
          path: "cart",
          element: (
          <Suspense fallback={<div>Loading cart...</div>}>
            <AuthGuard>
              <CartPage />
            </AuthGuard>   
          </Suspense>
        ),
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        {
          path: 'products',
          element: <AdminProducts  />,
        },
      ]
    }
  ]
);

function App() {
  return <RouterProvider router={router} />
}

export default App
