import * as z from "zod"

const day_pricing_schema = z.object({
  available: z.boolean(),
  opening_time: z.string().optional(),
  closing_time: z.string().optional(),
  rate: z.number().optional()
})

export const FormSchema = z.object({
  venue_details: z.object({
    venue_name: z.string({ required_error: "Venue name is required" }).min(1, "Venue name is required"),
    venue_purpose: z.string({ required_error: "Venue purpose is required" }).min(1, "Venue purpose is required"),
    description: z.string({ required_error: "Please provide a description" }).min(1, "Please provide a description"),
    event_types: z.array(z.string()).min(1, "At least one event type must be selected"),
    building_types: z.array(z.string()).min(1, "At least one building type must be selected"),
    entertainment_types: z.array(z.string()).min(1, "At least one entertainment type must be selected")
  }),
  space_configuration: z.object({
    unit_type: z.enum(["complete", "part"], { required_error: "Unit type is required" }),
    size: z.number({ required_error: "Size is required" }).min(7, "Size must be at least 7"),
    floor_plan: z.any()
  }),
  location: z.object({
    address: z.string({ required_error: "Address is required" }),
    city: z.string().optional(),
    street: z.string().optional(),
    house_number: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    })
  }),
  amenities: z.object({
    free_parking_count: z.number().optional(),
    paid_parking_count: z.number().optional(),
    single_room_count: z.number().optional(),
    double_room_count: z.number().optional(),
    wifi: z.string().optional(),
    sound_system: z.string().optional(),
    microphone_count: z.number().optional(),
    speaker_count: z.number().optional(),
    mixer_count: z.number().optional(),
    eateries_and_cutlery: z.string().optional(),
    screen_count: z.number().optional(),
    projector_count: z.number().optional()
  }),
  pricing: z.object({
    days: z.object({
      monday: day_pricing_schema,
      tuesday: day_pricing_schema,
      wednesday: day_pricing_schema,
      thursday: day_pricing_schema,
      friday: day_pricing_schema,
      saturday: day_pricing_schema,
      sunday: day_pricing_schema
    })
  }),
  terms_and_conditions: z.object({
    cancellation_policy: z.enum(["very_flexible", "flexible", "thirty_day", "sixty_day"]),
    reschedule_policy: z.enum(["allowed", "not_allowed"]),
    refund_policy: z.string().optional(),
    space_rules: z.string().optional()
  })
})
