import { Link, Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Button } from "component-library"

const App = () => {
  return (
    <>
      <div className="px-4 pt-4">
        <Navbar>
          <div className="m-2">
            <Link to="spaces">Browse Spaces</Link>
            <Link to="list-space" className="ml-4">
              List Your Space
            </Link>
            <Link to="" className="ml-4">
              Sign Up
            </Link>
            <Button size="sm" variant="outline" className="ml-4">
              Login
            </Button>
          </div>
        </Navbar>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
