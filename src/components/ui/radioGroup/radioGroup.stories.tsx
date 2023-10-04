import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { RadioGroupCustom } from '@/components/ui/radioGroup/radioGroup.tsx'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroupCustom,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RadioGroupCustom>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { value: 'radio-1', label: 'radio-1' },
  { value: 'radio-2', label: 'radio-2', disabled: true },
  { value: 'radio-3', label: 'radio-3' },
]

export const RadioGroupDefault: Story = {
  render: args => {
    const [value, setValue] = useState('radio-1')
    const onValueChange = (value: string) => {
      setValue(value)
      action(value)()
    }

    return (
      <RadioGroupCustom
        {...args}
        name={'2'}
        items={items}
        value={value}
        onValueChange={onValueChange}
      />
    )
  },
}
