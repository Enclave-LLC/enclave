import classnames from "classnames"
import { Button } from ".."
import { Input as RawInput } from "../ui/input"
import locationGIF from "../../assets/gifs/location.gif"

interface InputProps {
  placeholder?: string
  full?: boolean
  showLocationIcon?: boolean
  button?: {
    label: string
    variant?: "default" | "secondary"
  }
}

const Input = ({ placeholder, showLocationIcon = false, button, ...props }: InputProps) => {
  return (
    <div className=" relative">
      {showLocationIcon && (
        <span className="absolute inset-y-0 left-0 flex items-center w-14 h-14 top-1/2 transform -translate-y-1/2">
          <img src={locationGIF} alt="loading..." />
        </span>
      )}
      <RawInput className={classnames("p-6", { "pl-14": showLocationIcon })} placeholder={placeholder} {...props} />
      {button && (
        <Button
          className=" absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 "
          label={button.label}
          variant={button.variant}
        />
      )}
    </div>
  )
}

export default Input
