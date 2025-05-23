import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { Detail } from "./pages/detail";

import { Layout } from "./components/layout";

const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/produts/:id',
        element:<Detail/>
      }
    ]
  }
])

export {router}