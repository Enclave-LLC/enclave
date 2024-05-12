import { Button } from "component-library"
import { useState } from "react"
import Overview from "./Overview"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

import { FormSchema } from "./form-schema"
import SpaceConfiguration from "./SpaceConfiguration"
import Address from "./Address"
import SpaceProvisions from "./SpaceProvisions"
import SpacePricing from "./SpacePricing"
import TermsAndConditions from "./TermsAndConditions"

enum FORM_PAGE_INDEX {
  OVERVIEW = 0,
  SPACE_CONFIGURATION = 1,
  ADDRESS_AND_LOCATION = 2,
  SPACE_PROVISIONS = 3,
  SPACE_PRICING = 4,
  SPACE_TERMS_AND_CONDITIONS = 5
}

const FORM_PAGES = [
  {
    title: "Overview"
  },
  {
    title: "Space Configuration or Specification"
  },
  {
    title: "Address and Location"
  },
  {
    title: "Space Provisions"
  },
  {
    title: "Space Pricing & Opening Hours"
  },
  {
    title: "Space Terms and Conditions"
  }
]

interface AddSpaceFormProps {
  onPageNext: (next: number) => void
}

const AddSpaceForm = ({ onPageNext }: AddSpaceFormProps) => {
  const [activePageIndex, setActivePageIndex] = useState(0)
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      venue_details: {
        event_types: [],
        building_types: [],
        entertainment_types: []
      }
    },
    mode: "all"
  })

  const handleBack = () => {
    if (activePageIndex === 0) {
      return
    }
    setActivePageIndex(activePageIndex - 1)
    onPageNext(activePageIndex)
  }

  const handleNext = async () => {
    if (activePageIndex === FORM_PAGES.length - 1) {
      return
    }
    // TODO: Do form validation for current page
    let shouldProceed = true
    switch (activePageIndex) {
      case FORM_PAGE_INDEX.OVERVIEW:
        shouldProceed = await trigger("venue_details")
        break
      case FORM_PAGE_INDEX.SPACE_CONFIGURATION:
        shouldProceed = await trigger("space_configuration")
        break
      case FORM_PAGE_INDEX.ADDRESS_AND_LOCATION:
        shouldProceed = await trigger("location")
        break
      case FORM_PAGE_INDEX.SPACE_PROVISIONS:
        shouldProceed = await trigger("amenities")
        break
      case FORM_PAGE_INDEX.SPACE_PRICING:
        shouldProceed = await trigger("pricing")
        break
      case FORM_PAGE_INDEX.SPACE_TERMS_AND_CONDITIONS:
        shouldProceed = await trigger("terms_and_conditions")
        break
    }
    if (!shouldProceed) {
      return
    }
    setActivePageIndex(activePageIndex + 1)
    onPageNext(activePageIndex + 2)
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    })
  }

  const submitForm: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    console.log(data)
  }

  return (
    <>
      <div className="flex justify-between px-10">
        <h3 className="text-2xl">{FORM_PAGES[activePageIndex].title}</h3>

        <div>
          <Button>Save & Exit</Button>
        </div>
      </div>
      <div className="shadow-md rounded-md bg-white p-6 mt-5">
        <form onSubmit={handleSubmit(submitForm)}>
          {activePageIndex === FORM_PAGE_INDEX.OVERVIEW && <Overview control={control} errors={errors} />}
          {activePageIndex === FORM_PAGE_INDEX.SPACE_CONFIGURATION && (
            <SpaceConfiguration control={control} errors={errors} />
          )}
          {activePageIndex === FORM_PAGE_INDEX.ADDRESS_AND_LOCATION && (
            <Address control={control} errors={errors} setValue={setValue} watch={watch} />
          )}
          {activePageIndex === FORM_PAGE_INDEX.SPACE_PROVISIONS && (
            <SpaceProvisions control={control} errors={errors} />
          )}
          {activePageIndex === FORM_PAGE_INDEX.SPACE_PRICING && <SpacePricing control={control} errors={errors} />}
          {activePageIndex === FORM_PAGE_INDEX.SPACE_TERMS_AND_CONDITIONS && (
            <TermsAndConditions control={control} errors={errors} />
          )}
          <div className="flex justify-end mt-10 pt-10 border-t">
            <div className="flex gap-3">
              {/* Add a new variant for back button */}
              {activePageIndex > 0 && (
                <Button variant="secondary" onClick={handleBack}>
                  Go Back
                </Button>
              )}
              {activePageIndex < FORM_PAGES.length - 1 && <Button onClick={handleNext}>Save & Continue</Button>}
              {activePageIndex >= FORM_PAGES.length - 1 && <Button type="submit">Proceed to Listing Space</Button>}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddSpaceForm
