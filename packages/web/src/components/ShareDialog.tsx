import { Dialog } from "component-library"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share"

const SHARE_URL = "https://myenclave.space"

const SHARE_TEXT =
  "Embark on a journey into Enclave, where the enchantment of seamless event planning comes to life! 🌟✨ Be a part of the excitement – spread the word and secure your spot on our exclusive waitlist. 🎉✨ Join now for a front-row seat to the magic! 🔮🎈"

interface ShareDialogProps {
  title: string
  open: boolean
  setOpen: (open: boolean) => void
}

const ShareDialog = ({ title, open, setOpen }: ShareDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title={title}
      description="Help us spread the word."
      content={
        <>
          <div className="flex justify-center">
            <div className="flex gap-2">
              <FacebookShareButton url={SHARE_URL}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton url={SHARE_URL} title={SHARE_TEXT}>
                <XIcon size={32} round />
              </TwitterShareButton>

              <LinkedinShareButton url={SHARE_URL}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
        </>
      }
      hasButton={false}
      buttonVariant={"secondary"}
    />
  )
}

export default ShareDialog
