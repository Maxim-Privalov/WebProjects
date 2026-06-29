import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import List from "./list/List";
import Main from "./main/Main";
import Building from "./building/Building"
import Chart from "./chart/Chart"
import Testing from "./testing/Testing"
import { Provider } from "react-redux"
import store from "./store"

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
  },
  {
    path: "/testing",
    element: <Testing />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store }>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
