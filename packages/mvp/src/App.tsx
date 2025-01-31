// import { Link } from "react-router-dom"
import { Link, Outlet } from "react-router-dom"
import { EnclaveIcon, FacebookIcon, LinkedinIcon, XIcon } from "./components/icons"
import { Toaster } from "@/components/ui/toaster"
import enclaveFooter from "./assets/png/enclave-footer.png"
import Button from "./components/Button"
import InstagramIcon from "./components/icons/Instagram"

function App() {
  return( 
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex fixed z-10 justify-between border-b p-2 w-full bg-white sm:px-16 md:px-28">
        <div className="flex justify-center pt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Link to="/" className="text-primary text-xl font-bold flex gap-1">
            <EnclaveIcon color="primary" />
            <span>enclave</span>
          </Link>
        </div>

        <Button>
          <a href="mailto:hi@myenclave.space">Talk to Us</a>
        </Button>
      </nav>
      
      {/* Render everything else here */}
      <div className="flex-grow mt-14">
        <Toaster />
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-[#F7F9FC] w-full p-10 mt-16 flex flex-col justify-between">
        <div className="border-b pb-4 flex justify-between">
          <img src={enclaveFooter} />
          
          <div className="flex flex-col justify-end">
            <div className="flex gap-6 justify-center">
              <a href="https://twitter.com/enclve" target="_blank">
                <XIcon width="22" height="24" color="primary" />
              </a>
              <span className="-mt-1">
                <a href="https://www.facebook.com/enclavellc" target="_blank">
                  <FacebookIcon width="32" height="32" color="primary" />
                </a>
              </span>
              <span className="-mt-1">
                <a href="https://www.linkedin.com/company/enclve" target="_blank">
                  <LinkedinIcon width="32" height="32" color="primary" />
                </a>
              </span>
              <span className="-mt-1">
                <a href="https://www.instagram.com/myenclve?igsh=MXBsa3hmZjBsNXU4Mw==" target="_blank">
                  <InstagramIcon width="32" height="32" color="primary" />
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          &copy; {new Date().getFullYear()} Enclave
        </div>
      </footer>
    </div>
  )
}

export default App
