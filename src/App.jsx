import Layout from "./pages/Layout"
import ProductList from "./components/ProductList/ProductList"
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProductList />,
        },
        {
          path: "products",
          element: <ProductList />, 
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
  ]
);

function App() {
  return <RouterProvider router={router} />
}

export default App
