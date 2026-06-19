import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";
import Main from "./main/Main";
import Book from "./book/Book"
import List from "./list/List"
import Chart from "./charts/Chart"

const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
  },
  {
    path: "/book/:id",
    element: <Book />
  },
  {
    path: "/list",
    element: <List />
  },
  {
    path: "/charts",
    element: <Chart />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
