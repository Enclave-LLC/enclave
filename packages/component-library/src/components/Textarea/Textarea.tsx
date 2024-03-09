import { Textarea as RawTextarea } from "../ui/textarea"

interface TextareaProps extends React.ComponentPropsWithoutRef<typeof RawTextarea> {}

const Textarea = ({ ...props }: TextareaProps) => {
  return <RawTextarea {...props} />
}

export default Textarea
