import { Button } from "component-library"

const AddSpace = () => {
  return (
    <div className="p-4 bg-secondary min-h-screen">
      <div className="w-6/12 mx-auto">
        <div className="flex justify-between">
          <h3 className="text-2xl">Overview</h3>

          <div>
            <Button>Save & Exit</Button>
          </div>
        </div>
        <div className="shadow-md rounded-md bg-white p-6 mt-5">
          Venue Details
          <div className="flex justify-end">
            <Button>Save & Continue</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSpace
