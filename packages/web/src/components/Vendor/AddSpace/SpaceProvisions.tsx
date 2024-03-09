import { Checkbox, Input, RadioGroup } from "component-library"
import { Control, Controller, FieldErrors } from "react-hook-form"
import * as z from "zod"

import { FormSchema } from "./form-schema"
import { useState } from "react"
import CustomRadioGroupItem from "../../CustomRadioGroupItem"

interface OverviewProps {
  control: Control<z.infer<typeof FormSchema>>
  errors: FieldErrors<z.infer<typeof FormSchema>>
}

const ExpandableSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <h3 className="text-lg py-5 border-b flex">
        {title}
        <span className="ml-4 mt-[6px] inline-block">
          <Checkbox label="" id={title} checked={expanded} onClick={() => setExpanded(!expanded)} />
        </span>
      </h3>
      {expanded && <div className="py-2">{children}</div>}
    </div>
  )
}

const SpaceProvisions = ({ control }: OverviewProps) => {
  return (
    <>
      <ExpandableSection title={"Parking"}>
        <div className=" grid grid-cols-2 gap-6">
          <div>
            <Controller
              name="amenities.free_parking_count"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="free_parking">Free parking on premise</label>
                  <Input id="free_parking" placeholder="Number of parking available" type="number" min={1} {...field} />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              name="amenities.paid_parking_count"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="paid_parking">Paid parking on premise</label>
                  <Input id="paid_parking" placeholder="Number of parking available" type="number" min={1} {...field} />
                </>
              )}
            />
          </div>
        </div>
      </ExpandableSection>

      <ExpandableSection title={"Accomodation"}>
        <div className=" grid grid-cols-2 gap-6">
          <div>
            <Controller
              name="amenities.single_room_count"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="screen_count">Number of single rooms available</label>
                  <Input
                    id="screen_count"
                    placeholder="Number of single rooms available"
                    type="number"
                    min={1}
                    {...field}
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              name="amenities.double_room_count"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="projector_count">Number of double rooms available</label>
                  <Input
                    id="projector_count"
                    placeholder="Number of double rooms available"
                    type="number"
                    min={1}
                    {...field}
                  />
                </>
              )}
            />
          </div>
        </div>
      </ExpandableSection>

      <ExpandableSection title={"Wifi & Internet"}>
        <div>
          <Controller
            name="amenities.wifi"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <RadioGroup.RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                  <div>
                    <CustomRadioGroupItem label="Free" onChange={field.onChange} value="free" />
                  </div>
                  <div>
                    <CustomRadioGroupItem label="Paid" onChange={field.onChange} value="paid" />
                  </div>
                </RadioGroup.RadioGroup>
              </>
            )}
          />
        </div>
      </ExpandableSection>

      <ExpandableSection title={"Sound System"}>
        <div>
          <Controller
            name="amenities.sound_system"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <RadioGroup.RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                  <div>
                    <CustomRadioGroupItem label="Free" onChange={field.onChange} value="free" />
                  </div>
                  <div>
                    <CustomRadioGroupItem label="Paid" onChange={field.onChange} value="paid" />
                  </div>
                </RadioGroup.RadioGroup>
              </>
            )}
          />
        </div>
      </ExpandableSection>

      <ExpandableSection title={"Eateries & Cutlery"}>
        <div>
          <Controller
            name="amenities.eateries_and_cutlery"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <RadioGroup.RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                  <div>
                    <CustomRadioGroupItem label="Free" onChange={field.onChange} value="free" />
                  </div>
                  <div>
                    <CustomRadioGroupItem label="Paid" onChange={field.onChange} value="paid" />
                  </div>
                </RadioGroup.RadioGroup>
              </>
            )}
          />
        </div>
      </ExpandableSection>

      {/* <ExpandableSection title={"Furniture"}>
        <div>Me</div>
      </ExpandableSection> */}

      {/* <ExpandableSection title={"Photography & Videography"}>
        <div>Me</div>
      </ExpandableSection> */}

      <ExpandableSection title={"Screens & Projectors"}>
        <div className=" grid grid-cols-2 gap-6">
          <div>
            <Controller
              name="amenities.screen_count"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="screen_count">Number of screens available</label>
                  <Input id="screen_count" placeholder="Number of screens available" type="number" min={1} {...field} />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              name="amenities.projector_count"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="projector_count">Number of projectors available</label>
                  <Input
                    id="projector_count"
                    placeholder="Number of projectors available"
                    type="number"
                    min={1}
                    {...field}
                  />
                </>
              )}
            />
          </div>
        </div>
      </ExpandableSection>
    </>
  )
}

export default SpaceProvisions
