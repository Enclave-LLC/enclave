import { Input, Switch } from "component-library"
import { Control, Controller, FieldErrors } from "react-hook-form"
import * as z from "zod"
import { Select as S } from "component-library"

import { FormSchema } from "./form-schema"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface OverviewProps {
  control: Control<z.infer<typeof FormSchema>>
  errors: FieldErrors<z.infer<typeof FormSchema>>
}

const SpacePricing = ({ control }: OverviewProps) => {
  return (
    <>
      <div>
        <h3 className="text-lg py-6">Venue details</h3>

        <div>
          {DAYS.map((day) => (
            <div className="p-3 border rounded-lg mb-3 shadow-sm flex content-center justify-between text-sm">
              <div className="flex gap-3 content-center">
                <div className="mt-[2px]">{day}</div>
                <Controller
                  name={`pricing.days.${day.toLowerCase()}.available` as never}
                  control={control}
                  render={({ field }) => <Switch {...field} />}
                />
              </div>
              <div className="flex content-center gap-2">
                <div className="mt-1">Opening time</div>
                <div>
                  <Controller
                    name={`pricing.days.${day.toLowerCase()}.opening_time` as never}
                    control={control}
                    render={({ field }) => (
                      <S.Select onValueChange={field.onChange} defaultValue={field.value}>
                        <S.SelectTrigger>
                          <S.SelectValue placeholder="Time" />
                        </S.SelectTrigger>
                        <S.SelectContent>
                          <S.SelectItem value="10 - 20">10 - 20</S.SelectItem>
                          <S.SelectItem value="21 - 50">21 - 50</S.SelectItem>
                          <S.SelectItem value="51 - 100">51 - 100</S.SelectItem>
                          <S.SelectItem value="100+">100+</S.SelectItem>
                        </S.SelectContent>
                      </S.Select>
                    )}
                  />
                </div>
              </div>
              <div className="flex content-center gap-2">
                <div className="mt-1">Closing time</div>
                <div>
                  <Controller
                    name={`pricing.days.${day.toLowerCase()}.closing_time` as never}
                    control={control}
                    render={({ field }) => (
                      <S.Select onValueChange={field.onChange} defaultValue={field.value}>
                        <S.SelectTrigger>
                          <S.SelectValue placeholder="Time" />
                        </S.SelectTrigger>
                        <S.SelectContent>
                          <S.SelectItem value="10 - 20">10 - 20</S.SelectItem>
                          <S.SelectItem value="21 - 50">21 - 50</S.SelectItem>
                          <S.SelectItem value="51 - 100">51 - 100</S.SelectItem>
                          <S.SelectItem value="100+">100+</S.SelectItem>
                        </S.SelectContent>
                      </S.Select>
                    )}
                  />
                </div>
              </div>
              <div className="flex content-center">
                <Controller
                  name={`pricing.days.${day.toLowerCase()}.rate` as never}
                  control={control}
                  render={({ field }) => (
                    <Input h={0} placeholder="Hourly Rate" className="h-8" type="number" {...field} />
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div>
        <h3 className="text-lg py-6 border-b">Pricing for space provisions</h3>
        <div>
          <p className="mt-4 text-sm">
            These are the items you specified in space provisions. Kindly specify your rates
          </p>
          <div className="pt-6 pb-4"></div>
        </div>
      </div> */}
    </>
  )
}

export default SpacePricing
