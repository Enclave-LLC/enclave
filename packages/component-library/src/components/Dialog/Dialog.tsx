import { Button } from "@/components/ui/button"
import {
  Dialog as RawDialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hasButton: boolean
  buttonVariant: "default" | "secondary"
  buttonText?: string
  title: string
  description?: string
  content?: JSX.Element
  footer?: JSX.Element
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  content,
  footer,
  buttonText = "Dialog",
  hasButton = true,
  buttonVariant = "default"
}: DialogProps) {
  return (
    <RawDialog open={open} onOpenChange={onOpenChange}>
      {hasButton && (
        <DialogTrigger asChild>
          <Button variant={buttonVariant}>{buttonText}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        {footer && (
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </RawDialog>
  )
}

export default Dialog
