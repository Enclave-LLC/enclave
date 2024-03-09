import Navbar from "../../components/Navbar"
import AddSpaceForm from "../../components/Vendor"
import DiscreteProgress from "../../components/DiscreteProgress"
import { MAX_STEPS } from "./utils/constants"
import { useState } from "react"

const AddSpace = () => {
  const [currentStep, setCurrentStep] = useState(1)
  return (
    <>
      <div className="px-4 pt-4">
        <Navbar>
          <div className=" w-[700px] pt-1">
            <DiscreteProgress numberOfSteps={MAX_STEPS} currentStep={currentStep} />
          </div>
        </Navbar>
      </div>
      <div className="p-4 bg-secondary min-h-screen">
        <div className="w-8/12 mx-auto">
          <AddSpaceForm onPageNext={setCurrentStep} />
        </div>
      </div>
    </>
  )
}

export default AddSpace
