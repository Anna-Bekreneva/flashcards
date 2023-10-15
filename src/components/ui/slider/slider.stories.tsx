import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Slider } from '@/components/ui/slider/slider.tsx'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    name: { type: 'string' },
    step: { type: 'number' },
    min: { type: 'number' },
    max: { type: 'number' },
    disabled: { type: 'boolean' },
    onValueChange: { description: '(values: [number, number]) => void' },
  },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const SliderDefault: Story = {
  render: args => {
    const [value, setValue] = useState<[number, number]>([5, 25])
    const onValueChange = (values: [number, number]) => {
      action(`${values}`)()
      setValue(values)
    }

    return <Slider {...args} value={value} onValueChange={onValueChange} />
  },
}
