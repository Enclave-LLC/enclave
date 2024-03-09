import classnames from "classnames"
import { Input, RadioGroup } from "component-library"
import { Control, Controller, FieldErrors } from "react-hook-form"
import * as z from "zod"

import { FormSchema } from "./form-schema"
import Tabs from "../../Tabs"
import CustomRadioGroupItem from "../../CustomRadioGroupItem"

interface OverviewProps {
  control: Control<z.infer<typeof FormSchema>>
  errors: FieldErrors<z.infer<typeof FormSchema>>
}

const SpaceConfiguration = ({ control, errors }: OverviewProps) => {
  return (
    <>
      {/* Space Details */}
      <div>
        <h3 className="text-lg py-6 border-b">Space Details</h3>
        <div>
          <p className="mt-4 text-sm">
            Kindly specify if your space is a complete unit with various rooms or just a part of a unit
          </p>
          <div className="pt-6 pb-4">
            <div>
              <Controller
                name="space_configuration.unit_type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <RadioGroup.RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-6 grid-cols-2"
                    >
                      <div>
                        <CustomRadioGroupItem
                          label="My space is the complete unit"
                          onChange={field.onChange}
                          value="complete"
                        />
                      </div>
                      <div>
                        <CustomRadioGroupItem
                          label="I am only renting a part of my space"
                          onChange={field.onChange}
                          value="part"
                        />
                      </div>
                    </RadioGroup.RadioGroup>
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Space Layout */}
      <div>
        <h3 className="text-lg py-6 border-b">Space Layout</h3>
        <p className="mt-4 text-sm">What area is available at your space</p>
        {/* <div className="grid gap-6 grid-cols-2 pt-6 pb-4">
          <div>
            <Controller
              name="venue_details.venue_name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="venue_name" className="block text-sm mb-2">
                    Venue Name
                  </label>
                  <Input
                    {...field}
                    id="venue_name"
                    placeholder="Venue Details"
                    className={classnames(
                      { "border-red-500 border-2 focus-visible:ring-0": errors.venue_details?.venue_name },
                      "text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                    )}
                  />
                </>
              )}
            />
          </div>
          <div>
            <>
              <label htmlFor="venue_purpose" className="block text-sm mb-2">
                Purpose of Venue
              </label>
              <Controller
                name="venue_details.venue_name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Purpose of Venue"
                    className={classnames(
                      { "border-red-500 border-2 focus-visible:ring-0": errors.venue_details?.venue_name },
                      "text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                    )}
                  />
                )}
              />
            </>
          </div>
        </div> */}
      </div>

      {/* Space Dimensions */}
      <div>
        <h3 className="text-lg py-6 border-b">Space Size</h3>
        <div>
          <p className="mt-4 text-sm">Tell us how large your space is</p>
          <div className="grid gap-6 grid-cols-2 pt-6 pb-4">
            <div>
              <Controller
                name="space_configuration.size"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <label htmlFor="size" className="block text-sm mb-2">
                      Size in sqm (m²)
                    </label>
                    <Input
                      {...field}
                      id="size"
                      placeholder="Size in sqm (m²)"
                      type="number"
                      min={7}
                      className={classnames(
                        { "border-red-500 border-2 focus-visible:ring-0": errors.space_configuration?.size },
                        "text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                      )}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <>
                <label htmlFor="venue_purpose" className="block text-sm mb-2">
                  Upload floor plan(optional)
                </label>
                <Controller
                  name="space_configuration.floor_plan"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="file"
                      h={0}
                      accept=".png, .jpg, .jpeg, .svg, .webp"
                      placeholder="Upload floor plan"
                      className={classnames(
                        { "border-red-500 border-2 focus-visible:ring-0": errors.space_configuration?.floor_plan },
                        "text-[#A5A5A5] placeholder:text-[##A5A5A5] p-[13px] cursor-pointer"
                      )}
                    />
                  )}
                />
              </>
            </div>
          </div>
        </div>
      </div>

      {/* Space Visuals */}
      <div>
        <h3 className="text-lg py-6 border-b">Space Visuals</h3>
        <div>
          <p className="mt-4 text-sm">Upload images or videos of your space</p>
          <div className="pt-6 pb-4">
            <Tabs
              data={[
                {
                  title: "Image Files",
                  element: <div>Image Files</div>
                },
                {
                  title: "Video Files",
                  element: <div>Video Files</div>
                },
                {
                  title: "360° View",
                  element: <div>360° View</div>
                }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Capacity Preferences */}
      <div>
        <h3 className="text-lg py-6 border-b">Capacity Preferences</h3>
        <div>
          <p className="mt-4 text-sm">How many guests can your space take</p>
        </div>
      </div>
    </>
  )
}

export default SpaceConfiguration
