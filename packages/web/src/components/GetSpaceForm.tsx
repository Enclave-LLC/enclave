// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios"
import { Button, Input } from "component-library"
import { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import ShareDialog from "./ShareDialog"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import classnames from "classnames"
import { Select as S } from "component-library"

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Email field cannot be empty"
    })
    .email({
      message: "Please enter a valid email"
    }),
  phone: z.string(),
  guests: z.string(),
  spaceType: z.string(),
  location: z.string(),
  manual_location: z.string()
})

const GetSpaceForm = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "", guests: "", location: "", phone: "", spaceType: "", manual_location: "" })
    }
  }, [formState, reset])

  const handleJoinWaitlist: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    try {
      await axios({
        method: "POST",
        url: `https://sheetdb.io/api/v1/${import.meta.env.VITE_SHEETDB_API_ID}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data
      })
      // Show share dialog
      setOpenDialog(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("an error occured")
      alert(JSON.stringify(err.response))
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleJoinWaitlist)}>
        <div className="grid grid-cols-4 sm:grid-cols-3 justify-center gap-4 sm:gap-8">
          <div className="col-span-2 sm:col-span-1">
            <Controller
              name="guests"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <S.Select onValueChange={field.onChange} defaultValue={field.value}>
                  <S.SelectTrigger
                    className={classnames("shadow-lg text-[#C6C6C6]", {
                      "border-red-500 border-2 focus-visible:ring-0": errors.guests
                    })}
                  >
                    <S.SelectValue placeholder="Guests" />
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
          <div className="col-span-2 sm:col-span-1">
            <Controller
              name="spaceType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <S.Select onValueChange={field.onChange} defaultValue={field.value}>
                  <S.SelectTrigger
                    className={classnames("shadow-lg text-[#C6C6C6]", {
                      "border-red-500 border-2 focus-visible:ring-0": errors.spaceType
                    })}
                  >
                    <S.SelectValue placeholder="Space type" className="shadow-lg" />
                  </S.SelectTrigger>
                  <S.SelectContent>
                    <S.SelectItem value="Wedding">Wedding Venue</S.SelectItem>
                    <S.SelectItem value="Seminar Room">Business Meeting</S.SelectItem>
                    <S.SelectItem value="Conference Room">Conference</S.SelectItem>
                    <S.SelectItem value="Coworking Space">Coworking Space</S.SelectItem>
                    <S.SelectItem value="Club">Club</S.SelectItem>
                  </S.SelectContent>
                </S.Select>
              )}
            />
          </div>
          <div className="col-start-1 sm:col-start-2 md:col-start-3 col-span-4 sm:col-span-2 md:col-span-1">
            {watch("location") != "other" && (
              <Controller
                name="location"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <S.Select onValueChange={field.onChange} defaultValue={field.value}>
                    <S.SelectTrigger
                      className={classnames("shadow-lg text-[#C6C6C6]", {
                        "border-red-500 border-2 focus-visible:ring-0": errors.location
                      })}
                    >
                      <S.SelectValue placeholder="Location" />
                    </S.SelectTrigger>
                    <S.SelectContent>
                      <S.SelectItem value="Accra">Accra</S.SelectItem>
                      <S.SelectItem value="Lagos">Lagos</S.SelectItem>
                      <S.SelectItem value="Berlin">Berlin</S.SelectItem>
                      <S.SelectItem value="London">London</S.SelectItem>
                      <S.SelectItem value="Atlanta">Atlanta</S.SelectItem>
                      <S.SelectItem value="Cape Town">Cape Town</S.SelectItem>
                      <S.SelectItem value="Lome">Lome</S.SelectItem>
                      <S.SelectItem value="Cairo">Cairo</S.SelectItem>
                      <S.SelectItem value="Nairobi">Nairobi</S.SelectItem>
                      <S.SelectItem value="other">Other</S.SelectItem>
                    </S.SelectContent>
                  </S.Select>
                )}
              />
            )}
            {watch("location") == "other" && (
              <div className="flex gap-1">
                <Controller
                  name="manual_location"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      h={0}
                      placeholder="Location"
                      className={classnames(
                        { "border-red-500 border-2 focus-visible:ring-0": errors.email },
                        "shadow-lg text-[#A5A5A5] placeholder:text-[##A5A5A5] h-10"
                      )}
                    />
                  )}
                />
                <Button
                  label="Cancel"
                  variant="destructive"
                  onClick={() => {
                    setValue("location", "")
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="my-6 grid grid-cols-2 gap-5 px-4">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                showLocationIcon
                placeholder="Email"
                className={classnames(
                  { "border-red-500 border-2 focus-visible:ring-0": errors.email },
                  "shadow-lg text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                )}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                showLocationIcon
                placeholder="Phone number"
                className={classnames(
                  { "border-red-500 border-2 focus-visible:ring-0": errors.phone },
                  "shadow-lg text-[#A5A5A5] placeholder:text-[##A5A5A5]"
                )}
              />
            )}
          />
        </div>
        <div>
          <Button
            className="relative z-10"
            label="Book Space"
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </div>
      </form>
      <ShareDialog title="Congrats 🎉. You are on our waitlist." open={openDialog} setOpen={setOpenDialog} />
    </>
  )
}

export default GetSpaceForm
