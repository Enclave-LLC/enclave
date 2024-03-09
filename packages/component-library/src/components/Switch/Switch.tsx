import React from "react"
import { Switch as RawSwitch } from "../ui/switch"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RawSwitch> {}

const Switch = (props: SwitchProps) => {
  return <RawSwitch {...props} />
}

export default Switch
