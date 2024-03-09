import { Checkbox as RawCheckbox } from "../ui/checkbox"

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RawCheckbox> {
  /**
   * Checkbox label
   */
  id: string

  label: string
}

const Checkbox = ({ id, label, ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RawCheckbox id={id} {...props} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
