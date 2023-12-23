import { Loader2 } from "lucide-react"
import { Button as RawButton } from "../ui/button"

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: "default" | "secondary"
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: "default" | "sm" | "lg"
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
  /**
   * Is button disabled?
   */
  disabled?: boolean
  /**
   * Show loading state
   */
  loading?: boolean
  className?: string
}

/**
 * Primary UI component for user interaction
 */
const Button = ({ variant = "default", size = "default", disabled, loading, label, ...props }: ButtonProps) => {
  return (
    <RawButton type="button" variant={variant} size={size} disabled={disabled} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {label}
    </RawButton>
  )
}

export default Button
