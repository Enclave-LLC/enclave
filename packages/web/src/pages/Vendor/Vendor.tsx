import { Link, Outlet, useLocation } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { Button } from "component-library"
import DiscreteProgress from "../../components/DiscreteProgress"

enum PATHNAMES {
  NEW_SPACE = "new-space"
}

const navbarCenterContent = (page: string) => {
  switch (page) {
    case PATHNAMES.NEW_SPACE:
      return (
        <div className=" w-[700px] pt-1">
          <DiscreteProgress numberOfSteps={6} currentStep={1} />
        </div>
      )
    default:
      return (
        <div className="m-2">
          <Link to="">My Listed Spaces</Link>
          <Link to="" className="ml-4">
            Enquiries
          </Link>
          <Link to="" className="ml-4">
            Insights
          </Link>
        </div>
      )
  }
}

const Vendor = () => {
  const location = useLocation()
  const trailingPath = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
  return (
    <>
      <div className="px-4 pt-4">
        <Navbar>{navbarCenterContent(trailingPath)}</Navbar>
      </div>

      {trailingPath != PATHNAMES.NEW_SPACE && (
        <div className="mx-4 p-4">
          <div>
            <Link to="new-space">
              <Button>Add a New Space</Button>
            </Link>
          </div>
        </div>
      )}

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Vendor
