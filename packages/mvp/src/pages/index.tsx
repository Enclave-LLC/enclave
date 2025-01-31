import Input from "@/components/Input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import accra from "../assets/jpg/accra.jpg"
import { Badge } from "@/components/ui/badge"
import { addCity } from "@/api/spaces-google-sheet"
import { useToast } from "@/hooks/use-toast"

const Index = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loadingAddCity, setLoadingAddCity] = useState(false)
  const [newCity, setNewCity] = useState("")
  const { toast } = useToast()

  const handleSpaceSearch = () => {
    navigate(`/spaces?q=${searchQuery}`)
  }

  const addYourCity = async () => {
    setLoadingAddCity(true)
    try {
      await addCity(newCity)
      toast({
        title: "Request Received",
        description: "We have received your request 🎉. Thank you.",
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (e: any) {
      toast({
        title: "Request Failed",
        description: "We couldn't receive your request. Please try again.",
      })
    }
    setLoadingAddCity(false)
  }

  return (
    <>
      {/* style={{ height: "calc(100vh - 50px)"}} */}
      <div className="flex justify-center items-center w-full bg-[#f9f9f9] py-48">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold">Book Your <span className="text-primary">Event Space</span></h1>
          <Input 
            className="mt-4 bg-white" 
            button={{ 
              label: "Search",
              onClick: handleSpaceSearch
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            showLocationIcon 
            placeholder="Describe the event or space..."  />
        </div>
      </div>
      
      {/* Connecting you to spaces section */}
      <div className="mx-10 sm:mx-16 md:mx-28 mt-16 md:mt-28">
        <div className="md:flex md:justify-between">
          <div>
            <h5>Connecting you to</h5>
            <h2 className="text-3xl sm:text-4xl font-semibold"><span className="text-primary">Readily Available</span> Spaces</h2>
          </div>

          <div className="mt-4 md:mt-0 md:flex md:flex-col md:justify-end">
            <Link to="/spaces">
              <Button>Browse Spaces</Button>
            </Link>
          </div>
        </div>
        
        <div className="md:h-96">
          <div className="flex flex-col mt-6 gap-3 md:gap-6 md:grid h-full">
            <div className="rounded-xl overflow-hidden relative">
              <Badge className="absolute top-0 mt-2 ml-2" variant="secondary" >100+ Accra</Badge>
              <img
                src={accra}
                className="w-full h-full cursor-pointer object-cover transition duration-300 ease-in-out hover:scale-110 hover:blur-sm"
              />
              {/* <p className="absolute bottom-0 text-right w-full p-1 text-white">
                Photo by <a className="text-blue-700" href="https://unsplash.com/@nana_kwandoh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Nana Kwandoh</a> on <a className="text-blue-700" href="https://unsplash.com/photos/a-building-with-three-stars-on-top-of-it-9ieZ4ooO4-4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
              </p> */}
            </div>
            {/* <div className="bg-red-200 rounded-xl overflow-hidden relative">
              <Badge className="absolute top-0 z-10 mt-2 ml-2" variant="secondary">Coming soon to </Badge>
            </div>
            <div className="bg-red-200 rounded-xl overflow-hidden relative">
              <Badge className="absolute top-0 z-10 mt-2 ml-2" variant="secondary">Coming soon</Badge>
            </div> */}
          </div>
        </div>

        <div className="mt-10 sm:mt-16 md:mt-28 sm:mb-14 flex justify-center">
          {/* Modal: Coming to your city soon (city typed) */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold">Not in your City Yet?</h2>
            <div className="mt-4">
              <Input
                className=" bg-white"
                button={{
                  label: "Submit",
                  loading: loadingAddCity,
                  disabled: loadingAddCity,
                  onClick: addYourCity
                }}
                onChange={(e) => setNewCity(e.target.value)}
                showLocationIcon
                placeholder="What's the name of your city" />
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Index