import { Button } from "component-library"
import { Link } from "react-router-dom"
import { EnclaveIcon } from "../icons"
import globalLine from "../../assets/svg/global-line.svg"
import englishFlag from "../../assets/png/english-flag.png"

const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <nav className="flex justify-between border-b border-secondary pb-4">
      <div className="flex justify-center pt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div>
          <EnclaveIcon color="primary" />
        </div>
        <div className="ml-2 flex content-center -mt-[3px]">
          <Link to="" className="text-primary text-xl font-bold">
            enclave
          </Link>
        </div>
      </div>

      {children && <div>{children}</div>}

      <div>
        <Button className="shadow" style={{ backgroundColor: "white" }}>
          <img src={englishFlag} width={15} height="auto" alt="English flag" />
          <span className="text-primary ml-1 mr-1">ENG</span>
          <img src={globalLine} alt="English flag" />
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
