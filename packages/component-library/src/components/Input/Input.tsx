import classnames from "classnames"
import { Button } from ".."
import { Input as RawInput } from "../ui/input"
import { Button as RawButton } from "../ui/button"
import locationGIF from "../../assets/gifs/location.gif"

interface InputProps extends React.ComponentPropsWithoutRef<typeof RawInput> {
  showLocationIcon?: boolean
  button?: React.ComponentPropsWithoutRef<typeof RawButton> & {
    label: string
    loading?: boolean
  }
}

const Input = ({ showLocationIcon = false, className, button, ...props }: InputProps) => {
  return (
    <div className=" relative">
      {showLocationIcon && (
        <span className="absolute inset-y-0 left-0 flex items-center w-14 h-14 top-1/2 transform -translate-y-1/2">
          <img src={locationGIF} alt="loading..." />
        </span>
      )}
      <RawInput className={classnames(className, `p-6`, { "pl-14": showLocationIcon })} {...props} />
      {button && (
        <Button
          className=" absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 "
          {...button}
          label={button.label}
          loading={button.loading}
        />
      )}
    </div>
  )
}

export default Input
