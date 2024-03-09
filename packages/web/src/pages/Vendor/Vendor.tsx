import { Link, Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

const Vendor = () => {
  return (
    <>
      <div className="px-4 pt-4">
        <Navbar>
          <div className="m-2">
            <Link to="">My Listed Spaces</Link>
            <Link to="" className="ml-4">
              Enquiries
            </Link>
            <Link to="" className="ml-4">
              Insights
            </Link>
          </div>
        </Navbar>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Vendor
