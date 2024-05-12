import { Input, Checkbox, Textarea } from "component-library"
import { Control, Controller, FieldErrors } from "react-hook-form"
import * as z from "zod"

import { FormSchema } from "./form-schema"
import Tabs from "../../Tabs"

interface OverviewProps {
  control: Control<z.infer<typeof FormSchema>>
  errors: FieldErrors<z.infer<typeof FormSchema>>
}

const EVENT_TYPES = ["Wedding", "Birthday", "Conference", "Meeting", "Party", "Concert", "Exhibition", "Workshop"]
const BUILDING_TYPES = ["Warehouse", "Office", "Studio", "Gallery", "Restaurant", "Bar", "Hotel", "House"]
const ENTERTAINMENT_TYPES = ["Music", "Dance", "Comedy", "Theatre", "Cinema", "Art", "Fashion", "Food"]

const CustomCheckbox = ({
  label,
  id,
  onChange,
  checked
}: {
  label: string
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void
  checked: boolean
}) => {
  return (
    <div className="px-4 py-2 bg-white rounded">
      <div>
        {/* Custom Checkbox component */}
        <Checkbox id={id} label={label} onChange={onChange} onCheckedChange={onChange} checked={checked} />
      </div>
    </div>
  )
}

const Overview = ({ control, errors }: OverviewProps) => {
  return (
    <>
      {/* Name and purpose */}
      <div>
        <h3 className="text-lg py-6 border-b">Venue details</h3>
        <div className="grid gap-6 grid-cols-2 pt-6 pb-4">
          <div>
            <Controller
              name="venue_details.venue_name"
              control={control}
              render={({ field }) => (
                <>
                  <label htmlFor="venue_name" className="block text-sm mb-2">
                    Venue Name
                  </label>
                  <Input {...field} id="venue_name" placeholder="Venue Name" />
                  {errors.venue_details?.venue_name && (
                    <p className="text-red-500 text-sm">{errors.venue_details.venue_name.message}</p>
                  )}
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
                name="venue_details.venue_purpose"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Purpose of Venue" />
                    {errors.venue_details?.venue_purpose && (
                      <p className="text-red-500 text-sm">{errors.venue_details.venue_purpose.message}</p>
                    )}
                  </>
                )}
              />
            </>
          </div>
        </div>
      </div>

      {/* Event Type */}
      <div>
        <h3 className="text-lg py-6 border-b">Event Type</h3>
        <div>
          <p className="py-6">What can your venue be used for? Kindly select all that applies.</p>
          <div className="flex gap-6 bg-secondary p-10 flex-wrap">
            {EVENT_TYPES.map((type) => (
              <div key={type}>
                <Controller
                  name="venue_details.event_types"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckbox
                      onChange={(e) => {
                        const isChecked = e
                        const newValue = isChecked ? [...field.value, type] : field.value.filter((v) => v !== type)
                        field.onChange(newValue)
                      }}
                      checked={field.value?.includes(type)}
                      label={type}
                      id={type}
                    />
                  )}
                />
              </div>
            ))}
          </div>
          <div>
            {errors.venue_details?.event_types && (
              <p className="text-red-500 text-sm">{errors.venue_details.event_types.message}</p>
            )}
          </div>
        </div>

        <div>
          <p className="py-6">What kind of building is it? Kindly select all that applies</p>
          <div className="flex gap-6 bg-secondary p-10 flex-wrap">
            {BUILDING_TYPES.map((type) => (
              <div key={type}>
                <Controller
                  name="venue_details.building_types"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckbox
                      onChange={(e) => {
                        const isChecked = e
                        const newValue = isChecked ? [...field.value, type] : field.value.filter((v) => v !== type)
                        field.onChange(newValue)
                      }}
                      checked={field.value?.includes(type)}
                      label={type}
                      id={type}
                    />
                  )}
                />
              </div>
            ))}
          </div>
          <div>
            {errors.venue_details?.building_types && (
              <p className="text-red-500 text-sm">{errors.venue_details.building_types.message}</p>
            )}
          </div>
        </div>
        <div>
          <p className="py-6">Type of entertainment? Kindly select all that applies.</p>
          <div className="flex gap-6 bg-secondary p-10 flex-wrap">
            {ENTERTAINMENT_TYPES.map((type) => (
              <div key={type}>
                <Controller
                  name="venue_details.entertainment_types"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckbox
                      onChange={(e) => {
                        const isChecked = e
                        const newValue = isChecked ? [...field.value, type] : field.value.filter((v) => v !== type)
                        field.onChange(newValue)
                      }}
                      checked={field.value?.includes(type)}
                      label={type}
                      id={type}
                    />
                  )}
                />
              </div>
            ))}
          </div>
          <div>
            {errors.venue_details?.entertainment_types && (
              <p className="text-red-500 text-sm">{errors.venue_details.entertainment_types.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg py-6 border-b">Venue Description</h3>
        <div>
          <p className="py-6">
            Describe your venue. Enclave AI can generate your description for you if you prompt it with the appropriate
            keywords.
          </p>
          <div>
            <Tabs
              data={[
                {
                  title: "My Description",
                  element: (
                    <>
                      <Controller
                        name="venue_details.description"
                        control={control}
                        render={({ field }) => <Textarea {...field} placeholder="Type your description here" />}
                      />
                      <p className="text-[#9CA3AF] text-sm mt-2">0/250 words</p>
                      <div>
                        {errors.venue_details?.description && (
                          <p className="text-red-500 text-sm">{errors.venue_details.description.message}</p>
                        )}
                      </div>
                    </>
                  )
                },
                {
                  title: "Enclave AI",
                  element: (
                    <div>
                      <p>Enclave AI will generate a description for you based on the data we have so far.</p>
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Overview
