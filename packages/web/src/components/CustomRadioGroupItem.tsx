import { RadioGroup } from "component-library"

const CustomRadioGroupItem = ({
  label,
  onChange,
  value
}: {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void
  value: string
}) => {
  return (
    <div className="px-5 py-2 bg-white rounded border inline-block">
      <div className="flex items-center space-x-3 space-y-0">
        {/* Custom Checkbox component */}
        <RadioGroup.RadioGroupItem id={value} onChange={onChange} value={value} />
        <label htmlFor={value} className=" inline-block text-sm cursor-pointer">
          {label}
        </label>
      </div>
    </div>
  )
}

export default CustomRadioGroupItem
