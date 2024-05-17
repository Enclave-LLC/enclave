import { Button, Input } from "component-library"
import rocketLeftCloud from "../assets/png/rocket-left-cloud.png"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LOCAL_AUTH_KEY = "enclave-auth"

const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

const ListSpace = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  // Redirect if user is already authenticated
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem(LOCAL_AUTH_KEY)) {
      navigate("/app/vendor")
    }
  }, [navigate])

  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = (data) => {
    console.log(data)
  }

  return (
    <>
      <div className="py-4 px-8 mt-0">
        <div
          className=" rounded pb-16 sm:pb-4 p-4 h-[85vh] grid justify-center content-center"
          style={{ backgroundColor: "#F7F7F8" }}
        >
          <div className="grid gap-24 grid-cols-2">
            <div>
              <div>
                <img src={rocketLeftCloud} alt="rocket" className="w-[400px] h-auto" />
              </div>
              <div className="text-[#384652] mt-2">
                <h1 className="text-4xl font-semibold leading-[46px]">
                  Launch your space <br /> <span className="text-primary font-bold">Enclave awaits!</span>
                </h1>
                <p className="mt-2 leading-7">
                  Get the process started in less than 10 minutes. <br />
                  Let us handle the rest.
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="p-8 shadow-xl rounded-xl bg-white flex flex-col gap-6"
            >
              <div className="text-center text-[#384652]">
                <h2 className="text-2xl font-semibold">Create an account</h2>
                <h3 className=" font-medium">
                  Already have an account? <span className="text-primary">Login</span>
                </h3>
                <div className="flex justify-center mt-6">
                  <div className="flex gap-10 justify-between">
                    <div className="rounded-md border shadow p-2">
                      {/* Google SVG Icon needs to be moved to separate file */}
                      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M22.54 11.7614C22.54 10.9459 22.4668 10.1618 22.3309 9.40912H11.5V13.8575H17.6891C17.4225 15.295 16.6123 16.513 15.3943 17.3284V20.2139H19.1109C21.2855 18.2118 22.54 15.2637 22.54 11.7614Z"
                          fill="#4285F4"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.4995 22.9998C14.6045 22.9998 17.2077 21.97 19.1104 20.2137L15.3938 17.3282C14.364 18.0182 13.0467 18.4259 11.4995 18.4259C8.50425 18.4259 5.96902 16.403 5.0647 13.6848H1.22266V16.6644C3.11493 20.4228 7.00402 22.9998 11.4995 22.9998Z"
                          fill="#34A853"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.06523 13.6851C4.83523 12.9951 4.70455 12.258 4.70455 11.5001C4.70455 10.7421 4.83523 10.0051 5.06523 9.31506V6.33551H1.22318C0.444318 7.88801 0 9.64437 0 11.5001C0 13.3557 0.444318 15.1121 1.22318 16.6646L5.06523 13.6851Z"
                          fill="#FBBC05"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.4995 4.57386C13.1879 4.57386 14.7038 5.15409 15.8956 6.29364L19.194 2.99523C17.2024 1.13955 14.5992 0 11.4995 0C7.00402 0 3.11493 2.57705 1.22266 6.33545L5.0647 9.315C5.96902 6.59682 8.50425 4.57386 11.4995 4.57386Z"
                          fill="#EA4335"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex relative">
                <div className="h-[1px] w-full absolute bg-secondary top-[50%]"></div>
                <span className="inline-block rounded-[50%] shadow-md px-2 py-1 font-medium mx-auto relative z-10 bg-white">
                  or
                </span>
              </div>

              <div className=" grid grid-cols-2 gap-6">
                <div>
                  <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input {...field} id="first_name" placeholder="First Name" />
                        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
                      </>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input {...field} id="last_name" placeholder="Last Name" />
                        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
                      </>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input {...field} type="email" id="email" placeholder="Email" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                      </>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input {...field} type="password" id="password" placeholder="Password" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                      </>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <p className="text-xs">
                By continuing, you agree Enclave's <span className="font-bold text-primary">Terms of Service</span> and{" "}
                <span className="font-bold text-primary">Privacy Policy</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListSpace
