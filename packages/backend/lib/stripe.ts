// Stripe instance singleton
import Stripe from "stripe"
let stripe: Stripe | null = null

export default {
  init: () => {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
    return stripe
  },
  getInstance: () => {
    if (!stripe) {
      throw new Error("Stripe instance not initialized")
    }
    return stripe
  }
}
