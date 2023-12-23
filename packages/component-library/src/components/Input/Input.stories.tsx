import Input from "./Input"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Small Input Box"
  }
}

export const WithIconAndButton: Story = {
  args: {
    placeholder: "Input Box with Icon and Button",
    showLocationIcon: true,
    button: {
      label: "Button"
    }
  },
  parameters: {
    layout: "fullscreen"
  }
}
