import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from './store';
import Main from "./main/Main";
import Book from "./book/Book"
import List from "./list/List"
import Chart from "./charts/Chart"
import Testing from "./testing/Testing"

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
  },
  {
    path: "/testing/",
    element: <Testing />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
