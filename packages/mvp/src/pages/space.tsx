import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Star, UsersRound } from "lucide-react"
import { useLocation } from "react-router-dom"
import type { Space } from "@/types/spaces"
import { cn, getDirectImageLink } from "@/lib/utils"
import { useRef, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"


import emailjs from "@emailjs/browser"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
// import { createBooking } from "@/api/spaces-google-sheet"
import { Badge } from "@/components/ui/badge"

const TO_EMAIL = "sedembalfour8@gmail.com"
function DatePicker({
  selected,
  onSelect,
}: {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-inherit",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected} // Directly use the `selected` prop
          onSelect={onSelect} // Notify parent on date change
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}


const Space = () => {
  const [submitting, setSubmitting] = useState(false)
  const location = useLocation()
  const state: Space = location.state
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const formSchema = z.object({
    to_name: z.string(),
    to_email: z.string(),
    number_of_guests: z.number().min(2),
    booker_name: z.string(),
    booker_email: z.string(),
    booker_phone_number: z.string(),
    start_date: z.date(),
    end_date: z.date().optional(),
    start_time: z.string(),
    end_time: z.string(),
    space_booked: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to_name: "SED",
      to_email: TO_EMAIL,
      space_booked: state["Name of Event Space"]
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = () => {
    setSubmitting(true)
    // Submit values to google sheet values
    // createBooking(values)
    //   .then(() => {
    //     // Send email on fulfilled
        
    //   })
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current as HTMLFormElement,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }).then(
          () => {
            console.log('SUCCESS!')
            setSubmitting(false)
            form.reset({
              to_name: "SED",
              to_email: "sedembalfour8@gmail.com",
              number_of_guests: undefined,
              start_date: undefined,
              end_date: undefined,
              start_time: "",
              end_time: "",
              booker_email: "",
              booker_name: "",
              booker_phone_number: "",
              space_booked: ""
            })
            toast({
              title: "Booking Requested",
              description: "We have received your request 🎉. We will contact you soon.",
            })
          },
          (error) => {
            console.log('FAILED...', error.text)
            setSubmitting(false)
            toast({
              title: "Booking Failed",
              description: "Something went wrong. Please try again later.",
              variant: "destructive"
            })
          },
        )
  }

  return (
    <div className="flex justify-center">
      <div className="px-4 md:px-0 md:w-[70%] xl:w-[50%] mt-4">
        <Carousel className="w-full">
          <CarouselContent>
            {state["Add Images of Event Space"].split(", ").map(link => getDirectImageLink(link)).map((link, index) => (
              <CarouselItem key={index}>
                <div className="w-full h-[600px] rounded overflow-hidden">
                  <img src={link} className="w-full h-full object-cover" alt={link} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <span className="hidden md:inline-block">
            <CarouselPrevious />
          </span>
          <span className="hidden md:inline-block">
            <CarouselNext />
          </span>
        </Carousel>

        <div className="mt-4 grid lg:grid-cols-2 gap-2">
          <div>
            <h1 className="text-primary font-bold text-2xl tracking-tight">{state["Name of Event Space"]}</h1>
            <h3 className="text-primary font-extrabold text-3xl my-1">{ state["Rates in Ghana Cedis"] } GHS { state["Rate in per hour or per day?"] }</h3>
            <div className="relative">
              {
                state.Capacity &&
                <><UsersRound className="inline text-primary" /><span className="ml-2 absolute inline-block text-lg font-medium">{state.Capacity ? `${state.Capacity} people` : "Not Available"}</span></>
              }
            </div>

            {/* Amenities */}
            {
              state.Amenities.split("\n").map(amenity => amenity.replace(".", "")).filter(amenity => amenity).length == 0 ?
                <></> :
                <div className="mt-4">
                  <h1 className="text-primary font-medium text-xl tracking-tight pb-2 border-b">Space Amenities</h1>

                  <div className="mt-4">
                    {
                      state.Amenities.split("\n").map(amenity => amenity.replace(".", "")).filter(amenity => amenity).map(amenity => (
                        <Badge variant="secondary" className="mr-2 mb-2">{amenity}</Badge>
                      ))
                    }
                  </div>
                </div>
            }
            
          </div>
          
          <div>
            <div className="p-5 shadow-lg rounded">
              <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="to_name"
                    render={({ field }) => (
                      <FormItem hidden>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="to_email"
                    render={({ field }) => (
                      <FormItem hidden>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="space_booked"
                    render={({ field }) => (
                      <FormItem hidden>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="md:flex gap-4">
                    {/* <Avatar className="w-16 h-16">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                    <div>
                      <p className="text-lg font-medium leading-snug">{state["Name of Contact Person"]}</p>
                      <p className="text-sm leading-snug text-gray-500">Response rate: 100%</p>
                      <p className="text-sm leading-snug text-gray-500 flex">
                        Customer ratings:
                        <Star className="ml-1" fill="#FFA500" size={16} />
                        <Star fill="#FFA500" size={16} />
                        <Star fill="#FFA500" size={16} />
                        <Star fill="#FFA500" size={16} />
                        <Star fill="#FFA500" size={16} />
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 mt-7">
                    <div>
                      <FormField
                        control={form.control}
                        name="number_of_guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Number of Guests" 
                                {...field} 
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                            <div>
                              <DatePicker
                                selected={field.value}
                                onSelect={field.onChange}
                              />
                              {/* Hidden input to include start_date in form submission */}
                              <input type="hidden" name="start_date" value={field.value ? field.value.toISOString() : ""} />
                            </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Start Time</span>
                      <FormField
                        control={form.control}
                        name="start_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">End Time</span>
                      <FormField
                        control={form.control}
                        name="end_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 mt-3">
                      <FormField
                        control={form.control}
                        name="booker_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Your Name"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="booker_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your email"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="booker_phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Your Phone Number"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button className="w-full" disabled={submitting}>
                    { submitting && <Loader2 className="animate-spin" /> }
                    Book Venue
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Space