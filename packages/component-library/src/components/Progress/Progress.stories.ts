import type { Meta, StoryObj } from "@storybook/react"

import Progress from "./Progress.tsx"

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: 50
  }
}
