import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "component-library/dist/style.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Waitlist from "./pages/Waitlist.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Waitlist />,
    errorElement: <>Page not found</>
  }
  // {
  //   path: "/app",
  //   element: <App />
  // }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
