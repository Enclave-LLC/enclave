import { Meta, StoryObj } from "@storybook/react"
import Dialog from "./Dialog"

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hasButton: true,
    title: "Title",
    open: false
  }
}
