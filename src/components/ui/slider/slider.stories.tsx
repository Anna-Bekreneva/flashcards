import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Slider, SliderFormValues } from '@/components'

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
    onValueCommit: { description: '(values: [number, number]) => void' },
    onSubmit: { description: '(data: {min: number, max: number) => void' },
  },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const SliderDefault = (args: Story) => {
  const [value, setValue] = useState<[number, number]>([5, 25])
  const onValueChange = (values: [number, number]) => {
    action(`${values}`)()
    setValue(values)
  }

  const onValueCommit = (values: [number, number]) => action(`commit ${values}`)()
  const onSubmit = (values: SliderFormValues) => action(`${values.min} ${values.max}`)()

  return (
    <Slider
      {...args}
      value={value}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
      onSubmit={onSubmit}
    />
  )
}
