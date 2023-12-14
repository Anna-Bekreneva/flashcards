import { FormEvent, useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Slider, SliderFormValues, ValuesSliderType } from '@/components'

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
  const [value, setValue] = useState<ValuesSliderType>([5, 25])
  const onValueChange = (values: ValuesSliderType) => {
    action(`${values}`)()
    setValue(values)
  }

  const onValueCommit = (values: ValuesSliderType) => action(`commit ${values}`)()
  const onSubmit = (values: SliderFormValues | FormEvent<HTMLDivElement>) => {
    const numbers = values as SliderFormValues

    action(`${numbers.min} ${numbers.max}`)()
  }

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
