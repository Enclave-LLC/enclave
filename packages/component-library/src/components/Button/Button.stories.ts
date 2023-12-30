import type { Meta, StoryObj } from "@storybook/react"

import Button from "./Button.tsx"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "default",
    label: "Primary"
  }
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Secondary"
  }
}

export const Small: Story = {
  args: {
    variant: "default",
    label: "Small",
    size: "sm"
  }
}

export const Default: Story = {
  args: {
    variant: "default",
    label: "Default",
    size: "default"
  }
}

export const Large: Story = {
  args: {
    variant: "default",
    label: "Large",
    size: "lg"
  }
}

export const Disabled: Story = {
  args: {
    variant: "default",
    label: "Disabled",
    disabled: true
  }
}

export const Loading: Story = {
  args: {
    variant: "default",
    label: "Loading",
    loading: true
  }
}
