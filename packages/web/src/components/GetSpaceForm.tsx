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
  location: z.string()
})

const GetSpaceForm = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "", guests: "", location: "", phone: "", spaceType: "" })
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
        <div className="grid grid-cols-3 justify-center gap-8">
          <div>
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
                  </S.SelectContent>
                </S.Select>
              )}
            />
          </div>
          <div>
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
                    <S.SelectItem value="Wedding">Wedding</S.SelectItem>
                  </S.SelectContent>
                </S.Select>
              )}
            />
          </div>
          <div>
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
                  </S.SelectContent>
                </S.Select>
              )}
            />
            {errors.location?.message}
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
          {/* {errors.email && <span className="text-red-500">{errors.email.message}</span>} */}
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
            label="Get a space"
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
