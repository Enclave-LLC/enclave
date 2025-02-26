import type { Meta, StoryObj } from "@storybook/react"

import Checkbox from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Click me",
    id: "default-button"
  }
}
