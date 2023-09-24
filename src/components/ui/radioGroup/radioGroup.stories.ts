import { Meta, StoryObj } from '@storybook/react'

import { RadioGroupCustom } from '@/components/ui/radioGroup/radioGroup.tsx'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroupCustom,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroupCustom>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    radioButton: {
      value: '1',
    },
    label: '1',
  },
  {
    radioButton: {
      value: '2',
      disabled: true,
    },
    label: '2',
  },
  {
    radioButton: {
      value: '3',
    },
    label: '3',
  },
]

const callback = (e: string) => console.log(e)

export const RadioGroupDefault: Story = {
  args: {
    items,
    defaultValue: '3',
    root: { name: 'test radioGroup', disabled: false },
    callback,
  },
}

export const RadioGroupDisabled: Story = {
  args: {
    items,
    defaultValue: '3',
    root: { disabled: true, name: 'test radioGroup 2' },
    callback,
  },
}
