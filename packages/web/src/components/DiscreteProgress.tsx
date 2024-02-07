import { Progress } from "component-library"

interface DiscreteProgressProps {
  numberOfSteps: number
  currentStep: number
}

const DiscreteProgress = ({ numberOfSteps, currentStep }: DiscreteProgressProps) => {
  return (
    <div className="flex w-full">
      <div className="w-1/6">
        {currentStep} of {numberOfSteps}
      </div>
      <div className="ml-3 w-full mt-1">
        <Progress value={(Math.min(currentStep, numberOfSteps) / numberOfSteps) * 100} />
      </div>
    </div>
  )
}

export default DiscreteProgress
