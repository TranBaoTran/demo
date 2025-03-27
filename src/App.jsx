import Layout from "./pages/Layout"
import ProductList from "./components/ProductList/ProductList"
import ProductDetails from "./components/ProductDetails/ProductDetails"
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
          element: <ProductList  />,
        },
        {
          path: "products",
          element: <ProductList  />, 
        },
        {
          path: "product/detail",
          element: <ProductDetails />, 
        },
      ],
    },
  ]
);

function App() {
  return <RouterProvider router={router} />
}

export default App
