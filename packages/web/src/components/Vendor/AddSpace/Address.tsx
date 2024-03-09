import classnames from "classnames"
import { Button, Input } from "component-library"
import { Control, Controller, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import * as z from "zod"

import { FormSchema } from "./form-schema"

import GMapsAutoCompleteSearch from "../../GMapsAutoCompleteSearch"
import GoogleMapWrapper from "../../GoogleMapWrapper"

interface OverviewProps {
  control: Control<z.infer<typeof FormSchema>>
  errors: FieldErrors<z.infer<typeof FormSchema>>
  setValue: UseFormSetValue<z.infer<typeof FormSchema>>
  watch: UseFormWatch<z.infer<typeof FormSchema>>
}

const Address = ({ control, errors, setValue, watch }: OverviewProps) => {
  return (
    <>
      {/* Address */}
      <div>
        <div className="flex justify-between py-6 border-b">
          <h3 className="text-lg">Venue Address</h3>
          <div>
            <Button>Use Current Location</Button>
          </div>
        </div>

        <p className="mt-4 text-sm">
          Point the exact location on the map and we will fill the details or you can manually fill your address
        </p>
        <div className="grid gap-6 grid-cols-2 py-4">
          <div>
            <Controller
              name="location.address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <GMapsAutoCompleteSearch
                  {...field}
                  setAddress={(address: string) => setValue("location.address", address)}
                  updateCoords={(coordinates) =>
                    setValue("location.coordinates", { lat: coordinates.lat, lng: coordinates.lng })
                  }
                />
              )}
            />
          </div>
        </div>
        <div className="rounded-lg h-96 w-full overflow-hidden">
          <GoogleMapWrapper coordinates={watch("location.coordinates")} />
        </div>
      </div>

      {/* Address Details */}
      <div>
        <h3 className="text-lg py-6 border-b">Address Details</h3>

        <div className="grid gap-6 grid-cols-2 pt-6 pb-4">
          <div>
            <Controller
              name="location.country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="country" className="block text-sm mb-2">
                    Country
                  </label>
                  <Input
                    {...field}
                    id="country"
                    placeholder="Select Country"
                    className={classnames(
                      { "border-red-500 border-2 focus-visible:ring-0": errors.location?.country },
                      "text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                    )}
                  />
                </>
              )}
            />
          </div>
          <div>
            <>
              <label htmlFor="street" className="block text-sm mb-2">
                Street Name
              </label>
              <Controller
                name="location.street"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="street"
                    placeholder="Street Name"
                    className={classnames(
                      { "border-red-500 border-2 focus-visible:ring-0": errors.location?.street },
                      "text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                    )}
                  />
                )}
              />
            </>
          </div>

          <div>
            <Controller
              name="location.city"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="city" className="block text-sm mb-2">
                    City
                  </label>
                  <Input
                    {...field}
                    id="city"
                    placeholder="Select City"
                    className={classnames(
                      { "border-red-500 border-2 focus-visible:ring-0": errors.location?.city },
                      "text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                    )}
                  />
                </>
              )}
            />
          </div>
          <div>
            <>
              <label htmlFor="house_number" className="block text-sm mb-2">
                House Number
              </label>
              <Controller
                name="location.house_number"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="House Number"
                    className={classnames(
                      { "border-red-500 border-2 focus-visible:ring-0": errors.location?.house_number },
                      "text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                    )}
                  />
                )}
              />
            </>
          </div>

          <div>
            <Controller
              name="location.postal_code"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="postal_code" className="block text-sm mb-2">
                    Postal Code
                  </label>
                  <Input
                    {...field}
                    id="postal_code"
                    placeholder="Postal Code"
                    className={classnames(
                      { "border-red-500 border-2 focus-visible:ring-0": errors.location?.postal_code },
                      "text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                    )}
                  />
                </>
              )}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Address
