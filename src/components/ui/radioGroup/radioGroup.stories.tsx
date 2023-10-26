import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from '@/components/ui/radioGroup/radioGroup.tsx'
import { RadioItem } from '@/components/ui/radioGroup/radioItem.tsx'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    errorMessage: { type: 'string' },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroupDefault = (args: Story) => {
  const [value, setValue] = useState('radio-1')
  const onValueChange = (value: string) => {
    setValue(value)
    action(value)()
  }

  return (
    <RadioGroup {...args} value={value} onValueChange={onValueChange} name={'RadioGroupForStory'}>
      <RadioItem label={'radio 1'} value={'radio-1'}></RadioItem>
      <RadioItem label={'radio 2'} value={'radio-2'}></RadioItem>
      <RadioItem label={'radio 3'} value={'radio-3'}></RadioItem>
    </RadioGroup>
  )
}
