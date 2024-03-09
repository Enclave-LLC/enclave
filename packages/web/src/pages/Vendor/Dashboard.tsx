import { Button, Calendar } from "component-library"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Card } from "component-library"

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <>
      <div className="px-6 py-2">
        {/* Filter bar */}
        <div className="bg-white rounded p-3">
          <Link to="new-space">
            <Button label="Add new Space" />
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-12 w-full min-h-screen">
          {/* Map with listed spaces */}
          <div className="col-span-5"></div>

          <div className="col-span-7">
            {/* Calendar */}
            <div className=" h-96">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays={false}
                className=" bg-red-50"
              />
            </div>

            <h2>Your Rental Properties</h2>
            <div className="grid grid-cols-2 gap-6">
              {[0, 1, 2, 3].map(() => (
                <div>
                  <Card.Card>
                    <Card.CardHeader>
                      Image Here
                      <Card.CardDescription className="text-primary">Property Name</Card.CardDescription>
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
