import { Link } from "react-router-dom"
import { Button, Card } from "component-library"
import EnclaveCalendar from "../../components/EnclaveCalendar"
import { momentLocalizer } from "react-big-calendar"
import moment from "moment"
import GoogleMapWrapper from "../../components/GoogleMapWrapper"
const localizer = momentLocalizer(moment)

const Dashboard = () => {
  // const [date, setDate] = useState<Date | undefined>(new Date())
  const events = [
    {
      title: "Kacy's Event",
      start: new Date(),
      end: new Date()
    }
  ]
  return (
    <>
      <div className="px-6 py-2">
        {/* Filter bar */}
        <div className="bg-white rounded p-3">
          <Link to="new-space">
            <Button label="Add new Space" />
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-12 w-full">
          {/* Map with listed spaces */}
          <div className="col-span-5" style={{ height: "calc(100vh - 90px)" }}>
            <GoogleMapWrapper
              coordinates={{
                lat: 5.5593,
                lng: 0.1974
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="col-span-7 overflow-y-auto p-2" style={{ height: "calc(100vh - 90px)" }}>
            {/* Calendar */}
            <div className="relative h-96 mb-6">
              <EnclaveCalendar localizer={localizer} events={events} />
            </div>

            <h2 className="mb-2 font-medium text-2xl">Your Rental Properties</h2>
            <div className="grid grid-cols-2 gap-6">
              {[0, 1, 2, 3].map(() => (
                <div>
                  <Card.Card>
                    <Card.CardHeader>
                      <div className=" h-[200px] rounded-lg overflow-hidden">
                        <img className="h-full w-full" src="https://via.placeholder.com/1000x200" alt="property" />
                      </div>
                      <Card.CardDescription className="text-primary text-lg font-medium">
                        Property Name
                      </Card.CardDescription>
                    </Card.CardHeader>
                    <Card.CardContent>
                      <p>
                        Location | <span className=" font-semibold text-primary">Price</span>
                      </p>
                    </Card.CardContent>
                  </Card.Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
