import { getSpaces } from "@/api/spaces-google-sheet"
import Button from "@/components/Button"
import Input from "@/components/Input"
import SpaceCard from "@/components/SpaceCard"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Space } from "@/types/spaces"
import { SlidersHorizontal } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"




const Spaces = () => {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState("")
  const q = searchParams.get("q") || ""

  const [spaces, setSpaces] = useState<Space[]>([])
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([])

  const [checkedValues, setCheckedValues] = useState<string[]>([])

  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [searchLocation, setSearchLocation] = useState<string>("")

  const [uniqueVenueTypes, setUniqueVenueTypes] = useState<string[]>([])

  // Pagination start
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage)
  const visiblePageCount = 5; 

  //Start and end of visible page range
  let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2))
  const endPage = Math.min(totalPages, startPage + visiblePageCount - 1)
   
  if(endPage - startPage + 1 < visiblePageCount){
    startPage = Math.max(1, endPage - visiblePageCount + 1)
  }
  const pages = Array.from({length: endPage - startPage + 1},(_,i) => startPage + i);

  //Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredSpaces.slice(indexOfFirstItem, indexOfLastItem) 

  //pagination end



  const handleCheckboxChange = (checked: boolean, type: string) => {
    setCheckedValues((prev) =>
      checked ? [...prev, type] : prev.filter((value) => value !== type)
    )
  }

  const searchWithFilters = useCallback(() => {
    let results = spaces

    if (searchLocation) {
      results = spaces.filter(space => {
        const words = searchLocation.split(/[^A-Za-z]/)
        return (
          words.some(word => space["Location of Event Space (GPS location)"]?.toLowerCase()?.includes(word.toLowerCase())) ||
          words.some(word => space["Name of Event Space"]?.toLowerCase()?.includes(word.toLowerCase())) ||
          words.some(word => "Accra".toLowerCase()?.includes(word.toLowerCase()))
        )
      })
    }

    if (checkedValues.length) {
      results = spaces.filter(space => checkedValues.some(cv => space["Venue Type"].includes(cv)))
    }

    if (minPrice != "") {
      results = spaces
        .filter(space => {
          const rate = parseFloat(space["Rates in Ghana Cedis"].replace(",", ""))
          return !isNaN(rate) && rate >= parseFloat(minPrice)
        })
    }

    if (maxPrice != "") {
      results = spaces
        .filter(space => {
          const rate = parseFloat(space["Rates in Ghana Cedis"].replace(",", ""))
          return !isNaN(rate) && rate <= parseFloat(maxPrice)
        })
    }

    setFilteredSpaces(results)
  }, [checkedValues, maxPrice, minPrice, searchLocation, spaces])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSpaces()
        setSpaces(res)
        setFilteredSpaces(res)
        
        if (query) {
          setSearchLocation(query)
          searchWithFilters()
        }

        const venueTypes = res.flatMap(spaces => spaces["Venue Type"].split(", ").map(type => type.trim()).filter(type => type))
        setUniqueVenueTypes([...new Set<string>(venueTypes)])
      } catch (err: unknown) {
        console.log(err)
      }
    }
    fetchData()
  }, [query, searchWithFilters])

  useEffect(() => {
    setQuery(q)
  }, [q])


  return (
    <div className="flex justify-center">
      <div className="px-4 md:px-0 w-full md:w-[70%] lg:w-[60%]">
       
        {/* Filter */}
        <div className="p-2 shadow my-4 w-full sticky top-0 bg-white md:flex md:justify-between">
          <div className="flex gap-2">
            <Input h={0} className="h-10" showLocationIcon placeholder="Search for location" defaultValue={query} onChange={(e) => setSearchLocation(e.target.value)} />
            <Button size="lg" onClick={searchWithFilters} >Search</Button>
          </div>
          
          <Popover>
            <PopoverTrigger>
              <Button size="lg" variant="outline">
                <SlidersHorizontal />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="space-y-6">
              <div>
                <h3 className="font-semibold">Venue Type</h3>
                {
                  uniqueVenueTypes.map(type => (
                    <div className="flex items-center space-x-2 space-y-2" key={type}>
                      <Checkbox
                        id={type}
                        checked={checkedValues.includes(type)}
                        onCheckedChange={(checked: boolean) => handleCheckboxChange(checked, type)}
                      />
                      <label
                        htmlFor={type}
                        className="text-sm font-medium leading-none"
                      >
                        {type}
                      </label>
                    </div>
                  ))
                }
                
              </div>

              <div>
                <h3 className="font-semibold">Price Range</h3>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="min-price" className="text-sm font-medium">
                      Min Price
                    </label>
                    <Input
                      id="min-price"
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      min={0}
                      onChange={(e) => setMinPrice(e.target.value)}
                      
                    />
                  </div>

                  <span className="text-lg font-medium">to</span>

                  <div className="flex flex-col">
                    <label htmlFor="max-price" className="text-sm font-medium">
                      Max Price
                    </label>
                    <Input
                      id="max-price"
                      type="number"
                      placeholder="10000"
                      value={maxPrice}
                      max={0}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      
                    />
                  </div>
                </div>
              </div>

              <div>
                <Button className="w-full" onClick={searchWithFilters}>Save</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
          
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            currentItems.length ?
              (
                currentItems.map((space, idx) => (
                  <SpaceCard key={idx} data={space} />
                ))
              ):
              (
                <>
                  <div>
                    No space available
                  </div>
                </>
              )
          }
        </div>

       

       {/* Pagination */}
       <div className="flex justify-center mt-4 p-2">
        <div className="border shadow rounded p-1 space-x-1">
          <Button  label="< Previous" variant={"link"} size={"sm"} disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}/>

            {pages.map((num) => <Button key={num} onClick={() => setCurrentPage(num)} variant={ currentPage == num ? "link" :  "ghost"} label={`${num}`} size={"sm"}  />)}

          <Button  label="Next >" variant={"link"} size={"sm"} disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}/>
        </div>
    
       </div>
     
      </div>
    </div>
  )
}

export default Spaces