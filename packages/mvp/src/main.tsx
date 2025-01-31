import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Index from "./pages/index.tsx"
import Spaces from "./pages/spaces.tsx"
import Space from "./pages/space.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "spaces",
        element: <Spaces />,
      },
      {
        path: "spaces/:spaceId",
        element: <Space />
      }
    ]
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
