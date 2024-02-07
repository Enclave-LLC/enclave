import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "component-library/dist/style.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Waitlist from "./pages/Waitlist.tsx"
import { Analytics } from "@vercel/analytics/react"
import App from "./App.tsx"
import Homepage from "./pages/Homepage.tsx"
import Spaces from "./pages/Spaces.tsx"
import ListSpace from "./pages/ListSpace.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"
import { AddSpace, Dashboard, Vendor } from "./pages/Vendor"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Waitlist />,
    errorElement: <ErrorPage />
  },
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "spaces",
        element: <Spaces />
      },
      {
        path: "list-space",
        element: <ListSpace />
      }
    ]
  },
  {
    path: "/app/vendor",
    element: <Vendor />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "new-space",
        element: <AddSpace />
      }
    ]
  },
  {
    path: "/app/customer",
    element: <>Customer</>
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <RouterProvider router={router} />
      <Analytics />
    </React.StrictMode>
  </>
)
