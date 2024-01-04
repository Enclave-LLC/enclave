import { Button } from "component-library"
import roundedDoughnut from "../assets/svg/rounded-doughnut.svg"
import globalLine from "../assets/svg/global-line.svg"

import worldLocation from "../assets/gifs/world-location.gif"
import enclaveSecured from "../assets/gifs/enclave-secured.gif"

import heroBackground from "../assets/png/hero-background.png"
import rocket from "../assets/png/rocket.png"
import leftCloud from "../assets/png/left-cloud.png"
import rightCloud from "../assets/png/right-cloud.png"
import buttomCloud from "../assets/png/bottom-cloud.png"
import rightUpArrow from "../assets/png/arrow-right-up-line.png"
import englishFlag from "../assets/png/english-flag.png"

import JoinWaitlistInput from "../components/JoinWaitlistInput"
import ShareDialog from "../components/ShareDialog"
import { useState } from "react"
import { EnclaveIcon, FacebookIcon, LinkedinIcon, XIcon } from "../components/icons"
import GetSpaceForm from "../components/GetSpaceForm"
import { Link } from "react-router-dom"

const whatAwaitsYou = [
  {
    text: "AI-Driven Search: Describe your event, and let our AI find your perfect venue match"
  },
  {
    text: "Configurable Filters: Tailor your search with filters for size, amenities, availability, location, and more!"
  },
  {
    text: "Seamless Booking Workflow: Easy bookings with transparent pricing and flexible refund policies."
  },
  {
    text: "Virtual Tours: Experience venues firsthand with immersive virtual tours."
  },
  {
    text: "User Ratings and Reviews: Hear from the community about their event experiences."
  },
  {
    text: "Smart Notifications: Stay informed with personalised updates on your event planning journey."
  }
]

