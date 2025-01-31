import { Loader2 } from "lucide-react"
import { Button as RawButton } from "./ui/button"

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof RawButton> {
  /**
   * Button contents
   */
  label?: string
  /**
   * Show loading state
   */
  loading?: boolean
}

/**
 * Primary UI component for user interaction
 */
const Button = ({ size = "default", disabled, loading, label, ...props }: ButtonProps) => {
  return (
    <RawButton type="button" size={size} disabled={disabled} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {props.children} {label}
    </RawButton>
  )
}

export default Button
