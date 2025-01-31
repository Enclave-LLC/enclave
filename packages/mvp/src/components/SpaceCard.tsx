import { Link } from "react-router-dom"
import { Space } from "@/types/spaces"
import { Badge } from "./ui/badge"
import { useEffect, useState } from "react"
import { getDirectImageLink } from "@/lib/utils"

interface SpaceCardProps {
  data: Space
}


const SpaceCard = ({ data }: SpaceCardProps) => {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (data) {
      setImages(data["Add Images of Event Space"].split(", ").map(link => getDirectImageLink(link)))
    }
  }, [data])

  return (
    <Link to={`${data["Name of Event Space"].toLocaleLowerCase().replace(" ", "-")}`} state={ data }>
      <div className="shadow rounded-sm p-4 bg-white" style={{ fontFamily: "Poppins" }}>
        <div className="w-full h-44 bg-secondary rounded-lg overflow-hidden">
          { 
            images.length ? 
            <img src={images[0]} className="w-full h-full object-cover" alt={images[0]} /> : 
            <></>
          }
        </div>

        <div>
          <h3 className="text-primary font-semibold text-xl tracking-tight mt-4 ">{ data["Name of Event Space"] }</h3>
          {/* <p className="text-sm text-gray-400 mb-2 leading-5">
            Details of space
          </p> */}
          <div className="my-2">
            <Badge className="bg-gray-600">{ data["Rates in Ghana Cedis"] } GHS { data["Rate in per hour or per day?"] }</Badge>
          </div>
          <p className="text-primary">{ data["Location of Event Space (GPS location)"] }</p>
        </div>
      </div>
    </Link>
  )
}

export default SpaceCard