const Waitlist = () => {
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <>
      <div className="p-4">
        <div className=" rounded pb-16 sm:pb-4 p-4" style={{ backgroundColor: "#F7F7F8" }}>
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
            {/* <div className="hidden lg:block">
              <Button label="Join Waitlist" style={{ backgroundColor: "#DEDEDE", color: "black" }} />
            </div> */}
            <div>
              <Button className="shadow" style={{ backgroundColor: "white" }}>
                <img src={englishFlag} width={15} height="auto" alt="English flag" />
                <span className="text-primary ml-1 mr-1">ENG</span>
                <img src={globalLine} alt="English flag" />
              </Button>
            </div>
          </nav>

          <div className="flex justify-center text-center pt-28">
            <div className="lg:w-6/12">
              <div>
                <img
                  className="mx-auto"
                  style={{ width: "250px", height: "auto" }}
                  src={worldLocation}
                  alt="Animated World Location"
                />
              </div>

              <h1 className=" text-4xl lg:text-5xl font-bold">
                Elevate Your Events
                <br /> with <span className="text-primary">Enclave</span>
              </h1>

              <p className="my-6 lg:text-lg font-semibold">Book your space now by sharing your event details below.</p>

              <div className="mx-auto">
                <GetSpaceForm />
              </div>
            </div>
          </div>
          <div className=" -mt-28">
            <img src={heroBackground} alt="Hero Background" />
          </div>
        </div>
      </div>

      {/* Why choose Enclave */}
      <div className="pt-10 pb-24 text-center relative overflow-x-hidden">
        <img
          className="absolute -left-20 lg:left-0 -z-10"
          style={{ width: "200px", height: "auto" }}
          src={leftCloud}
          alt="Left cloud"
        />
        <img
          className="absolute -right-20 lg:right-0 bottom-10 -z-10"
          style={{ width: "200px", height: "auto" }}
          src={buttomCloud}
          alt="Buttom cloud"
        />
        <h1 className="text-2xl lg:text-5xl font-semibold">
          Why choose <span className=" text-primary">Enclave</span>
        </h1>

        <div className="w-10/12 mx-auto">
          <p className="mt-5 lg:mt-10 w-11/12 mx-auto lg:text-lg font-semibold lg:font-bold">
            Experience a revolution in event planning with Enclave - your key to effortlessly connecting with dream
            event spaces. Bid farewell to event planning hassles and say hello to endless possibilities!
          </p>
          <div className=" mt-6 rounded-lg px-12 py-8 flex bg-primary mx-auto bg-[url('/src/assets/png/enclave-logo-and-shapes.png')] bg-no-repeat bg-right bg-[length:500px_auto]">
            <div className=" grid lg:grid-cols-3">
              <div className=" lg:col-span-2">
                <div className=" lg:flex flex-col">
                  <h3 className="text-white text-left uppercase tracking-wider">Join the Waitlist - Your VIP Pass!</h3>
                  <p className="text-white text-lg md:text-2xl font-semibold md:font-bold text-left my-6">
                    Be among the pioneers to explore Enclave's groundbreaking features. Secure your early access by
                    joining our exclusive waitlist today. Your dream events are on the horizon
                  </p>
                  <div className="w-full lg:w-9/12">
                    <JoinWaitlistInput />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                {/* <img
                style={{ width: "200px", height: "auto" }}
                src={enclaveLarge}
                alt="Large enclave logo with gradient"
              /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 bg-secondary">
        <div className="grid grid-cols-12 w-10/12 mx-auto">
          <div className="col-span-12 lg:col-span-8 flex content-center">
            <div className="my-auto">
              <h5 className="text-lg">Join the millions</h5>
              <h1 className="text-2xl lg:text-5xl font-bold my-2">
                <span className="text-primary">Spread</span> The Excitement
              </h1>
              <p className="font-semibold md:font-bold my-6 md:text-lg">
                Help us build the Enclave community! <br />
                Share the news with friends, family, and colleagues. <br /> Let's create a buzz together and redefine
                the future of event planning.
              </p>
              <div>
                <Button
                  children={
                    <>
                      <div className="flex gap-2 justify-center content-center">
                        <span className="-mt-[1px]">
                          <XIcon width="13" height="14" color="primary" />
                        </span>
                        <span className="-mt-1">
                          <FacebookIcon width="19" height="19" color="primary" />
                        </span>
                        <span className="-mt-1">
                          <LinkedinIcon width="19" height="19" color="primary" />
                        </span>
                      </div>
                      <div className="ml-2 -mt-[1px]">Spread the word</div>
                      <div className="ml-2">
                        <img style={{ width: "16px", height: "auto" }} src={rightUpArrow} alt="arrow right up line" />
                      </div>
                    </>
                  }
                  className="shadow"
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={() => setOpenDialog(true)}
                />
              </div>
              <ShareDialog title="Share" open={openDialog} setOpen={setOpenDialog} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <img src={rocket} style={{ width: "320px", height: "auto" }} alt="Rocket" />
          </div>
        </div>
      </div>

      {/* What awaits you */}
      <div className="pt-24">
        <div className=" w-10/12 mx-auto">
          <div className="flex justify-between">
            <div>
              <img className="w-[100px] sm:w-[150px] lg:w-[200px] h-auto" src={leftCloud} alt="Left cloud" />
            </div>
            <h1 className="hidden lg:block text-[44px] font-semibold pt-10 text-center">
              What Awaits You on
              <span className="text-primary"> Enclave!</span>
            </h1>
            <div>
              <img className="w-[100px] sm:w-[150px] lg:w-[200px] h-auto" src={rightCloud} alt="Right cloud" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold pt-10 text-center">
            What Awaits You on
            <span className="text-primary"> Enclave!</span>
          </h1>

          <div className="grid md:grid-cols-3 gap-10">
            {whatAwaitsYou.map((data) => (
              <div>
                <div>
                  <img
                    className="w-[64px] md:w-[82px] h-auto mx-auto md:mx-0"
                    src={roundedDoughnut}
                    alt="Rounded Doughnut"
                  />
                </div>
                <p className="font-bold">{data.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enclave Secured */}
      <div className="flex justify-center">
        <div className="-ml-10 md:-ml-0">
          <div className="flex">
            <div>
              <img className="w-[100px] md:w-[140px] h-auto" src={enclaveSecured} alt="enclave secured" />
            </div>
            <div className="-ml-8 md:-ml-12 flex">
              <p className="my-auto text-xl">
                <span className="text-primary">enclave</span>secured
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join the Enclave waitlist */}
      <div className="text-center my-8">
        <h1
          style={{ WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "#16A34A" }}
          className="text-white font-extrabold text-[24px] -mb-[24px] md:text-[50px] md:-mb-[50px] lg:text-[64px] lg:-mb-[64px] xl:text-[72px] xl:-mb-[72px]"
        >
          Join The Enclave Waitlist Now
        </h1>
        <h1 className="text-primary font-extrabold text-[24px] md:text-[50px] lg:text-[64px] xl:text-[72px] relative z-10">
          Join The Enclave Waitlist Now
        </h1>
        <h1
          style={{ WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "#16A34A" }}
          className="text-white font-extrabold text-[24px] -mt-[25px] md:text-[50px] md:-mt-[60px] lg:text-[64px] lg:-mt-[74px] xl:text-[72px] xl:-mt-[82px]"
        >
          Join The Enclave Waitlist Now
        </h1>
      </div>

      <div className="mb-24">
        <p className="text-center font-bold w-10/12 md:w-6/12 mx-auto">
          Don't miss out on the event revolution. Join the Enclave waitlist now and be the first to unlock a new era of
          event planning. Your perfect event space is just a click away!
        </p>

        <div className="w-10/12 md:w-4/12 mx-auto mt-12">
          <JoinWaitlistInput />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-5 sm:px-20 bg-black text-white">
        <div className="flex justify-center border-b-2 pb-10">
          <div>
            <div className="flex justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div>
                <EnclaveIcon color="white" />
              </div>
              <div className="ml-2 flex content-center -mt-1">
                <p className="text-xl font-bold">
                  <span>enclave</span>
                </p>
              </div>
            </div>
            <Button variant="secondary" className="my-4" label="Send Us a Mail" />
            <div className="flex gap-6 justify-center">
              <XIcon width="22" height="24" color="white" />
              <span className="-mt-1">
                <FacebookIcon width="32" height="32" color="white" />
              </span>
              <span className="-mt-1">
                <LinkedinIcon width="32" height="32" color="white" />
              </span>
            </div>
          </div>
        </div>
        <div className="pt-10 flex justify-between">
          <div>
            <Button className="shadow -mt-14 sm:-mt-5" style={{ backgroundColor: "white" }}>
              <img src={englishFlag} width={15} height="auto" alt="English flag" />
              <span className="text-primary ml-1 mr-1">ENG</span>
              <img src={globalLine} alt="English flag" />
            </Button>
          </div>

          <div className="text-xs sm:text-base">Copyright &copy; {new Date().getFullYear()} enclave.space</div>
        </div>
      </footer>
    </>
  )
}

export default Waitlist
