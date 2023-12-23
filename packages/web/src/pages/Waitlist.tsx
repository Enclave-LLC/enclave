import { Button, Input } from "component-library"
import roundedDoughnut from "../assets/svg/rounded-doughnut.svg"

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
  return (
    <>
      <div className="p-4">
        <div className=" rounded bg-secondary p-4"></div>
      </div>

      {/* Why choose Enclave */}
      <div className="pt-10 pb-16 text-center">
        <h1>
          Why choose <span className=" text-primary">Enclave</span>
        </h1>

        <p className=" mt-6 w-6/12 mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita doloribus tempore fugit eaque ratione
          obcaecati at, nisi rerum architecto accusantium perferendis aut, optio eum commodi tenetur minus similique
          aliquid dignissimos!
        </p>

        <div className=" mt-6 rounded px-12 py-8 flex bg-primary w-9/12 mx-auto text-white">
          <div className=" grid grid-cols-3">
            <div className=" col-span-2">
              <div className=" flex flex-col">
                <h3>Join the Waitlist - Your VIP Pass!</h3>
                <p>
                  Be among the pioneers to explore Enclave's groundbreaking features. Secure your early access by
                  joining our exclusive waitlist today. Your dream events are on the horizon
                </p>
                <div>
                  <Input placeholder="Email" showLocationIcon button={{ label: "Join Now" }} />
                </div>
              </div>
            </div>
            <div className=" col-span-1"></div>
          </div>

          <div>Image</div>
        </div>
      </div>

      <div className="py-10 px-16 bg-secondary grid grid-cols-12">
        <div className=" col-span-8">
          <h5>Join the millions</h5>
          <h1 className=" text-3xl font-bold">
            <span className="text-primary">Spread</span> The Excitement
          </h1>
          <p>
            Help us build the Enclave community! <br />
            Share the news with friends, family, and colleagues. <br /> Let's create a buzz together and redefine the
            future of event planning.
          </p>
        </div>

        <div className=" col-span-4">Image</div>
      </div>

      {/* What awaits you */}
      <div className="">
        <h1 className=" text-3xl font-bold pt-10 px-16 text-center">
          What Awaits You on
          <span className="text-primary"> Enclave!</span>
        </h1>

        <div className="py-24 grid grid-cols-3 gap-6">
          {whatAwaitsYou.map((data) => (
            <div>
              <div>
                <img src={roundedDoughnut} alt="Rounded Doughnut" />
              </div>
              <p>{data.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-20 bg-black text-white">
        <div className=" flex justify-center border-b-2 pb-10">
          <div>
            <Button variant="secondary" label="Send Us a Mail" />
          </div>
        </div>
        <div className="pt-10 flex justify-between">
          <div></div>

          <div>Copyright &copy; {new Date().getFullYear()} enclave.space</div>
        </div>
      </footer>
    </>
  )
}

export default Waitlist
