// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios"
import { Input } from "component-library"
import { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import ShareDialog from "./ShareDialog"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import classnames from "classnames"

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Email field cannot be empty"
    })
    .email({
      message: "Please enter a valid email"
    })
})

const JoinWaitlistInput = () => {
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
      reset({ email: "" })
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
    } catch (err) {
      console.log("an error occured")
      alert("an error occured")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleJoinWaitlist)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              showLocationIcon
              button={{ label: "Join Now", type: "submit", loading: isSubmitting, variant: "default" }}
              placeholder="Email"
              className={classnames({ "focus-visible:ring-red-500": errors.email })}
            />
          )}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </form>
      <ShareDialog title="Congrats 🎉. You are on our waitlist." open={openDialog} setOpen={setOpenDialog} />
    </>
  )
}

export default JoinWaitlistInput
