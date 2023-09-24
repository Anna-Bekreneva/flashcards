import { Meta, StoryObj } from '@storybook/react'

import { SliderCustom } from '@/components/ui/slider/slider.tsx'

const meta = {
  title: 'Components/Slider',
  component: SliderCustom,
  tags: ['autodocs'],
} satisfies Meta<typeof SliderCustom>

export default meta

type Story = StoryObj<typeof meta>

const callback = (values: [number, number]) => console.log(values)

export const SliderDefault: Story = {
  args: {
    defaultValue: [5, 25],
    name: 'SliderDefault',
    step: 5,
    max: 100,
    min: 10,
    callback,
  },
}
