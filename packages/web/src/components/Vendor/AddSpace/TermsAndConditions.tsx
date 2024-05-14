import { RadioGroup } from "component-library"
import { Control, Controller, FieldErrors } from "react-hook-form"
import * as z from "zod"

import { FormSchema } from "./form-schema"
import Tabs from "../../Tabs"
import CustomRadioGroupItem from "../../CustomRadioGroupItem"

const RadioItemWithBody = ({
  label,
  onChange,
  value,
  children
}: {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void
  value: string
  children: React.ReactNode
}) => {
  return (
    <div className="px-5 py-2 bg-white rounded border inline-block">
      <div className="flex items-center space-x-3 space-y-0">
        {/* Custom Checkbox component */}
        <RadioGroup.RadioGroupItem id={value} onChange={onChange} value={value} />
        <label htmlFor={value} className=" inline-block font-semibold text-primary cursor-pointer">
          {label}
        </label>
      </div>
      <div>{children}</div>
    </div>
  )
}

interface OverviewProps {
  control: Control<z.infer<typeof FormSchema>>
  errors: FieldErrors<z.infer<typeof FormSchema>>
}
const TermsAndConditions = ({ control, errors }: OverviewProps) => {
  return (
    <>
      {/* Space Rules */}
      <div>
        <h3 className="text-lg py-6 border-b">Space Rules</h3>
        <div className="py-10">
          <Tabs
            data={[
              {
                title: "Type rules",
                element: <>Type rules</>
              },
              {
                title: "Use Enclave AI",
                element: (
                  <div>
                    <p>Enclave AI will generate the rules for you</p>
                  </div>
                )
              }
            ]}
          />
        </div>
      </div>

      {/* Cancellation and Refund Policy */}
      <div>
        <h3 className="text-lg py-6 border-b">Cancellation and Refund Policy</h3>
        <div className="py-10">
          <p>
            Guest may cancel their booking within 24 hours of the booking confirmation (but no later than 48 hours
            before the event) and receive a full refund. Bookings cancelled after 24 . hours ( or less than 48 hours
            before the event) will follow the cancellation policy selected below. Cancellations by hosts are always
            fully refunded.
          </p>
        </div>

        <div>
          <Controller
            name="terms_and_conditions.cancellation_policy"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup.RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="gap-5">
                  <RadioItemWithBody
                    label="Very flexible cancellation policy"
                    onChange={field.onChange}
                    value="very_flexible"
                  >
                    <div className="my-3">
                      <p>
                        Cancellations <span className=" font-semibold text-primary">up to 24 hours</span> from event
                        start time will receive a full refund
                      </p>
                    </div>
                  </RadioItemWithBody>

                  <RadioItemWithBody label="Flexible cancellation policy" onChange={field.onChange} value="flexible">
                    <div className="my-3">
                      <p>
                        Cancellations <span className=" font-semibold text-primary">7 days in advance</span> will
                        receive a full refund
                      </p>
                    </div>
                  </RadioItemWithBody>

                  <RadioItemWithBody
                    label="Standard 30 day cancellation policy"
                    onChange={field.onChange}
                    value="thirty_day"
                  >
                    <div className="my-3">
                      <p>
                        Cancellations <span className=" font-semibold text-primary">30 days in advance</span> will
                        receive a full refund
                      </p>
                    </div>
                  </RadioItemWithBody>

                  <RadioItemWithBody
                    label="Standard 60 day cancellation policy"
                    onChange={field.onChange}
                    value="sixty_day"
                  >
                    <div className="my-3">
                      <p>
                        Cancellations <span className=" font-semibold text-primary">60 days in advance</span> will
                        receive a full refund
                      </p>
                    </div>
                  </RadioItemWithBody>
                </RadioGroup.RadioGroup>
                {errors.terms_and_conditions?.cancellation_policy && (
                  <p className="text-red-500 text-sm">{errors.terms_and_conditions.cancellation_policy.message}</p>
                )}
              </>
            )}
          />
        </div>
      </div>

      {/* Rescheduling of Events */}
      <div>
        <h3 className="text-lg py-6 border-b">Rescheduling of Events</h3>
        <div className="py-8">
          <Controller
            name="terms_and_conditions.reschedule_policy"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup.RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-10 grid-cols-2"
                >
                  <div>
                    <CustomRadioGroupItem
                      label="I allow guests to reschedule"
                      onChange={field.onChange}
                      value="allowed"
                    />
                  </div>
                  <div>
                    <CustomRadioGroupItem
                      label="I do not allow guests to reschedule"
                      onChange={field.onChange}
                      value="not_allowed"
                    />
                  </div>
                </RadioGroup.RadioGroup>
                {errors.terms_and_conditions?.reschedule_policy && (
                  <p className="text-red-500 text-sm">{errors.terms_and_conditions.reschedule_policy.message}</p>
                )}
              </>
            )}
          />
        </div>
      </div>
    </>
  )
}

export default TermsAndConditions
