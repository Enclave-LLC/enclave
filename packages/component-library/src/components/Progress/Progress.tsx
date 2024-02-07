import { Progress as RawProgress } from "../ui/progress"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof RawProgress> {
  /**
   * Progress value
   */
  value?: number
}

/**
 * Primary UI component for user interaction
 */
const Progress = ({ value, ...props }: ProgressProps) => {
  return <RawProgress value={value} {...props} />
}

export default Progress
