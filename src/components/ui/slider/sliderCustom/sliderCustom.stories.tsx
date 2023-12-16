import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { SliderCustom, ValuesSliderType } from '@/components'

const meta = {
  title: 'Components/SliderCustom',
  component: SliderCustom,
  tags: ['autodocs'],
  argTypes: {
    name: { type: 'string' },
    step: { type: 'number' },
    min: { type: 'number' },
    max: { type: 'number' },
    disabled: { type: 'boolean' },
    onValueChange: { description: '(values: [number, number]) => void' },
    onValueCommit: { description: '(values: [number, number]) => void' },
  },
} satisfies Meta<typeof SliderCustom>

export default meta

type Story = StoryObj<typeof meta>

export const SliderDefault = (args: Story) => {
  const [value, setValue] = useState<ValuesSliderType>([5, 25])
  const onValueChange = (values: ValuesSliderType) => {
    action(`${values} onValueChange`)()
    setValue(values)
  }

  const onValueCommit = (values: ValuesSliderType) => {
    setValue(values)
    action(`${values} commit`)()
  }

  return (
    <SliderCustom
      {...args}
      value={value}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
    />
  )
}
