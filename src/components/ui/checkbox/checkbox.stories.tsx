import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { CheckboxCustom } from './'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxCustom,
  tags: ['autodocs'],
  argTypes: {
    disabled: { type: 'boolean' },
    checked: { type: 'boolean' },
    id: { type: 'string' },
    value: { type: 'string' },
    onCheckedChange: { description: '(checked: boolean) => void' },
  },
} satisfies Meta<typeof CheckboxCustom>

export default meta
type Story = StoryObj<typeof meta>
export const CheckboxDefault: Story = {
  render: args => {
    const [checked, setChecked] = useState(true)
    const onCheckedChange = (checked: boolean) => {
      setChecked(checked)
      action(`${checked}`)()
    }

    return (
      <CheckboxCustom
        {...args}
        checked={checked}
        onCheckedChange={onCheckedChange}
      ></CheckboxCustom>
    )
  },
}
