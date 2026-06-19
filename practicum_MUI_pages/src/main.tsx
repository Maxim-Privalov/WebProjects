import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";
import List from "./list/List";
import Main from "./main/Main";
import Building from "./building/Building"
import Chart from "./chart/Chart"

const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
  },
  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/building/:id",
    element: <Building />
  },
  {
    path: "/chart/",
    element: <Chart />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
