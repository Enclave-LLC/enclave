import * as z from "zod"

const day_pricing_schema = z.object({
  available: z.boolean(),
  opening_time: z.string(),
  closing_time: z.string(),
  rate: z.number()
})

export const FormSchema = z.object({
  venue_details: z.object({
    venue_name: z.string(),
    description: z.string(),
    event_types: z.array(z.string()),
    building_types: z.array(z.string()),
    entertainment_types: z.array(z.string())
  }),
  space_configuration: z.object({
    unit_type: z.enum(["complete", "part"]),
    size: z.number(),
    floor_plan: z.string()
  }),
  location: z.object({
    address: z.string(),
    city: z.string(),
    street: z.string(),
    house_number: z.string(),
    state: z.string(),
    postal_code: z.string(),
    country: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    })
  }),
  amenities: z.object({
    free_parking_count: z.number(),
    paid_parking_count: z.number(),
    single_room_count: z.number(),
    double_room_count: z.number(),
    wifi: z.string(),
    sound_system: z.string(),
    microphone_count: z.number(),
    speaker_count: z.number(),
    mixer_count: z.number(),
    eateries_and_cutlery: z.string(),
    screen_count: z.number(),
    projector_count: z.number()
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
    cancellation_policy: z.string(),
    reschedule_policy: z.enum(["allowed", "not_allowed"]),
    refund_policy: z.string(),
    space_rules: z.string()
  })
})
